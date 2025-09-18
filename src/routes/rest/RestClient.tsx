'use client';

import s from './route.module.sass';
import { useEffect, useState } from 'react';
import {
  useActionData,
  useNavigate,
  useParams,
  useSearchParams,
  useSubmit,
} from 'react-router';
import {
  base64UrlDecode,
  ERROR,
  getEncodeUrl,
  INVALID_ENDPOINT_URL,
  INVALID_REQUEST_BODY,
  replaceVariables,
  urlSearchParamsToString,
} from './utils';
import { initialState as responseInitial } from '../../redux/slice/responseSlice';
import { useActions } from '../../redux/useActions';
import { ResponseInfo } from '../../components/ResponseInfo/ResponseInfo';
import { useVariablesState } from '../../redux/useAppSelector';
import { RequestMethodEnum, type RequestMethod } from '../../Types/Types';
import { FormattedMessage } from 'react-intl';

export default function Rest() {
  const { setResponse } = useActions();
  const variables = useVariablesState();

  const submit = useSubmit();
  const actionData = useActionData<{
    ok?: boolean;
    endpoint?: string;
    method?: string;
    timestamp?: Date;
    duration?: string;
    requestSize?: string;
    responseSize?: string;
    responseCode: number;
    data?: Response;
    errorDetails: { message: string } | undefined;
  }>();

  const navigate = useNavigate();

  const params = useParams();
  const [searchParams] = useSearchParams();

  const [url, setUrl] = useState('https://www.swapi.tech/api/starships/');
  const [method, setMethod] = useState<RequestMethod>('GET');
  const [body, setBody] = useState(
    '{"title":"fakeTitle","userId":1,"body":"fakeMessage"}'
  );
  const [headers, setHeaders] = useState('{"Content-Type":"application/json"}');

  const [variableError, setVariableError] = useState<{
    isError: boolean;
    errorMessage: string;
  }>({
    isError: false,
    errorMessage: '',
  });

  const handleSubmit = () => {
    const urlWithoutVariables = replaceVariables(url, variables);
    if (urlWithoutVariables.isError) {
      setVariableError({
        isError: true,
        errorMessage: urlWithoutVariables.errorMessage,
      });
      return;
    }
    const bodyWithoutVariables = replaceVariables(body, variables);
    if (bodyWithoutVariables.isError) {
      setVariableError({
        isError: true,
        errorMessage: bodyWithoutVariables.errorMessage,
      });
      return;
    }
    const headersWithoutVariables = replaceVariables(headers, variables);
    if (headersWithoutVariables.isError) {
      setVariableError({
        isError: true,
        errorMessage: headersWithoutVariables.errorMessage,
      });
      return;
    }

    setVariableError({
      isError: false,
      errorMessage: '',
    });

    const formData = new FormData();
    formData.append('url', urlWithoutVariables.value);
    formData.append('method', method);
    formData.append('headers', headersWithoutVariables.value);
    if (method !== 'GET') {
      formData.append('body', bodyWithoutVariables.value);
    }

    submit(formData, { method: 'post', action: '/rest' });
  };

  const handlerGetParamsFromUrl = () => {
    if (!params) {
      return;
    }
    const keys: string[] = Object.keys(params);
    if (keys.length === 0 || !params.method) {
      return;
    }

    const isCorrectMethodName = Object.prototype.hasOwnProperty.call(
      RequestMethodEnum,
      params.method
    );
    if (isCorrectMethodName) {
      setMethod(params.method as RequestMethod);
    } else {
      setMethod(RequestMethodEnum.GET);
    }

    const decodedEndpointURL = base64UrlDecode(params?.encodedEndpoint || '');
    if (decodedEndpointURL === ERROR) {
      setUrl(INVALID_ENDPOINT_URL);
    } else {
      setUrl(decodedEndpointURL);
    }

    const decodedRequestBody = base64UrlDecode(params?.encodedBody || '');
    if (decodedRequestBody === ERROR) {
      setBody(INVALID_REQUEST_BODY);
    } else {
      setBody(decodedRequestBody);
    }

    setHeaders(urlSearchParamsToString(searchParams.toString()));
  };

  const handlerSetUrl = () => {
    navigate(getEncodeUrl(variables, method, url, body, headers), {
      replace: true,
    });
  };

  useEffect(() => {
    handlerGetParamsFromUrl();
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (actionData && actionData?.timestamp?.getTime()) {
      handlerSetUrl();
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData?.timestamp]);

  useEffect(() => {
    if (actionData) {
      const responseCode = actionData.responseCode || 0;
      const errorDetails = actionData.errorDetails
        ? typeof actionData.errorDetails === 'string'
          ? actionData.errorDetails
          : actionData.errorDetails.message || ''
        : 'N/A';
      const duration = actionData.duration
        ? String(actionData.duration)
        : 'N/A';
      const responseSize = actionData.responseSize
        ? String(actionData.responseSize)
        : 'N/A';

      const analitics = {
        responseCode,
        duration,
        timestamp: actionData.timestamp
          ? String(actionData.timestamp.getTime())
          : 'N/A',
        method: actionData.method || 'N/A',
        requestSize: actionData.requestSize
          ? String(actionData.requestSize)
          : 'N/A',
        responseSize,
        errorDetails,
        endpoint: actionData.endpoint ? String(actionData.endpoint) : 'N/A',
        linkToRestClient: getEncodeUrl(variables, method, url, body, headers),
      };

      const responseInfo = {
        responseCode,
        data: JSON.stringify(actionData?.data) || '',
        duration,
        responseSize,
      };

      setResponse({
        responseInfo,
        analitics,
      });
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  return (
    <main>
      <div className="container">
        <fieldset className={s.requestClient}>
          <legend>
            <FormattedMessage id="restClient.client" />
          </legend>
          <div className={s.requestParamsWrap}>
            <div className={s.requestParams}>
              <select
                className={s.method}
                name="method"
                id="method"
                value={method}
                onChange={(e) => setMethod(e.target.value as RequestMethod)}
              >
                <option className={s.selectGet} value="GET">
                  GET
                </option>
                <option className={s.selectPost} value="POST">
                  POST
                </option>
                <option className={s.selectPut} value="PUT">
                  PUT
                </option>
                <option className={s.selectPatch} value="PATCH">
                  PATCH
                </option>
                <option className={s.selectDelete} value="DELETE">
                  DELETE
                </option>
                <option className={s.selectHead} value="HEAD">
                  HEAD
                </option>
                <option className={s.selectOption} value="OPTION">
                  OPTION
                </option>
              </select>

              <input
                className={s.url}
                type="text"
                name="url"
                id="url"
                placeholder="Enter URL or paste text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <button
              onClick={() => {
                setResponse(responseInitial);
                handleSubmit();
              }}
            >
              <FormattedMessage id="restClient.sendButton" />
            </button>
          </div>

          <div className={s.variablesError}>
            {variableError.isError ? variableError.errorMessage : ''}
          </div>

          <div className={s.requestData}>
            <div className={s.requestDataItem}>
              <label>
                <FormattedMessage id="restClient.requestHeaderTitle" />
              </label>
              <textarea
                className={s.requestHeader}
                value={headers}
                onChange={(e) => setHeaders(e.target.value)}
              />
            </div>

            <div className={s.requestDataItem}>
              <label>
                <FormattedMessage id="restClient.requestBodyTitle" />
              </label>
              <textarea
                className={s.jsonBody}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
          </div>
        </fieldset>

        <ResponseInfo />
      </div>
    </main>
  );
}

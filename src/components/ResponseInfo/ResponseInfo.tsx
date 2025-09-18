import s from './ResponseInfo.module.sass';
import classNames from 'classnames';
import { useResponseState } from '../../redux/useAppSelector';
import { FormattedMessage } from 'react-intl';

function getResponseCodeStyle(code: number) {
  const codeFirstDigit = Math.round(code / 100);
  if (codeFirstDigit === 4 || codeFirstDigit === 5) {
    return classNames(s.responseCode, s.responseCodeFail);
  } else if (codeFirstDigit === 2) {
    return classNames(s.responseCode, s.responseCodeSuccess);
  }
  return s.responseCode;
}

export function ResponseInfo() {
  const { responseInfo } = useResponseState();

  return (
    <fieldset className={s.response}>
      <legend>
        <FormattedMessage id="restClient.responseTitle" />
      </legend>

      <div className={s.responseInfo}>
        <label htmlFor="response-code">
          <FormattedMessage id="restClient.responseCode" />
          {responseInfo ? (
            <output
              className={getResponseCodeStyle(responseInfo.responseCode)}
              id="response-code"
            >
              {' '}
              {responseInfo.responseCode}
            </output>
          ) : (
            <output id="response-code"></output>
          )}
        </label>

        {responseInfo ? (
          <output>
            {responseInfo?.duration}{' '}
            <FormattedMessage id="restClient.responseMs" />
          </output>
        ) : (
          ''
        )}

        {responseInfo ? (
          <output>
            {responseInfo?.responseSize}{' '}
            <FormattedMessage id="restClient.responseKb" />
          </output>
        ) : (
          ''
        )}
      </div>

      <div className={s.responseDataItem}>
        <label htmlFor="response-body">
          <FormattedMessage id="restClient.responseBodyTitle" />
        </label>
        <textarea
          className={s.jsonBody}
          value={responseInfo ? responseInfo?.data : ''}
          readOnly
          id="response-body"
        />
      </div>
    </fieldset>
  );
}

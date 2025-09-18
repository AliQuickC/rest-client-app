import type { VariablesState } from '../../redux/slice/variablesSlice';
import type { RequestMethod } from '../../Types/Types';

type WithOutVariables = {
  value: string;
  isError: boolean;
  errorMessage: string;
};

export function headerParamsToURL(header: string): string {
  if (!header) {
    return '';
  }
  const headerObject = JSON.parse(header);
  const keys: string[] = Object.keys(headerObject);
  if (keys.length === 0) {
    return '';
  }
  return (
    '?' +
    keys
      .map((item) => item + '=' + encodeURIComponent(headerObject[item]))
      .join('&')
  );
}

export function urlSearchParamsToString(searchParams: string): string {
  const headerParams: { [key: string]: string } = new Object() as {
    [key: string]: string;
  };
  const paramsArray = searchParams.split('&');

  if (!searchParams || paramsArray.length === 0) {
    return '';
  }

  paramsArray.forEach((item) => {
    const [key, value] = item.split('=');
    headerParams[key] = decodeURIComponent(value);
  });
  return JSON.stringify(headerParams);
}

export function base64UrlEncode(str: string): string {
  const base64 = btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    )
  );

  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');

  while (base64.length % 4) {
    base64 += '=';
  }

  const decoded = atob(base64);

  return decodeURIComponent(
    decoded
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
}

function replaceTemplate(template: string, context: VariablesState) {
  let isError = false;
  let errorMessage = '';

  const str = template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!(key in context)) {
      isError = true;
      errorMessage = `Variable "${key}" not found in Variables`;
    }
    return context[key];
  });

  return { value: str || '', isError, errorMessage };
}

export function replaceVariables(
  str: string,
  variables: VariablesState
): WithOutVariables {
  const result = replaceTemplate(str, variables);
  return result;
}

export function getEncodeUrl(
  variablesKit: VariablesState,
  requestMethod: RequestMethod,
  urlString: string,
  requestbody: string = '',
  requestHeaders: string = ''
): string {
  const encodedUrl = base64UrlEncode(
    replaceVariables(urlString, variablesKit).value
  );

  const encodeBody =
    requestbody && requestMethod !== 'GET'
      ? '/' + base64UrlEncode(replaceVariables(requestbody, variablesKit).value)
      : '';

  const headersWithoutVariables = replaceVariables(
    requestHeaders,
    variablesKit
  ).value;

  const str = `/rest/${requestMethod}/${encodedUrl}${encodeBody}${headerParamsToURL(headersWithoutVariables)}`;
  return str;
}

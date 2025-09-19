interface ActionArgs {
  request: Request;
}

interface ActionSuccess {
  ok: true;
  endpoint: string;
  method: string;
  timestamp: Date;
  duration: number;
  requestSize: number;
  responseSize: number;
  responseCode: number;
  data: unknown;
  errorDetails?: string;
}

interface ActionError {
  ok: false;
  endpoint: string;
  method: string;
  timestamp: Date;
  duration: number;
  requestSize: number;
  responseSize: number;
  responseCode: number | null;
  errorDetails: string;
}

type ActionResult = ActionSuccess | ActionError;

export async function action({ request }: ActionArgs): Promise<ActionResult> {
  const formData = await request.formData();
  const url = formData.get('url') as string;
  const method = (formData.get('method') as string) || 'GET';
  const body = formData.get('body') as string;
  const headersStr = formData.get('headers') as string;

  let headers: Record<string, string> = {};
  if (headersStr) {
    try {
      headers = JSON.parse(headersStr);
    } catch {
      return {
        ok: false,
        errorDetails: 'Invalid header format. Use JSON.',
        endpoint: url,
        method,
        timestamp: new Date(),
        responseCode: null,
        duration: 0,
        requestSize: body ? new TextEncoder().encode(body).length : 0,
        responseSize: 0,
      };
    }
  }

  const timestamp = new Date();
  const requestSize = body ? new TextEncoder().encode(body).length : 0;

  try {
    const startTime = Date.now();
    const res = await fetch(url, {
      method,
      headers,
      body: method !== 'GET' ? body : undefined,
    });
    const duration = Date.now() - startTime;

    const responseText = await res.text();
    const responseSize = new TextEncoder().encode(responseText).length;

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = responseText;
    }

    return {
      ok: res.ok,
      endpoint: url,
      method,
      timestamp,
      duration,
      requestSize,
      responseSize,
      responseCode: res.status,
      data: res.ok ? data : undefined,
      errorDetails: res.ok ? undefined : data || `HTTP error ${res.status}`,
    };
  } catch (error) {
    const err = error instanceof Error ? error.message : 'Unknown error';
    return {
      ok: false,
      endpoint: url,
      method,
      timestamp,
      duration: 0,
      requestSize,
      responseSize: 0,
      responseCode: 0,
      errorDetails: err,
    };
  }
}

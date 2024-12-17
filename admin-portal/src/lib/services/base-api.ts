const serverURL = 'http://localhost:3000';

export const makeRequest = async <T>(
  path: string,
  params: Record<string, string>,
  method: 'POST' | 'GET' | 'PUT' | 'DELETE',
  includeToken = true,
  body?: Record<string, string>
): Promise<T> => {
  const query: URLSearchParams = new URLSearchParams(params);
  const response = await fetch(`${serverURL}/${path}${query ? `?${query.toString()}` : ''}`, {
    method,
    headers: {
      'Content-Type': 'application/json',

      ...(includeToken
        ? {
            Authorization: getAuthToken(),
          }
        : {}),
    },

    // This is the body of the request. It is only used for POST requests.
    body: JSON.stringify(body),
  });

  return response.json();
};

export const setAuthToken = (token: string) => {
  localStorage.setItem('ADMIN_AUTH_TOKEN', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('ADMIN_AUTH_TOKEN');
};

export const getAuthToken: () => string = () => {
  const res = localStorage.getItem('ADMIN_AUTH_TOKEN');

  if (res === null) {
    return '';
  }

  return res;
};

export const isUserAuthenticated: () => boolean = () => {
  return Boolean(getAuthToken());
};

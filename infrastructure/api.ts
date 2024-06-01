type FetchOptions = RequestInit & {
  baseUrl?: string;
};

const createFetch = (defaultOptions: FetchOptions) => {
  return (url: string, options?: RequestInit) => {
    const finalOptions = { ...defaultOptions, ...options };
    const finalUrl = defaultOptions.baseUrl
      ? `${defaultOptions.baseUrl}${url}`
      : url;
    return fetch(finalUrl, finalOptions);
  };
};

export const api = createFetch({
  baseUrl: "http://localhost:3000/api",
  headers: {
    'Content-Type': 'application/json',
  }
});

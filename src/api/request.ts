export const makeRequest = <ResponseType, T>(
  url: string,
  method?: string,
  data?: T
) => {
  const requestData: RequestInit = {
    method: method ?? "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  if (data) {
    requestData.body = JSON.stringify(data);
  }

  return fetch(url, requestData)
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      return responseData as ResponseType;
    })
    .catch((error) => console.warn(error));
};

const httpResponseErrorMessage = (response: Response, callDescription?: string): string =>
  `Server-Error${callDescription ? ` (for: ${callDescription})` : ''} ${response.status} '${response.statusText}'`;
export default httpResponseErrorMessage;

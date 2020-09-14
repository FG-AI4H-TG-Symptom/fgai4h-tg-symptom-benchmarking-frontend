const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const urlBuilder = (endpoint: string): string => `${BASE_URL}/${endpoint}`;

export default urlBuilder;

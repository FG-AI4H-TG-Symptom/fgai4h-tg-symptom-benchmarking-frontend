const PROTOCOL = process.env.REACT_APP_BACKEND_PROTOCOL

export enum COMPONENTS {
  EVALUATOR,
  TOY_AIS,
  METRIC_CALCULATOR,
}

const HOSTNAMES = {
  [COMPONENTS.EVALUATOR]: process.env.REACT_APP_BACKEND_HOSTNAME_EVALUATOR,
  [COMPONENTS.TOY_AIS]: process.env.REACT_APP_BACKEND_HOSTNAME_TOY_AIS,
  [COMPONENTS.METRIC_CALCULATOR]:
    process.env.REACT_APP_BACKEND_HOSTNAME_METRIC_CALCULATOR,
}
const BASE_URLS = {
  [COMPONENTS.EVALUATOR]: 'evaluator/v1',
  [COMPONENTS.TOY_AIS]: 'toy-ai/v1',
  [COMPONENTS.METRIC_CALCULATOR]: 'metric-calculator/v1',
}

const urlBuilder: (componentName: COMPONENTS, endpoint: string) => string = (
  componentName,
  endpoint,
) =>
  `${PROTOCOL}://${HOSTNAMES[componentName]}/${BASE_URLS[componentName]}/${endpoint}`

export default urlBuilder

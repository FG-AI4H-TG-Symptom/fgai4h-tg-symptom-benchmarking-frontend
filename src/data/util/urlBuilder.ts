const PROTOCOL = 'http'

export enum COMPONENTS {
  EVALUATOR,
  TOY_AIS,
  METRIC_CALCULATOR,
}

const HOSTNAMES = {
  [COMPONENTS.EVALUATOR]: 'localhost:5003',
  [COMPONENTS.TOY_AIS]: 'localhost:5002',
  [COMPONENTS.METRIC_CALCULATOR]: 'localhost:5004',
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

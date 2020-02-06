const PROTOCOL = 'http'

export enum COMPONENTS {
  EVALUATOR,
  TOY_AIS,
}

const HOSTNAMES = {
  [COMPONENTS.EVALUATOR]: 'localhost:5003',
  [COMPONENTS.TOY_AIS]: 'localhost:5002',
}
const BASE_URLS = {
  [COMPONENTS.EVALUATOR]: 'evaluator/v1',
  [COMPONENTS.TOY_AIS]: 'toy-ai/v1',
}

const urlBuilder: (componentName: COMPONENTS, endpoint: string) => string = (
  componentName,
  endpoint,
) =>
  `${PROTOCOL}://${HOSTNAMES[componentName]}/${BASE_URLS[componentName]}/${endpoint}`

export default urlBuilder

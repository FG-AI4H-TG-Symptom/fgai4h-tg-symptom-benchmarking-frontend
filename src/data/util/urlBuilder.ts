const PROTOCOL = 'http'
const HOSTNAME = 'localhost:5003'
const BASE_PATH = 'evaluator/v1'

const urlBuilder: (endpoint: string) => string = endpoint =>
  `${PROTOCOL}://${HOSTNAME}/${BASE_PATH}/${endpoint}`

export default urlBuilder

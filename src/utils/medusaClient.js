import Medusa from '@medusajs/medusa-js'

const medusaClient = new Medusa({ baseUrl: 'http://localhost:9000' })

export default medusaClient;
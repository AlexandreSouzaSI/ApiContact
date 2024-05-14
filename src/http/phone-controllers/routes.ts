import { FastifyInstance } from 'fastify'
import { createPhone } from './create-phone'
import { deletePhone } from './delete-phone'
import { getPhone } from './get-phone'
import { searchPhone } from './search-phone'
import { updatePhone } from './update-phone'

export async function phoneRoutes(app: FastifyInstance) {
  app.post('/phone', createPhone)
  app.delete('/phone/:id', deletePhone)
  app.get('/phone/:id', getPhone)
  app.get('/phone/search', searchPhone)
  app.put('/phone/update/:id', updatePhone)

}

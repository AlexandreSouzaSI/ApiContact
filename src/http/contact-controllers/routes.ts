import { FastifyInstance } from 'fastify'
import { createContact } from './create-contact'
import { deleteContact } from './delete-contact'
import { getContact } from './get-contact'
import { searchContact } from './search-contact'
import { updateContact } from './update-contact'

export async function contactRoutes(app: FastifyInstance) {
  app.post('/contact', createContact)
  app.delete('/contact/:userId', deleteContact)
  app.get('/contact/:userId', getContact)
  app.get('/contact/search', searchContact)
  app.put('/contact/update/:id', updateContact)

}

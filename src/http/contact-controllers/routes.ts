import { FastifyInstance } from 'fastify'
import { createContact } from './create-contact'
import { deleteContact } from './delete-contact'
import { getContact } from './get-contact'
import { searchContact } from './search-contact'
import { updateContact } from './update-contact'
import { getAllContact } from './get-all-contact'

export async function contactRoutes(app: FastifyInstance) {
  app.post('/contact', createContact)
  app.get('/contact', getAllContact)
  app.delete('/contact/:id', deleteContact)
  app.get('/contact/:userId', getContact)
  app.put('/contact/update/:id', updateContact)

}

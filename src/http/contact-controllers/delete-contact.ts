import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeDeleteContactUseCase } from '@/use-cases/factories/contact/make-delete-contact-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteContact(request: FastifyRequest, reply: FastifyReply) {
  const deleteContactBodySchema = z.object({
    id: z.string(),
  })

  const { id } = deleteContactBodySchema.parse(request.params)

  
  try {
    const deleteContactUseCase = makeDeleteContactUseCase()
    
    await deleteContactUseCase.execute({
      id
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

  return reply.status(204).send()
}

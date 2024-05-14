import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeDeleteContactUseCase } from '@/use-cases/factories/contact/make-delete-contact-use-case'
import { makeGetContactUseCase } from '@/use-cases/factories/contact/make-get-contact-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getContact(request: FastifyRequest, reply: FastifyReply) {
  const deleteContactBodySchema = z.object({
    userId: z.string(),
  })

  const { userId } = deleteContactBodySchema.parse(request.params)

  try {
    const getContactUseCase = makeGetContactUseCase()

    const { contact } = await getContactUseCase.execute({
      userId
    })
    return reply.status(201).send({contact})
    
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

}

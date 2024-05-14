import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeDeletePhoneUseCase } from '@/use-cases/factories/phone/make-delete-phone-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deletePhone(request: FastifyRequest, reply: FastifyReply) {
  const deletePhoneBodySchema = z.object({
    id: z.string(),
  })

  const { id } = deletePhoneBodySchema.parse(request.params)

  try {
    const deletePhoneUseCase = makeDeletePhoneUseCase()

    await deletePhoneUseCase.execute({
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

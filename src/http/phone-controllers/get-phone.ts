import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeGetPhoneUseCase } from '@/use-cases/factories/phone/make-get-phone-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPhone(request: FastifyRequest, reply: FastifyReply) {
  const deletePhoneBodySchema = z.object({
    id: z.string(),
  })

  const { id } = deletePhoneBodySchema.parse(request.params)

  try {
    const getPhoneUseCase = makeGetPhoneUseCase()

    const { phone } = await getPhoneUseCase.execute({
      id
    })
    return reply.status(201).send({phone})
    
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

}

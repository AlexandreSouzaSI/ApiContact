import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeGetPhoneUseCase } from '@/use-cases/factories/phone/make-get-phone-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPhone(request: FastifyRequest, reply: FastifyReply) {
  const deletePhoneBodySchema = z.object({
    contact_Id: z.string(),
  })

  const { contact_Id } = deletePhoneBodySchema.parse(request.params)

  try {
    const getPhoneUseCase = makeGetPhoneUseCase()

    const { phone } = await getPhoneUseCase.execute({
      contact_Id
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

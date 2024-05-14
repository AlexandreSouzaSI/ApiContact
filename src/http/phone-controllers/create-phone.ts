import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterPhoneUseCase } from '@/use-cases/factories/phone/make-register-phone-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createPhone(request: FastifyRequest, reply: FastifyReply) {
  const createPhoneBodySchema = z.object({
    contact_Id: z.string(),
    number: z.string(),
  })

  // const { contact_Id } = createPhoneBodySchema.parse(request.params)
  const { number, contact_Id } = createPhoneBodySchema.parse(request.body)

  try {
    const createPhoneUseCase = makeRegisterPhoneUseCase()

    await createPhoneUseCase.execute({
      contact_Id,
      number,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

  return reply.status(201).send()
}

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeUpdatePhoneUseCase } from '@/use-cases/factories/phone/make-update-phone-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updatePhone(request: FastifyRequest, reply: FastifyReply) {
  const updatePhoneBodySchema = z.object({
    number: z.string()
  })

  const updatePhoneParamsSchema = z.object({
    id: z.string(),
  })

  const { number } = updatePhoneBodySchema.parse(request.body)
  const { id } = updatePhoneParamsSchema.parse(request.params)

    const updatePhoneUseCase = makeUpdatePhoneUseCase()

    const { phone } = await updatePhoneUseCase.execute({
      id,
      number
    })
    return reply.status(200).send({phone})
}

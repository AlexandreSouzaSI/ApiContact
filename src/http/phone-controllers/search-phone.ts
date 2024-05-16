import { makeSearchPhoneUseCase } from '@/use-cases/factories/phone/make-search-phone-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchPhone(request: FastifyRequest, reply: FastifyReply) {
  const searchPhoneBodySchema = z.object({
    query: z.string(),
  })

  const { query } = searchPhoneBodySchema.parse(request.query)

    const searchPhoneUseCase = makeSearchPhoneUseCase()

    const { phone } = await searchPhoneUseCase.execute({
      query,
    })
    return reply.status(200).send({phone})
}

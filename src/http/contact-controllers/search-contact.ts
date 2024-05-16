import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeSearchContactUseCase } from '@/use-cases/factories/contact/make-search-contact-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchContact(request: FastifyRequest, reply: FastifyReply) {
  const searchContactBodySchema = z.object({
    query: z.string(),
  })

  const { query } = searchContactBodySchema.parse(request.query)

    const searchContactUseCase = makeSearchContactUseCase()

    const { contact } = await searchContactUseCase.execute({
      query,
    })

    return reply.status(200).send({contact})
}

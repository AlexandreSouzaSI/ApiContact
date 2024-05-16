import { makeGetAllContactUseCase } from '@/use-cases/factories/contact/make-get-all-contact-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getAllContact(request: FastifyRequest, reply: FastifyReply) {
    const searchContactBodySchema = z.object({
        query: z.string().optional(),
      })

    const { query } = searchContactBodySchema.parse(request.query)

    const getAllContactUseCase = makeGetAllContactUseCase()

    const { contact } = await getAllContactUseCase.execute({
        query,
    })
    return reply.status(201).send({contact})
}

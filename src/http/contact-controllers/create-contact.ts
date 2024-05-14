import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterContactUseCase } from '@/use-cases/factories/contact/make-register-contact-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createContact(request: FastifyRequest, reply: FastifyReply) {
  const createContactBodySchema = z.object({
    name: z.string(),
    age: z.string(),
  })

  const { name, age } = createContactBodySchema.parse(request.body)

  try {
    const createContactUseCase = makeRegisterContactUseCase()

    await createContactUseCase.execute({
      name,
      age,
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

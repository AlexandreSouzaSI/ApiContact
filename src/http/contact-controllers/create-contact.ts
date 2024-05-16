import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterContactUseCase } from '@/use-cases/factories/contact/make-register-contact-use-case'
import { makeRegisterPhoneUseCase } from '@/use-cases/factories/phone/make-register-phone-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createContact(request: FastifyRequest, reply: FastifyReply) {
  const createContactBodySchema = z.object({
    name: z.string(),
    age: z.string(),
    phone1: z.string().optional(),
    phone2: z.string().optional(),
    phone3: z.string().optional(),
  })

  console.log("Requisição: ", request.body)

  const { name, age, phone1, phone2, phone3 } = createContactBodySchema.parse(request.body)

  try {
    const createContactUseCase = makeRegisterContactUseCase()

    const contact = await createContactUseCase.execute({
      name,
      age,
      phone1,
      phone2,
      phone3
    })
    
    return reply.status(201).send(contact)
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

}

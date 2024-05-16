import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeUpdateContactUseCase } from '@/use-cases/factories/contact/make-update-contact-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateContact(request: FastifyRequest, reply: FastifyReply) {
  const updateContactBodySchema = z.object({
      age: z.string(),
      name: z.string(),
      phone1: z.object({
        id: z.string(),
        number: z.string()
      }).optional(),
      phone2: z.object({
        id: z.string(),
        number: z.string()
      }).optional(),
      phone3: z.object({
        id: z.string(),
        number: z.string()
      }).optional(),
  })

  const updateContactParamsSchema = z.object({
    id: z.string(),
})

console.log("request: ", request.body)

  const { age, name, phone1, phone2, phone3 } = updateContactBodySchema.parse(request.body)
  const { id } = updateContactParamsSchema.parse(request.params)

  try {
    const updateContactUseCase = makeUpdateContactUseCase()

    const { contact } = await updateContactUseCase.execute({
      id,
      age,
      name,
      phone1,
      phone2,
      phone3
    })
    return reply.status(200).send({contact})
    
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    throw error
  }

}

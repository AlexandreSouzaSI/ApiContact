import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeDeleteContactUseCase } from '@/use-cases/factories/contact/make-delete-contact-use-case'
import { makeGetAllContactUseCase } from '@/use-cases/factories/contact/make-get-all-contact-use-case'
import { makeGetContactUseCase } from '@/use-cases/factories/contact/make-get-contact-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getAllContact(request: FastifyRequest, reply: FastifyReply) {
    const getAllContactUseCase = makeGetAllContactUseCase()

    const { contact } = await getAllContactUseCase.execute()
    return reply.status(201).send({contact})
}

import { PrismaContactRepository } from '@/repositories/prisma/prisma-contact-repository'
import { GetContactUseCase } from '@/use-cases/contact/get-contact'

export function makeGetContactUseCase() {
  const contactRepository = new PrismaContactRepository()
  const useCase = new GetContactUseCase(contactRepository)

  return useCase
}

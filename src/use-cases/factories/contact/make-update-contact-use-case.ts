import { PrismaContactRepository } from '@/repositories/prisma/prisma-contact-repository'
import { UpdateContactUseCase } from '@/use-cases/contact/update-contact'

export function makeUpdateContactUseCase() {
  const contactRepository = new PrismaContactRepository()
  const useCase = new UpdateContactUseCase(contactRepository)

  return useCase
}

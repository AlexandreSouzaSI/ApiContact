import { PrismaContactRepository } from '@/repositories/prisma/prisma-contact-repository'
import { DeleteContactUseCase } from '@/use-cases/contact/delete-contact'

export function makeDeleteContactUseCase() {
  const contactRepository = new PrismaContactRepository()
  const useCase = new DeleteContactUseCase(contactRepository)

  return useCase
}

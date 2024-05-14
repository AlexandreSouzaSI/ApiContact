import { PrismaContactRepository } from '@/repositories/prisma/prisma-contact-repository'
import { SearchContactUseCase } from '@/use-cases/contact/search-contact'

export function makeSearchContactUseCase() {
  const contactRepository = new PrismaContactRepository()
  const useCase = new SearchContactUseCase(contactRepository)

  return useCase
}

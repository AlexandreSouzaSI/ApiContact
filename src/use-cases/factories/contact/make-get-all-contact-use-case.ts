import { PrismaContactRepository } from '@/repositories/prisma/prisma-contact-repository'
import { GetAllContactUseCase } from '@/use-cases/contact/get-all-contact'

export function makeGetAllContactUseCase() {
  const contactRepository = new PrismaContactRepository()
  const useCase = new GetAllContactUseCase(contactRepository)

  return useCase
}

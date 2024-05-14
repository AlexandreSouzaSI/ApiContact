import { PrismaContactRepository } from '@/repositories/prisma/prisma-contact-repository'
import { RegisterContactUseCase } from '@/use-cases/contact/register-contact'

export function makeRegisterContactUseCase() {
  const contactRepository = new PrismaContactRepository()
  const useCase = new RegisterContactUseCase(contactRepository)

  return useCase
}

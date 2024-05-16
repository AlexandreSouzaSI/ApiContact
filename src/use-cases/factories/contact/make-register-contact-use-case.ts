import { PrismaContactRepository } from '@/repositories/prisma/prisma-contact-repository'
import { PrismaPhoneRepository } from '@/repositories/prisma/prisma-phone-repository'
import { RegisterContactUseCase } from '@/use-cases/contact/register-contact'

export function makeRegisterContactUseCase() {
  const contactRepository = new PrismaContactRepository()
  const phoneRepository = new PrismaPhoneRepository()
  const useCase = new RegisterContactUseCase(contactRepository, phoneRepository)

  return useCase
}

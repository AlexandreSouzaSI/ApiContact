import { PrismaContactRepository } from '@/repositories/prisma/prisma-contact-repository'
import { PrismaPhoneRepository } from '@/repositories/prisma/prisma-phone-repository'
import { UpdateContactUseCase } from '@/use-cases/contact/update-contact'

export function makeUpdateContactUseCase() {
  const contactRepository = new PrismaContactRepository()
  const phoneRepository = new PrismaPhoneRepository()
  const useCase = new UpdateContactUseCase(contactRepository, phoneRepository)

  return useCase
}

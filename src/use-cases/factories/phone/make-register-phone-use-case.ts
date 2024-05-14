import { PrismaContactRepository } from "@/repositories/prisma/prisma-contact-repository"
import { PrismaPhoneRepository } from "@/repositories/prisma/prisma-phone-repository"
import { RegisterPhoneUseCase } from "@/use-cases/phone/register-phone"

export function makeRegisterPhoneUseCase() {
  const phoneRepository = new PrismaPhoneRepository()
  const contactRepository = new PrismaContactRepository()

  const useCase = new RegisterPhoneUseCase(phoneRepository, contactRepository)

  return useCase
}

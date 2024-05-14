import { PrismaPhoneRepository } from "@/repositories/prisma/prisma-phone-repository"
import { UpdatePhoneUseCase } from "@/use-cases/phone/update-phone"

export function makeUpdatePhoneUseCase() {
  const phoneRepository = new PrismaPhoneRepository()
  const useCase = new UpdatePhoneUseCase(phoneRepository)

  return useCase
}

import { DeletePhoneUseCase } from '@/use-cases/phone/delete-phone';
import { PrismaPhoneRepository } from "@/repositories/prisma/prisma-phone-repository"

export function makeDeletePhoneUseCase() {
  const phoneRepository = new PrismaPhoneRepository()
  const useCase = new DeletePhoneUseCase(phoneRepository)

  return useCase
}

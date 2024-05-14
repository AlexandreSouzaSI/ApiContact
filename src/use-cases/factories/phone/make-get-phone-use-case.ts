import { GetPhoneUseCase } from './../../phone/get-phone';
import { PrismaPhoneRepository } from "@/repositories/prisma/prisma-phone-repository"

export function makeGetPhoneUseCase() {
  const phoneRepository = new PrismaPhoneRepository()
  const useCase = new GetPhoneUseCase(phoneRepository)

  return useCase
}

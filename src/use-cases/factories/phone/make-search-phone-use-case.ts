import { PrismaPhoneRepository } from "@/repositories/prisma/prisma-phone-repository"
import { SearchPhoneUseCase } from "@/use-cases/phone/search-phone"

export function makeSearchPhoneUseCase() {
  const phoneRepository = new PrismaPhoneRepository()
  const useCase = new SearchPhoneUseCase(phoneRepository)

  return useCase
}

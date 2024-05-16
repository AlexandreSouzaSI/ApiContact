import { Phone } from '@prisma/client'
import { PhoneRepository } from '@/repositories/phone-repository'

interface SearchPhoneUseCaseRequest {
  query: string
}

interface SearchPhoneResponse {
  phone: Phone[]
}

export class SearchPhoneUseCase {
  constructor(private phoneRepository: PhoneRepository) {}

  async execute({
    query,
  }: SearchPhoneUseCaseRequest): Promise<SearchPhoneResponse> {
    const phone = await this.phoneRepository.searchMany(query)

    return {
      phone
    }
  }
}

import { Phone } from '@prisma/client'
import { PhoneRepository } from '@/repositories/phone-repository'

interface SearchPhoneUseCaseRequest {
  query: string
  page: number
}

interface SearchPhoneResponse {
  phone: Phone[]
}

export class SearchPhoneUseCase {
  constructor(private phoneRepository: PhoneRepository) {}

  async execute({
    query,
    page
  }: SearchPhoneUseCaseRequest): Promise<SearchPhoneResponse> {
    const phone = await this.phoneRepository.searchMany(query, page)

    return {
      phone
    }
  }
}

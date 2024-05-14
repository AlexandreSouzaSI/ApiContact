import { Contact } from '@prisma/client'
import { ContactRepository } from '@/repositories/contact-repository'

interface SearchContactUseCaseRequest {
  query: string
  page: number
}

interface SearchContactResponse {
  contact: Contact[]
}

export class SearchContactUseCase {
  constructor(private contactRepository: ContactRepository) {}

  async execute({
    query,
    page
  }: SearchContactUseCaseRequest): Promise<SearchContactResponse> {
    const contact = await this.contactRepository.searchMany(query, page)

    return {
      contact
    }
  }
}

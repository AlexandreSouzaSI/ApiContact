import { Contact } from '@prisma/client'
import { ContactRepository } from '@/repositories/contact-repository'

interface SearchContactUseCaseRequest {
  query: string
}

interface SearchContactResponse {
  contact: Contact[]
}

export class SearchContactUseCase {
  constructor(private contactRepository: ContactRepository) {}

  async execute({
    query,
  }: SearchContactUseCaseRequest): Promise<SearchContactResponse> {
    const contact = await this.contactRepository.searchMany(query)

    return {
      contact
    }
  }
}

import { ContactRepository } from '@/repositories/contact-repository'
import { Contact } from '@prisma/client'

interface SearchContactUseCaseRequest {
  query?: string
  page?: number
}

interface SearchContactResponse {
  contact: Contact[]
}


export class GetAllContactUseCase {
  constructor(private contactRepository: ContactRepository) {}

  async execute({
    query,
    page
  }: SearchContactUseCaseRequest): Promise<SearchContactResponse> {

    const contact = await this.contactRepository.findMany(query, page)

    return {
      contact,
    }
  }
}

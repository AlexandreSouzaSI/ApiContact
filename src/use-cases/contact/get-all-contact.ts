import { ContactRepository } from '@/repositories/contact-repository'
import { Contact } from '@prisma/client'

interface SearchContactUseCaseRequest {
  query?: string
}

interface SearchContactResponse {
  contact: Contact[]
}


export class GetAllContactUseCase {
  constructor(private contactRepository: ContactRepository) {}

  async execute({
    query,
  }: SearchContactUseCaseRequest): Promise<SearchContactResponse> {

    const contact = await this.contactRepository.findMany(query)

    return {
      contact,
    }
  }
}

import { ContactRepository } from '@/repositories/contact-repository'

interface GetContactUseCaseRequest {
  userId: string
}

export class GetContactUseCase {
  constructor(private contactRepository: ContactRepository) {}

  async execute({ userId }: GetContactUseCaseRequest) {

    const contact = await this.contactRepository.findById(userId)

    return {
      contact,
    }
  }
}

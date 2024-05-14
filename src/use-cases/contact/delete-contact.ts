import { Contact } from '@prisma/client'
import { ContactRepository } from '@/repositories/contact-repository'

interface DeleteContactUseCaseRequest {
  userId: string
}

export class DeleteContactUseCase {
  constructor(private contactRepository: ContactRepository) {}

  async execute({ userId }: DeleteContactUseCaseRequest) {

    const contact = await this.contactRepository.delete(userId)

    return {
      contact,
    }
  }
}

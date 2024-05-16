import { Contact } from '@prisma/client'
import { ContactRepository } from '@/repositories/contact-repository'

interface DeleteContactUseCaseRequest {
  id: string
}

export class DeleteContactUseCase {
  constructor(private contactRepository: ContactRepository) {}

  async execute({ id }: DeleteContactUseCaseRequest) {

    
    
    const contact = await this.contactRepository.delete(id)
    
    return {
      contact,
    }
  }
}

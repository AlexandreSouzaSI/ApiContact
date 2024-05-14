import { ContactRepository } from '@/repositories/contact-repository'


export class GetAllContactUseCase {
  constructor(private contactRepository: ContactRepository) {}

  async execute() {

    const contact = await this.contactRepository.findMany()

    return {
      contact,
    }
  }
}

import { Contact } from '@prisma/client'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { ContactRepository } from '@/repositories/contact-repository'

interface UpdateContactUseCaseRequest {
  id: string,
  age: string,
  name: string
}

export class UpdateContactUseCase {
  constructor(private contactRepository: ContactRepository) {}

  async execute({ id, age, name }: UpdateContactUseCaseRequest) {

    const contact = await this.contactRepository.save({
      id,
      age,
      name
    })

    return {
      contact,
    }
  }
}

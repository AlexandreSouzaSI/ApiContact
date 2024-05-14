import { Contact, Phone, Prisma } from '@prisma/client'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { ContactRepository } from '@/repositories/contact-repository'

interface RegisterContactUseCaseRequest {
  name: string
  age: string
}

interface RegisterContactResponse {
  contact: Contact;
}

export class RegisterContactUseCase {
  constructor(private contactRepository: ContactRepository) {}

  async execute({ name, age }: RegisterContactUseCaseRequest) {

    const userWithSameName = await this.contactRepository.findByName(name)

    if (userWithSameName) {
      throw new UserAlreadyExistsError()
    }

    const contact = await this.contactRepository.create({
        name,
        age,
    })

    return {
      contact,
    }
  }
}

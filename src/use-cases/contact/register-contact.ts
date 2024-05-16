import { Contact } from '@prisma/client'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { ContactRepository } from '@/repositories/contact-repository'
import { PhoneRepository } from '@/repositories/phone-repository'

interface RegisterContactUseCaseRequest {
  name: string
  age: string
  phone1?: string
  phone2?: string
  phone3?: string
}

interface RegisterContactResponse {
  contact: Contact;
}

export class RegisterContactUseCase {
  constructor(
    private contactRepository: ContactRepository, 
    private phoneRepository: PhoneRepository
  ) {}

  async execute({ name, age, phone1, phone2, phone3 }: RegisterContactUseCaseRequest): Promise<RegisterContactResponse> {

    const userWithSameName = await this.contactRepository.findByName(name)

    if (userWithSameName) {
      throw new UserAlreadyExistsError()
    }

    const contact = await this.contactRepository.create({
        name,
        age,
    })

    const newContact = await this.contactRepository.findByName(name)

    if(phone1){
      await this.phoneRepository.create({
        contact_Id: newContact!.id,
        number: phone1,
      })
    } else {
      await this.phoneRepository.create({
        contact_Id: newContact!.id,
      })
    }

    if(phone2){
      await this.phoneRepository.create({
        contact_Id: newContact!.id,
        number: phone2,
      })
    } else {
      await this.phoneRepository.create({
        contact_Id: newContact!.id,
      })
    }
    
    if(phone3){
      await this.phoneRepository.create({
        contact_Id: newContact!.id,
        number: phone3,
      })
    } else {
      await this.phoneRepository.create({
        contact_Id: newContact!.id,
      })
    }


    return {
      contact,
    }
  }
}

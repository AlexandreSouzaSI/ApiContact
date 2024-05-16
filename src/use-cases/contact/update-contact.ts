import { ContactRepository } from '@/repositories/contact-repository'
import { PhoneRepository } from '@/repositories/phone-repository'

interface UpdateContactUseCaseRequest {
  id: string,
  age: string,
  name: string,
  phone1?: {
    id: string,
    number: string,
  }
  phone2?: {
    id: string,
    number: string,
  }
  phone3?: {
    id: string,
    number: string,
  }
}

export class UpdateContactUseCase {
  constructor(
    private contactRepository: ContactRepository,
    private phoneRepository: PhoneRepository
  ) {}

  async execute({ id, age, name, phone1, phone2, phone3 }: UpdateContactUseCaseRequest) {

    const contact = await this.contactRepository.save({
      id,
      age,
      name
    })

    console.log("phones: ", phone1, phone2, phone3)

    if(phone1){
      await this.phoneRepository.save({
        id: phone1.id,
        number: phone1.number,
      })
    }

    if(phone2){
      await this.phoneRepository.save({
        id: phone2.id,
        number: phone2.number,
      })
    }
    
    if(phone3){
      await this.phoneRepository.save({
        id: phone3.id,
        number: phone3.number,
      })
    }

    return {
      contact,
    }
  }
}

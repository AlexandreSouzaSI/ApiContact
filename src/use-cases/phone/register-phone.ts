import { PhoneRepository } from '@/repositories/phone-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { ContactRepository } from '@/repositories/contact-repository'
import { PhoneLimitExistsError } from '../errors/user-already-exists-error copy'

interface RegisterPhoneUseCaseRequest {
  contact_Id: string
  number: string
}

export class RegisterPhoneUseCase {
  constructor(private phoneRepository: PhoneRepository, private contactRepository: ContactRepository) {}

  async execute({ contact_Id, number }: RegisterPhoneUseCaseRequest) {

    try {
      const contactExists = await this.contactRepository.findById(contact_Id)
  
      if (!contactExists) {
        throw new UserAlreadyExistsError()
      }
  
      const moreThanTreeFones = await this.phoneRepository.findById(contact_Id)
  
      if (moreThanTreeFones!.number.length <= 3) {
        const contactPhone = await this.phoneRepository.create({
            contact_Id,
            number,
        })
    
        return {
          contactPhone,
        }
      }
    } catch (erro) {
      console.log('Limite de telefones cadastrados', erro)
    }
  }
}

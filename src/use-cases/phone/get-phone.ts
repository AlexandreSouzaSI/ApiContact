import { PhoneRepository } from '@/repositories/phone-repository'

interface GetPhoneUseCaseRequest {
  contact_Id: string
}

export class GetPhoneUseCase {
  constructor(private phoneRepository: PhoneRepository) {}

  async execute({ contact_Id }: GetPhoneUseCaseRequest) {

    const phone = await this.phoneRepository.findById(contact_Id)

    return {
      phone,
    }
  }
}

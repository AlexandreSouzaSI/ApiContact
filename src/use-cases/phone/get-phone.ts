import { PhoneRepository } from '@/repositories/phone-repository'

interface GetPhoneUseCaseRequest {
  id: string
}

export class GetPhoneUseCase {
  constructor(private phoneRepository: PhoneRepository) {}

  async execute({ id }: GetPhoneUseCaseRequest) {

    const phone = await this.phoneRepository.findById(id)

    return {
      phone,
    }
  }
}

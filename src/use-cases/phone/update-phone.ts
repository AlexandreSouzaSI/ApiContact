import { PhoneRepository } from '@/repositories/phone-repository'

interface UpdatePhoneUseCaseRequest {
  id: string
  number: string
}

export class UpdatePhoneUseCase {
  constructor(private phoneRepository: PhoneRepository) {}

  async execute({ id, number }: UpdatePhoneUseCaseRequest) {

    const phone = await this.phoneRepository.save({
      id,
      number
    })

    return {
      phone,
    }
  }
}

import { PhoneRepository } from '@/repositories/phone-repository'

interface DeletePhoneUseCaseRequest {
  id: string
}

export class DeletePhoneUseCase {
  constructor(private phoneRepository: PhoneRepository) {}

  async execute({ id }: DeletePhoneUseCaseRequest) {

    const phone = await this.phoneRepository.delete(id)

    return {
      phone,
    }
  }
}

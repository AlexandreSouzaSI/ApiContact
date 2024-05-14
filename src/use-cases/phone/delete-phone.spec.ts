import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryContactRepository } from '@/repositories/in-memory/in-memory-contact-repository'
import { InMemoryPhoneRepository } from '@/repositories/in-memory/in-memory-phone-repository'
import { DeletePhoneUseCase } from './delete-phone'

let phoneRepository: InMemoryPhoneRepository
let sut: DeletePhoneUseCase

describe('Delete phone Use Case', () => {
  beforeEach(() => {
    phoneRepository = new InMemoryPhoneRepository()
    sut = new DeletePhoneUseCase(phoneRepository)
  })
  it('should be able to delete a phone', async () => {
    
    await phoneRepository.create({
      id: '123123',
      number: '000000400',
      contact_Id: "0000"
    })

    const phone = await sut.execute({
      id: '123456',
    })

    expect(phone.phone).toBeNull()
  })
})

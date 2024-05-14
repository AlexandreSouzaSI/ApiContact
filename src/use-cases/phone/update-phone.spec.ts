import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPhoneRepository } from '@/repositories/in-memory/in-memory-phone-repository'
import { UpdatePhoneUseCase } from './update-phone'

let phoneRepository: InMemoryPhoneRepository
let sut: UpdatePhoneUseCase

describe('Update a phone Use Case', () => {
  beforeEach(() => {
    phoneRepository = new InMemoryPhoneRepository()
    sut = new UpdatePhoneUseCase(phoneRepository)
  })

  it('should be able to update a phone', async () => {
    const contact = await phoneRepository.create({
        id: '000222',
        contact_Id: '123456',
        number: '32323232',
    })

    const phone = await sut.execute({
      id: contact.id,
      number: '31975805400',
    })

    expect(phone.phone).toEqual(expect.objectContaining({ number: '31975805400' }))

  })
})

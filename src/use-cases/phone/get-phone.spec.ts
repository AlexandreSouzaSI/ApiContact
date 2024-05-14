import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPhoneRepository } from '@/repositories/in-memory/in-memory-phone-repository'
import { GetPhoneUseCase } from './get-phone'

let phoneRepository: InMemoryPhoneRepository
let sut: GetPhoneUseCase

describe('Get a Phone Use Case', () => {
  beforeEach(() => {
    phoneRepository = new InMemoryPhoneRepository()
    sut = new GetPhoneUseCase(phoneRepository)
  })

  it('should be able to search a contact by id', async () => {
    await phoneRepository.create({
      number: '31975805400',
      contact_Id: "1111"
    })

    await phoneRepository.create({
      id: '123123',
      number: '000000400',
      contact_Id: "2222"
    })

    const { phone } = await sut.execute({
      id: '123123'
    })

    expect(phone).toEqual(expect.objectContaining({ number: '000000400' }))

  })
})

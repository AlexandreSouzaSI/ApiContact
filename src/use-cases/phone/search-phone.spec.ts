import { InMemoryPhoneRepository } from '@/repositories/in-memory/in-memory-phone-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPhoneUseCase } from './search-phone'

let phoneRepository: InMemoryPhoneRepository
let sut: SearchPhoneUseCase

describe('Search phone Use Case', () => {
  beforeEach(async () => {
    phoneRepository = new InMemoryPhoneRepository()
    sut = new SearchPhoneUseCase(phoneRepository)
  })

  it('should be able to search a phone', async () => {
    
    await phoneRepository.create({
      number: '31975805400',
      contact_Id: '1234'
    })

    await phoneRepository.create({
      number: '000000400',
      contact_Id: "4321"
    })

    const { phone } = await sut.execute({
      query: '000000400',
    })

    expect(phone).toEqual([expect.objectContaining({ number: '000000400' })])
  })
})

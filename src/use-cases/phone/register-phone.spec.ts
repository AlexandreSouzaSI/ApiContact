import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryContactRepository } from '@/repositories/in-memory/in-memory-contact-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { RegisterPhoneUseCase } from './register-phone'
import { InMemoryPhoneRepository } from '@/repositories/in-memory/in-memory-phone-repository'

let phoneRepository: InMemoryPhoneRepository
let contactRepository: InMemoryContactRepository
let sut: RegisterPhoneUseCase

describe('Register Phone Use Case', () => {
  beforeEach(() => {
    phoneRepository = new InMemoryPhoneRepository()
    contactRepository = new InMemoryContactRepository()
    sut = new RegisterPhoneUseCase(phoneRepository, contactRepository)
  })
  it('should be able to register a phone for contact', async () => {
    const contact = await contactRepository.create({
      id: '123456',
      age: '31',
      name: 'Alexandre'
    })

    const phone = await phoneRepository.create({
      number: '31975805400',
      contact_Id: contact.id
    })

    expect(phone.number).toEqual('31975805400')
  })
})

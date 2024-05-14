import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryContactRepository } from '@/repositories/in-memory/in-memory-contact-repository'
import { GetContactUseCase } from './get-contact'

let contactRepository: InMemoryContactRepository
let sut: GetContactUseCase

describe('Get a Contact Use Case', () => {
  beforeEach(() => {
    contactRepository = new InMemoryContactRepository()
    sut = new GetContactUseCase(contactRepository)
  })

  it('should be able to search a contact by id', async () => {
    await contactRepository.create({
      id: '123456',
      name: 'Ale',
      age: '30'
    })

    const contact = await sut.execute({
      userId: '123456',
    })


    expect(contact.contact).toEqual(expect.objectContaining({ name: 'Ale' }))

  })
})

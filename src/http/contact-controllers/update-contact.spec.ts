/* import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryContactRepository } from '@/repositories/in-memory/in-memory-contact-repository'
import { UpdateContactUseCase } from './update-contact'

let contactRepository: InMemoryContactRepository
let sut: UpdateContactUseCase

describe('Update a Contact Use Case', () => {
  beforeEach(() => {
    contactRepository = new InMemoryContactRepository()
    sut = new UpdateContactUseCase(contactRepository)
  })

  it('should be able to update a contact', async () => {
    await contactRepository.create({
      id: '123456',
      name: 'Ale',
      age: '30'
    })

    const contact = await sut.execute({
        id: '123456',
        data: {
          name: 'Alexandre',
          age: '36',
        }
    })


    expect(contact.contact).toEqual(expect.objectContaining({ name: 'Alexandre' }))

  })
})
 */
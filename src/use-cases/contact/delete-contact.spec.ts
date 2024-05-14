import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryContactRepository } from '@/repositories/in-memory/in-memory-contact-repository'
import { DeleteContactUseCase } from './delete-contact'

let contactRepository: InMemoryContactRepository
let sut: DeleteContactUseCase

describe('Delete Contact Use Case', () => {
  beforeEach(() => {
    contactRepository = new InMemoryContactRepository()
    sut = new DeleteContactUseCase(contactRepository)
  })
  it('should be able to delete a contact', async () => {
    await contactRepository.create({
      id: '123456',
      name: 'Ale',
      age: '30'
    })

    const contact = await sut.execute({
      userId: '123456',
    })
    expect(contact.contact?.validated_at).toEqual(expect.any(Date))
  })
})

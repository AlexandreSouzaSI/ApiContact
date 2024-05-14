/* import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { InMemoryContactRepository } from '@/repositories/in-memory/in-memory-contact-repository'
import { app } from '@/app'

describe('Get a Contact Use Case', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
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
 */
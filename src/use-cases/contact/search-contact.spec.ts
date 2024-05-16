import { InMemoryContactRepository } from '@/repositories/in-memory/in-memory-contact-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchContactUseCase } from './search-contact'

let contactRepository: InMemoryContactRepository
let sut: SearchContactUseCase

describe('Search contact Use Case', () => {
  beforeEach(async () => {
    contactRepository = new InMemoryContactRepository()
    sut = new SearchContactUseCase(contactRepository)
  })

  it('should be able to search a contact', async () => {
    await contactRepository.create({
      name: 'Alexandre',
      age: '30'
    })

    await contactRepository.create({
      name: 'Souza',
      age: '36'
    })

    const { contact } = await sut.execute({
      query: 'Alexandre',
    })

    expect(contact).toHaveLength(1)
    expect(contact).toEqual([expect.objectContaining({ name: 'Alexandre' })])
  })

  it('should be able to fetch paginated contact search', async () => {
    for (let i = 1; i <= 12; i++) {
      await contactRepository.create({
        name: `Souza ${i}`,
        age: `${i}`
      })
    }

    const { contact } = await sut.execute({
      query: 'Souza',
    })

    expect(contact).toEqual([
      expect.objectContaining({ name: 'Souza 11' }),
      expect.objectContaining({ name: 'Souza 12' }),
    ])
  })
})

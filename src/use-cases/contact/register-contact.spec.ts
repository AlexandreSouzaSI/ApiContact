import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryContactRepository } from '@/repositories/in-memory/in-memory-contact-repository'
import { RegisterContactUseCase } from './register-contact'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

let contactRepository: InMemoryContactRepository
let sut: RegisterContactUseCase

describe('Contact Use Case', () => {
  beforeEach(() => {
    contactRepository = new InMemoryContactRepository()
    sut = new RegisterContactUseCase(contactRepository)
  })
  it('should be able to register a contact', async () => {
    const { contact } = await sut.execute({
      name: 'Alexandre',
      age: '36',
    })

    expect(contact.id).toEqual(expect.any(String))
  })

  it('should not be able to register with same name twice', async () => {
    const name = 'Alexandre M'

    await sut.execute({
      name,
      age: '20',
    })

    await expect(() =>
      sut.execute({
        name,
        age: '20',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Contact (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a contact', async () => {

    const contact = await prisma.contact.create({
      data: {
        name: 'Alexandre',
        age: '36',
      }
    })

    expect(contact.id).toEqual(expect.any(String))
  })

  /* it('should not be able to register with same name twice', async () => {
    const name = 'Alexandre M'

    await prisma.contact.create({
      data: {
        name,
        age: '20',
      }
    })

    await expect(() =>
      prisma.contact.create({
        data: {
          name,
          age: '20',
        }
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  }) */
})

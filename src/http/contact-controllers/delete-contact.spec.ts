import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Delete Contact Use Case', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete a contact', async () => {
    const newContact = await prisma.contact.create({
      data: {
        name: 'Alexandre',
        age: '36',
      }
    })

    const contact = await prisma.contact.delete({
        where: {
          id: newContact.id,
        }
    })
    expect(contact).toBeNull()
  })
})

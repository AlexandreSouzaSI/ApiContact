import { Prisma, Contact } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { ContactRepository } from '../contact-repository'

export class InMemoryContactRepository implements ContactRepository {
  public items: Contact[] = []

  async save(data: Contact) {
    const contactInIndex = this.items.findIndex((item) => item.id === data.id)

    if (contactInIndex >= 0) {
      this.items[contactInIndex] = data
    }

    return data
  }

  async searchMany(query: string, page: number) {
    return this.items.filter((item) => item.name.includes(query)).filter((item) => item.validated_at === null).slice((page -1) * 10, page * 10)
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id && item.validated_at === null)

    if (!user) {
      return null
    }

    return user
  }

  async delete(id: string) {
    const contact = this.items.find((item) => item.id === id)

    if (!contact) {
      return null
    }

    contact.validated_at = new Date()

    return contact
  }

  async findByName(name: string) {
    const contact = this.items.find((item) => item.name === name)

    if (!contact) {
      return null
    }

    return contact
  }

  async create(data: Prisma.ContactCreateInput) {
    const contact = {
      id: data.id ?? randomUUID(),
      name: data.name,
      age: data.age,
      created_at: new Date(),
      validated_at: null,
    }

    this.items.push(contact)

    return contact
  }
}

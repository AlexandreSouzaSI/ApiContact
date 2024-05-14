import { Prisma, Contact } from '@prisma/client'

export interface ContactRepository {
  create(data: Prisma.ContactCreateInput): Promise<Contact>
  delete(id: string): Promise<Contact | null>
  save(data: Prisma.ContactUpdateInput): Promise<Contact>
  findById(id: string): Promise<Contact | null>
  searchMany(query: string, page: number): Promise<Contact[]>
  findByName(name: string): Promise<Contact | null>
}

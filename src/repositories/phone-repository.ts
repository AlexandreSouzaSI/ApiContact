import { Contact, Phone, Prisma } from '@prisma/client'

export interface PhoneRepository {
  findById(id: string): Promise<Phone | null>
  searchMany(query: string, page: number): Promise<Phone[]>
  delete(id: string): Promise<Phone | null>
  create(data: Prisma.PhoneUncheckedCreateInput): Promise<Phone>
  save(data: Prisma.PhoneUpdateInput): Promise<Phone>
}

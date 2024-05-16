import { Contact, Phone, Prisma } from '@prisma/client'

export interface PhoneRepository {
  findById(contact_Id: string): Promise<Phone[] | null>
  searchMany(query: string): Promise<Phone[]>
  delete(id: string): Promise<Phone | null>
  create(data: Prisma.PhoneUncheckedCreateInput): Promise<Phone>
  save(data: Prisma.PhoneUpdateInput): Promise<Phone>
}

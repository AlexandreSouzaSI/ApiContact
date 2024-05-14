import { Phone, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PhoneRepository } from '../phone-repository'

export class PrismaPhoneRepository implements PhoneRepository {
  async delete(id: string) {
    const contact = await prisma.phone.delete({
      where: {
        id,
      },
    })

    return contact
  }

  async save(data: Phone) {
    const contact = await prisma.phone.update({
      where: {
        id: data.id,
      },
      data,
    })

    return contact
  }

  async create(data: Prisma.PhoneUncheckedCreateInput) {
    const phone = await prisma.phone.create({
      data,
    })

    return phone
  }

  async findById(id: string) {
    const phone = await prisma.phone.findUnique({
      where: { id },
    })
    return phone
  }

  async searchMany(query: string, page: number) {
    const phone = await prisma.phone.findMany({
      where: {
        number: {
          contains: query,
        },
      },
      take: 10,
      skip: (page - 1) * 10,
    })
    return phone
  }
}

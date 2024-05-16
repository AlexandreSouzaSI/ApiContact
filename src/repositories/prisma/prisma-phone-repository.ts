import { Phone, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PhoneRepository } from '../phone-repository'
import { UserNotExistsError } from '@/use-cases/errors/user-not-exists-error'

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
    console.log("data no repository: ",data)
    const contact = await prisma.phone.update({
      where: {
        id: data.id,
      },
      data,
    })

    return contact
  }

  async create(data: Prisma.PhoneUncheckedCreateInput) {

    console.log("Repository Data: ",data)
    
    const contact = await prisma.contact.findUnique({
      where: {
        id: data.contact_Id
      }
    })

    if(!contact) {
      throw new UserNotExistsError()
    }

    const contactPhone = await prisma.phone.findMany({
      where: {
        contact_Id: contact.id
      }
    })

    const maxPhonesPerContact = 3; 
    if (contactPhone.length >= maxPhonesPerContact) {
      throw new Error('Número máximo de telefones por contato atingido');
    }

    const phone = await prisma.phone.create({
      data,
    })

    return phone
  }

  async findById(contact_Id: string) {
    const phone = await prisma.phone.findMany({
      where: { 
        contact_Id
       },
    })
    return phone
  }

  async searchMany(query: string) {
    const phone = await prisma.phone.findMany({
      where: {
        number: {
          contains: query,
        },
      },
    })
    return phone
  }
}

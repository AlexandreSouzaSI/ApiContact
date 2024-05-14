import { Phone, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { PhoneRepository } from '../phone-repository'

export class InMemoryPhoneRepository implements PhoneRepository {
  public items: Phone[] = []

  async create(data: Prisma.PhoneUncheckedCreateInput) {
    const phone = {
      id: data.id ?? randomUUID(),
      number: data.number,
      contact_Id: data.contact_Id,
      created_at: new Date(),
    }

    this.items.push(phone)

    return phone
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.number.includes(query))
      .slice((page - 1) * 10, page * 10)
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  } 

  async delete(id: string) {
    const phoneIndex = this.items.findIndex((item) => item.id === id)

    if (phoneIndex === -1) {
      return null
    }

    const deletedContact = this.items.splice(phoneIndex, 1)[0];

    return deletedContact;
  }

  async save(data: Phone) {
    const phoneInIndex = this.items.findIndex((item) => item.id === data.id)

    if (phoneInIndex >= 0) {
      this.items[phoneInIndex] = data
    }

    return data
  }

  /* async findManyNearby(params: FindManyByParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )
      return distance < 10
    })
  }

  

  */
}

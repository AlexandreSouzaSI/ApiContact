import { Contact, Prisma } from "@prisma/client"
import { ContactRepository } from "../contact-repository"
import { prisma } from "@/lib/prisma"
import fs from 'fs/promises';

export class PrismaContactRepository implements ContactRepository {
  async delete(id: string) {

    
    const deleteContact = await prisma.$transaction(async (prisma) => {
      const contact = await prisma.contact.findUnique({
        where: { id },
        include: { phone: true },
      });
      
      if (!contact) {
        throw new Error(`Contato com ID ${id} não encontrado.`);
      }

      
      const contactInfo = `
        Contato Deletado:
        ID: ${contact.id}
        Nome: ${contact.name}
        Idade: ${contact.age}
        Telefones: ${contact.phone.map((phone) => phone.number).join(', ')}
        Data de Validação: ${contact.validated_at ?? 'N/A'}
        Data de Criação: ${contact.created_at}
      `;
  
      await fs.writeFile('deleted_contact.txt', contactInfo);
  
      const user = await prisma.phone.deleteMany({
        where: { 
          contact_Id: id
         },
      });

      console.log("aqui: ", user)

  
      await prisma.contact.delete({
        where: { id },
      });
  
      return contact;
    });
  
    return deleteContact;
  }

  async save(data: Contact) {
    const contact = await prisma.contact.update({
      where: {
        id: data.id,
      },
      data,
      include: { phone: true }
    })

    return contact
  }

  async searchMany(query: string, page: number) {
    const contact = await prisma.contact.findMany({
      where: {
        validated_at: null,
        name: {
          contains: query,
        },
      },
      take: 10,
      skip: (page - 1) * 10,
      include: { phone: true }
    })
    return contact
  }

  async findMany(query?: string, page?: string) {
    const contact = await prisma.contact.findMany({
      where: {
        validated_at: null,
        OR: [
          {
            name: {
              contains: query || '', // Verifica se o nome contém o termo de pesquisa
            },
          },
          {
            phone: {
              some: {
                number: {
                  contains: query || '', // Verifica se algum número de telefone contém o termo de pesquisa
                },
              },
            },
          },
        ],
      },
      take: 10, // Limite de resultados por página
      skip: page ? (parseInt(page) - 1) * 10 : 0, // Pular resultados se a página não for a primeira
      include: {
        phone: true, // Inclui os números de telefone associados aos contatos
      },
    });
    return {
      contact
    }
  }

  async findByName(name: string) {
    const contact = await prisma.contact.findFirst({
      where: {
        name,
        validated_at: null
      },
      include: { phone: true }
    })

    return contact
  }

  async findById(id: string) {
    const contact = await prisma.contact.findUnique({
      where: {
        id,
        validated_at: null
      },
      include: { phone: true }
    })

    return contact
  }

  async create(data: Prisma.ContactCreateInput) {
    const contact = await prisma.contact.create({
      data,
    })

    return contact
  }
}

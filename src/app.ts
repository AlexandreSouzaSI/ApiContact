import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { contactRoutes } from './http/contact-controllers/routes'
import { phoneRoutes } from './http/phone-controllers/routes'
import { fastifyCors } from '@fastify/cors'

export const app = fastify()


// Adicione o plugin fastify-cors ao seu servidor Fastify
app.register(fastifyCors, {
  origin: '*', // Permitir requisições de qualquer origem (isso é amplo, considere restringir conforme necessário)
});

app.register(contactRoutes)
app.register(phoneRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({
    message: 'Internal server error.',
  })
})

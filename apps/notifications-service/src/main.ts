import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { type MicroserviceOptions, Transport } from '@nestjs/microservices'
import { GlobalExceptionFilter } from '@repo/errors/nestjs'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new GlobalExceptionFilter())
  app.enableCors()
  const configService = app.get(ConfigService)

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow<string>('RABBITMQ_URL')],
      queue: 'notifications_queue',
      queueOptions: {
        durable: false
      }
    }
  })

  await app.startAllMicroservices()
  await app.listen(3004)

  console.log('🚀 Notifications Service rodando na porta 3004 (WS)')
  console.log('📬 Notifications Service ouvindo RabbitMQ...')
}
bootstrap()

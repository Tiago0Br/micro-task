import { NestFactory } from '@nestjs/core'
import { GlobalExceptionFilter } from '@repo/errors/nestjs'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new GlobalExceptionFilter())
  await app.listen(3003)
}
bootstrap()

import { NestFactory } from '@nestjs/core'
import { GlobalExceptionFilter } from '@repo/errors'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new GlobalExceptionFilter())
  await app.listen(3002)
}
bootstrap()

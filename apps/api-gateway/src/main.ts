import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { GlobalExceptionFilter } from '@repo/errors/nestjs'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  app.useGlobalFilters(new GlobalExceptionFilter())

  const frontendUrl = configService.getOrThrow<string>('FRONTEND_URL')
  app.enableCors({ origin: frontendUrl })

  const config = new DocumentBuilder()
    .setTitle('MicroTask API Gateway')
    .setDescription('Documentação da MicroTask API')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  app.use(
    '/auth',
    createProxyMiddleware({
      target: configService.getOrThrow<string>('AUTH_SERVICE_URL'),
      changeOrigin: true,
      pathRewrite: {
        '^/auth': ''
      }
    })
  )

  app.use(
    '/tasks',
    createProxyMiddleware({
      target: configService.getOrThrow<string>('TASKS_SERVICE_URL'),
      changeOrigin: true,
      pathRewrite: {
        '^/tasks': ''
      }
    })
  )

  app.use(
    '/notifications',
    createProxyMiddleware({
      target: configService.getOrThrow<string>('NOTIFICATIONS_SERVICE_URL'),
      changeOrigin: true,
      pathRewrite: {
        '^/notifications': ''
      }
    })
  )

  await app.listen(3001)
}
bootstrap()

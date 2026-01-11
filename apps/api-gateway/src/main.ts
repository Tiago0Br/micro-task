import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

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
      target: process.env.AUTH_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/auth': ''
      }
    })
  )

  app.use(
    '/tasks',
    createProxyMiddleware({
      target: process.env.TASKS_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/tasks': ''
      }
    })
  )

  app.use(
    '/notifications',
    createProxyMiddleware({
      target: process.env.NOTIFICATIONS_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/notifications': ''
      }
    })
  )

  await app.listen(3001)
}
bootstrap()

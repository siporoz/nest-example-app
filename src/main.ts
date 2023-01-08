import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function start() {
    const port = process.env.PORT || 5200 
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle('Урок по продвинутому бэкенду')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('SIPOROZ')
        .build()
    
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    await app.listen(port, () => {console.log(`listen port ${port}`)})
}

start()
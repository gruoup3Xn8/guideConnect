import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as express from "express";
import { HttpExceptionFilter } from "./common/filter/all-expextion.filters";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  //  swagger

  const config = new DocumentBuilder()
    .setTitle("GuideConnect project")
    .setDescription("GuideConnect documantation")
    .setVersion("1.0.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        name: "JWT",
        bearerFormat: "JWT",
        description: "JWT token from header",
        in: "header",
      },
      "JWT-auth",
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // app.use("/uploads", express.static("uploads"))

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`server is running at: http://localhost:${PORT}`);
    console.log(`documantation link: http://localhost:${PORT}/api`);
  });
}
bootstrap();



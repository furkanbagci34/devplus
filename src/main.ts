import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from "body-parser";
import * as dotenv from "dotenv";
import { Service } from "fumaweb-modules";
import { AppModule } from './app.module';
import Db = Service.DbService
import Cron = Service.Cron

async function bootstrap() {
  dotenv.config();
  const db = new Db(process.env.SQL_CONNECTION_STRING)
  const a = await db.query("select * from users");
  console.log(a)
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ limit: "50mb", extended: true }));

  await app.init();
  await app.listen(process.env.SERVER_PORT, "0.0.0.0");
}

bootstrap().then(() => {
  console.log(`DevPlus Server is running on port: ${process.env.SERVER_PORT} `);
}).catch((err) => console.log(err));
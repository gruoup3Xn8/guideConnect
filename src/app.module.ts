import { Module } from '@nestjs/common';
import { GuideModule } from './module/guide/guide.module';
import { EventsModule } from './module/events/events.module';
import { HotelModule } from './module/hotel/hotel.module';
import { RestaurantsModule } from './module/restaurants/restaurants.module';
import { TransportModule } from './module/transport/transport.module';
import { AuthModule } from './module/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guide } from './module/guide/entities/guide.entity';
import { Event } from './module/events/entities/event.entity';
import { Restaurant } from './module/restaurants/entities/restaurant.entity';
import { Transport } from './module/transport/entities/transport.entity';
import { Auth } from './module/auth/entities/auth.entity';
import { Hotel } from './module/hotel/entities/hotel.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: ".env", isGlobal: true}),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "posrtgres",
      password: String(process.env.DB_PASSWORD),
      database: String(process.env.DB_NAME),
      entities: [Guide, Event, Hotel, Restaurant, Transport, Auth],
      synchronize: true
    }),
    GuideModule, EventsModule, HotelModule, RestaurantsModule, TransportModule, AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

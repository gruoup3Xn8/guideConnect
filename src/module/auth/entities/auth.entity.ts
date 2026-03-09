
import { BaseEntity } from "src/database/base.entity";
import { Event } from "src/module/events/entities/event.entity";
import { Guide } from "src/module/guide/entities/guide.entity";
import { Hotel } from "src/module/hotel/entities/hotel.entity";
import { Restaurant } from "src/module/restaurants/entities/restaurant.entity";
import { Transport } from "src/module/transport/entities/transport.entity";
import { Entity, OneToMany } from "typeorm";

@Entity({name: "Auth"})
export class Auth extends BaseEntity {
  

    // RELATION
    @OneToMany(() => Event, (event) => event.auth)
    event: Event[]

    @OneToMany(() => Guide, (guide) => guide.auth)
    guide: Guide[]

     @OneToMany(() => Hotel, (hotel) => hotel.auth)
    hotel: Hotel[]

    @OneToMany(() => Restaurant, (resta) => resta.auth)
    resta: Restaurant[]

    @OneToMany(() => Transport, (transport) => transport.auth)
    transport: Transport[]

}


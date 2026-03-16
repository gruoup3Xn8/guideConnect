
import { BaseEntity } from "src/database/base.entity";
import { Auth } from "src/module/auth/entities/auth.entity";
import { Event } from "src/module/events/entities/event.entity";
import { Guide } from "src/module/guide/entities/guide.entity";
import { Hotel } from "src/module/hotel/entities/hotel.entity";
import { Restaurant } from "src/module/restaurants/entities/restaurant.entity";
import { Transport } from "src/module/transport/entities/transport.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity({name: "Locations"})
export class Location extends BaseEntity {
   @Column()
   country_name: string

   @OneToMany(() => Hotel, (hotel) => hotel.location)
   hotel: Hotel[] 

   @ManyToOne(() => Auth, (auth) => auth.location)
   @JoinColumn({name: "auth_id"})
   auth: Auth

   @OneToMany(() => Transport, (transport) => transport.location)
transport: Transport[] 

      @OneToMany(() => Restaurant, (resta) => resta.location)
   resta: Restaurant[] 

   
      @OneToMany(() => Event, (event) => event.location)
   event: Event[] 

   @OneToMany(() => Guide, (guide) => guide.location)
   guide: Guide[] 
}


import { BaseEntity } from "src/database/base.entity";
import { Event } from "src/module/events/entities/event.entity";
import { Guide } from "src/module/guide/entities/guide.entity";
import { Hotel } from "src/module/hotel/entities/hotel.entity";
import { Location } from "src/module/loacation/entities/loacation.entity";
import { Restaurant } from "src/module/restaurants/entities/restaurant.entity";
import { Transport } from "src/module/transport/entities/transport.entity";
import { UserRole } from "src/shared/constant/user.role";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({name: "Auth"})
export class Auth extends BaseEntity {

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    otp: string

    @Column({type: "bigint"})
    otptime: number

    @Column({default: UserRole.USER })
    role: UserRole

    @Column({nullable:true})
    first_name?: string

    @Column({nullable: true})
    last_name?: string

    @Column({nullable:true})
    profil_img?: string

    @Column({nullable: true})
    phone_number?: string

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

      @OneToMany(() => Location, (location) => location.auth)
     location: Location[] 

}


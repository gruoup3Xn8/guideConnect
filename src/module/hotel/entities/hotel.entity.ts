
import { BaseEntity } from "src/database/base.entity";
import { Auth } from "src/module/auth/entities/auth.entity";
import { Location } from "src/module/loacation/entities/loacation.entity";
import { Entity, JoinColumn, ManyToOne, Column } from "typeorm";

@Entity({name: "Hotels"})
export class Hotel extends BaseEntity{

    @Column({type: "varchar", length: 255})
    hotel_name: string

    @Column({type: "text", nullable: true})
    description: string

    @Column({type: "varchar", length: 50, default: "active"})
    status: string

    @Column({type: "boolean", default: true})
    isActive: boolean

    // RELATION
    @ManyToOne(() => Auth, (auth) => auth.hotel)
    @JoinColumn({name: "auth_id"})
    auth: Auth

    @ManyToOne(() =>Location, (location) => location.hotel )
    @JoinColumn({name: "location_id"})
    location: Location

}

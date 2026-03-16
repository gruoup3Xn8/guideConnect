import { BaseEntity } from "src/database/base.entity";
import { Auth } from "src/module/auth/entities/auth.entity";
import { Location } from "src/module/loacation/entities/loacation.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({name: "Events"})
export class Event extends BaseEntity {
    
    // RELATION
    @ManyToOne(() => Auth, (auth) => auth.event)
    @JoinColumn({name: "auth_id"})
    auth: Auth

    
      @ManyToOne(() =>Location, (location) => location.event)
      @JoinColumn({name: "location_id"})
      location: Location
}

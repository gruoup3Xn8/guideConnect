import { BaseEntity } from "src/database/base.entity";
import { Auth } from "src/module/auth/entities/auth.entity";
import { Location } from "src/module/loacation/entities/loacation.entity";
import { Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({name: "Restaurants"})
export class Restaurant extends BaseEntity {

    // RELATION
    @ManyToOne(() => Auth, (auth) => auth.resta)
    @JoinColumn({name: "auth_id"})
    auth: Auth
    
    
      @ManyToOne(() =>Location, (location) => location.resta )
      @JoinColumn({name: "location_id"})
      location: Location
}

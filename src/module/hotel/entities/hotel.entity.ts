import { BaseEntity } from "src/database/base.entity";
import { Auth } from "src/module/auth/entities/auth.entity";
import { Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({name: "Hotels"})
export class Hotel extends BaseEntity{

    // RELATION
    @ManyToOne(() => Auth, (auth) => auth.hotel)
    @JoinColumn({name: "auth_id"})
    auth: Auth

}

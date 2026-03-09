import { BaseEntity } from "src/database/base.entity";
import { Auth } from "src/module/auth/entities/auth.entity";
import { Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({name: "Restaurants"})
export class Restaurant extends BaseEntity {

    // RELATION
    @ManyToOne(() => Auth, (auth) => auth.resta)
    @JoinColumn({name: "auth_id"})
    auth: Auth
}

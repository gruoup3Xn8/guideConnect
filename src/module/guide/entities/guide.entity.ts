import { BaseEntity } from "src/database/base.entity";
import { Auth } from "src/module/auth/entities/auth.entity";
import { Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({name: "Guides"})
export class Guide extends BaseEntity {


    // RELATION
    @ManyToOne(() => Auth, (auth) => auth.guide)
    @JoinColumn({name: "auth_id"})
    auth: Auth
}

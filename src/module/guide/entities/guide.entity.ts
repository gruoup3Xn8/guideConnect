import { Auth } from "src/module/auth/entities/auth.entity";
import { BaseEntity, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({name: "Guides"})
export class Guide extends BaseEntity {


    // RELATION
    @ManyToOne(() => Auth, (auth) => auth.guide)
    @JoinColumn({name: "auth_id"})
    auth: Auth
}

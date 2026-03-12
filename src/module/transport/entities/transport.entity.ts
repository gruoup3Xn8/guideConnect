import { BaseEntity } from "src/database/base.entity";
import { Auth } from "src/module/auth/entities/auth.entity";
import { Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({name: "Transports"})
export class Transport extends BaseEntity {

    // RELATION
    @ManyToOne(() => Auth, (auth) => auth.transport)
    @JoinColumn({name: "auth_id"})
    auth: Auth
}

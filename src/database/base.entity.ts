import {  CreateDateColumn,PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

export abstract class BaseEntity   {
 @PrimaryGeneratedColumn()
 id: number
 
 @CreateDateColumn()
 created_At: Date

 @UpdateDateColumn()
 updated_At: Date
}

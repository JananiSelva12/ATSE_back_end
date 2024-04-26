import { PrimaryGeneratedColumn, Column, BeforeUpdate } from "typeorm";
import moment from "moment";

/**
 * Base entity class for columns that are shared through all entities
 */
export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @BeforeUpdate()
  updateDates?() {
    this.updated_at = moment().toDate();
  }
}

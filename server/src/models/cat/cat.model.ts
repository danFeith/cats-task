import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { MouseModel } from "../mouse/mouse.model";
import { BaseModel } from "../base.model";

export interface ISerializedCat {
  id: number;
  firstName: string;
  lastName: string;
  description?: string;
  image?: string;
}

@Table({
  tableName: "cats",
})
export class CatModel extends BaseModel<ISerializedCat> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare firstName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare lastName: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare image?: string;

  @HasMany(() => MouseModel)
  declare mouses?: MouseModel[];

  serialize() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      description: this.description,
      image: this.image,
    };
  }
}

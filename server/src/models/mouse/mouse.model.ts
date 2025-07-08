import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { CatModel } from "../cat/cat.model";
import { BaseModel } from "../base.model";

export interface ISerializedMouse {
  id: number;
  name: string;
  catId: number;
}

@Table({
  tableName: "mouses",
})
export class MouseModel extends BaseModel<ISerializedMouse> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @ForeignKey(() => CatModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare catId: number;

  @BelongsTo(() => CatModel)
  declare cat: CatModel;

  serialize() {
    return {
      id: this.id,
      name: this.name,
      catId: this.catId,
    };
  }
}

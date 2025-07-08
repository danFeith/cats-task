import { Model } from "sequelize-typescript";
import { ISerializable } from "../interfaces/serializable.interface";

export abstract class BaseModel<T> extends Model implements ISerializable<T> {
  abstract serialize(): T;
}

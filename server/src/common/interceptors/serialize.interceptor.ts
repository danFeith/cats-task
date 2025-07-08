import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, map } from "rxjs";
import { BaseModel } from "../../models/base.model";

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((item) =>
            item instanceof BaseModel ? item.serialize() : item
          );
        }

        if (data instanceof BaseModel) {
          return data.serialize();
        }

        return data;
      })
    );
  }
}

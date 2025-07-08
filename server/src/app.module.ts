import { Module } from "@nestjs/common";
import { CatModule } from "./modules/cat/cat.module";
import { MouseModule } from "./modules/mouse/mouse.module";
import { PostgresProvider } from "./providers/database/postgres/postgres.provider";

@Module({
  imports: [CatModule, MouseModule, PostgresProvider],
})
export class AppModule {}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import { CatService } from "./cat.service";
import { CreateCatSchema } from "./cat.schema";

@Controller("cat")
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get("/search")
  async search(@Query("query") query: string) {
    return await this.catService.searchByName(query);
  }

  @Get("/all")
  async findAll() {
    return await this.catService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateCatSchema) {
    return await this.catService.create(dto);
  }

  @Delete("/:id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    return await this.catService.delete(id);
  }
}

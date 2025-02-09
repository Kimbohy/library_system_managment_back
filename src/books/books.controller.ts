import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // GET /books?title=&author=&genre= --> [] get all books with optional query params
  @Get()
  getBooks(
    @Query('title') title: string,
    @Query('author') author: string,
    @Query('genre') genre: string,
  ) {
    return this.booksService.getBooks(title, author, genre);
  }
  // GEt /books/:id --> {}        get a book by id
  @Get(':id')
  getBook(@Param('id') id: string) {
    return {
      id,
    };
  }
  // POST /books --> {}           create a book
  @Post()
  createBook(@Body() body: CreateBookDto) {
    return {
      created: true,
      title: body.title,
    };
  }
  // PUT /books/:id --> {}        update a book by id
  @Put(':id')
  updateBook(@Param('id') id: string, @Body() body: CreateBookDto) {
    return {
      updated: true,
      id,
      title: body.title,
    };
  }
  // DELETE /books/:id --> {}     delete a book by id
  @Delete(':id')
  deleteBook() {
    return {};
  }
}

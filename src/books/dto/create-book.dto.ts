export class CreateBookDto {
  title: string;
  author?: string;
  publishedDate?: Date;
  isbn?: string;
  genre?: string;
  summary?: string;
}

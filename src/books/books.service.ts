import { Injectable } from '@nestjs/common';
import { title } from 'process';

@Injectable()
export class BooksService {
  private books = [
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publishedDate: new Date('1925-04-10'),
      isbn: '9780743273565',
      genre: 'Fiction',
      summary: 'A novel about the American dream and the roaring twenties.',
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      publishedDate: new Date('1960-07-11'),
      isbn: '9780061120084',
      genre: 'Fiction',
      summary: 'A novel about racial injustice in the Deep South.',
    },
    {
      title: '1984',
      author: 'George Orwell',
      publishedDate: new Date('1949-06-08'),
      isbn: '9780451524935',
      genre: 'Dystopian',
      summary:
        'A novel about a totalitarian regime that uses surveillance to control its citizens.',
    },
  ];

  getBooks(title?: string, author?: string, genre?: string) {
    return this.books.filter((book) => {
      return (
        (!title || book.title === title) &&
        (!author || book.author === author) &&
        (!genre || book.genre === genre)
      );
    });
  }
}

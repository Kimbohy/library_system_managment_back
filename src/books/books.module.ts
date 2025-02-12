import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {
  private users = [
    {
      id: 0,
      name: 'Kim',
      email: 'kim@gmail.com',
      hashedPassword: 'SKGKE23KDK3KGK55K3KF334KV',
      createdAt: new Date('2024-05-12'),
    },
  ];

  getUsers(id?: string, email?: string, name?: string, createdAt?: Date) {
    // todo: implement this function properly
    if (id) {
      return this.users.filter((user) => {});
    }
  }
}
 
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AtGuard } from './common/guards';
import { APP_GUARD } from '@nestjs/core';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { BooksService } from './books/books.service';
import { BooksModule } from './books/books.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, AdminModule, BooksModule],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    UsersService,
    BooksService,
  ],
})
export class AppModule {}

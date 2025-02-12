import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // for the PrismaService to be available globally
@Module({
  providers: [PrismaService],
  exports: [PrismaService], 
})
export class PrismaModule {}

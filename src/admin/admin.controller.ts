import { AdminService } from './admin.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateAdminDto } from './dto';

@Controller('admin')
export class AdminController {
  constructor(private AdminService: AdminService) {}

  @Post('/create')
  async createAdmin(@Body() dto: CreateAdminDto) {
    return this.AdminService.createAdmin(dto);
  }
}

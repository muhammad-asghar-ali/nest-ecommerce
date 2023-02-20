import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/shared/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() userDto: any) {
    return await this.userService.findByLogin(userDto);
  }

  @Post('register')
  async register(@Body() userDto: any) {
    return await this.userService.create(userDto);
  }
}

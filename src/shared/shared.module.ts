import { Module } from '@nestjs/common';
import { UserService } from './shared.service';

@Module({
  imports: [],
  controllers: [],
  providers: [UserService],
})
export class AppModule {}

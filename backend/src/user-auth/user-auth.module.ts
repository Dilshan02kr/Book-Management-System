import { Module } from '@nestjs/common';
import { UserAuthResolver } from './user-auth.resolver';
import { UserAuthService } from './user-auth.service';

@Module({
  providers: [UserAuthResolver, UserAuthService]
})
export class UserAuthModule {}

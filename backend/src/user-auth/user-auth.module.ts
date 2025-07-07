import { Module } from '@nestjs/common';
import { UserAuthResolver } from './user-auth.resolver';
import { UserAuthService } from './user-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [UserAuthResolver, UserAuthService, JwtStrategy],
  exports: [UserAuthService, JwtModule],
})
export class UserAuthModule {}

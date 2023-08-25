import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../Users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import * as process from 'process';
import { ConfigModule, ConfigService } from '@nestjs/config';

// const jwtFactory = {
//   imports: [ConfigModule],
//   useFactory: async (configService: ConfigService) => ({
//     secret: configService.get('JWT_SECRET'),
//     signOptions: {
//       expiresIn: configService.get('JWT_EXP_H'),
//     },
//   }),
//   inject: [ConfigService],
// };
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'JWT_SECRET',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [],
  exports: [AuthService],
})
export class AuthModule {}

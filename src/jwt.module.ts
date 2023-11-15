import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1m' }, // Change the expiration time to 30 minutes
    }),
  ],
  exports: [JwtModule],
})
export class JwtAuthModule {}
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenizationController } from './tokenization/tokenization.controller';
import { TokenizationService } from './tokenization/tokenization.service';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { JwtAuthModule } from './jwt.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60000,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    JwtAuthModule,
  ],
  controllers: [AppController, TokenizationController],
  providers: [AppService, TokenizationService],
})
export class AppModule {}

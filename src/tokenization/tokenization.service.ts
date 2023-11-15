// tokenization.service.ts
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';
import { CardData } from 'src/models';

@Injectable()
export class TokenizationService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly jwtService: JwtService,
  ) {}

  async tokenizeCard(cardData: CardData): Promise<string> {
    // Tokenization logic using JWT
    const token = this.jwtService.sign(cardData, { expiresIn: '1m' }); // Token expires in 1 minute

    // Store token in the cache, excluding cvv
    const { cvv, ...dataWithoutCvv } = cardData;
    await this.cacheManager.set(token, dataWithoutCvv);

    return token;
  }

  async getCardDataByToken(token: string): Promise<CardData> {
    try {
      // Verify the token
      const decodedToken = this.jwtService.verify(token);

      // Retrieve data from the cache based on the token
      const cachedDataWithoutCvv = await this.cacheManager.get<CardData>(token);

      if (!cachedDataWithoutCvv) {
        throw new Error('Token not found or has expired');
      }

      return cachedDataWithoutCvv;
    } catch (error) {
      // Handle token verification errors
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

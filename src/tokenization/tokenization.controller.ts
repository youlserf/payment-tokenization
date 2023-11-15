import { Controller, Post, Body, Get, Headers } from '@nestjs/common';
import { TokenizationService } from './tokenization.service';
import { CardData } from 'src/models';

@Controller('tokenization')
export class TokenizationController {
  constructor(private readonly tokenizationService: TokenizationService) {}

  @Post()
  async tokenizeCard(@Body() data: CardData): Promise<any> {
    try {
      const token = await this.tokenizationService.tokenizeCard(data);
      console.log('Tokenization Result:', token);
      return { success: true, message: 'Card tokenized successfully', token };
    } catch (error) {
      console.error('Tokenization Error:', error);
      return { success: false, message: 'Failed to tokenize card' };
    }
  }

  @Get()
  async getCardData(@Headers('authorization') authorization: string): Promise<any> {
    try {
      // Extract the token from the Authorization header
      const token = authorization.replace('Bearer ', '');

      const cardData = await this.tokenizationService.getCardDataByToken(token);
      console.log('Retrieved Card Data:', cardData);
      return { success: true, cardData };
    } catch (error) {
      console.error('Token Retrieval Error:', error.message);
      return { success: false, message: 'Failed to retrieve card data' };
    }
  }
}





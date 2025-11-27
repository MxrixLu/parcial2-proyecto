import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ApitokenService } from '../apitoken/apitoken.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly apitokenService: ApitokenService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'] as string;

    if (!apiKey) {
      throw new UnauthorizedException(
        'API Key is required. Please provide it in the x-api-key header',
      );
    }

    return this.validateApiKey(apiKey);
  }

  private async validateApiKey(apiKey: string): Promise<boolean> {
    await this.apitokenService.validateAndReduceApiKey(apiKey);
    return true;
  }
}

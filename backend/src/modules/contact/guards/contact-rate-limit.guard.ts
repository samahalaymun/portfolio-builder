import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

@Injectable()
export class ContactRateLimitGuard implements CanActivate {
  private readonly rateLimitMap = new Map<string, RateLimitEntry>();
  private readonly MAX_REQUESTS = 3; // Max 3 submissions
  private readonly WINDOW_MS = 60 * 60 * 1000; // Per 1 hour

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const identifier = this.getIdentifier(request);

    const now = Date.now();
    const entry = this.rateLimitMap.get(identifier);

    if (!entry || now > entry.resetTime) {
      // First request or window expired
      this.rateLimitMap.set(identifier, {
        count: 1,
        resetTime: now + this.WINDOW_MS,
      });
      return true;
    }

    if (entry.count >= this.MAX_REQUESTS) {
      const timeLeft = Math.ceil((entry.resetTime - now) / 1000 / 60);
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          message: `Too many contact form submissions. Please try again in ${timeLeft} minutes.`,
          error: 'Too Many Requests',
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    entry.count++;
    return true;
  }

  private getIdentifier(request: Request): string {
    // Use IP address as identifier
    const ip =
      request.ip ||
      request.headers['x-forwarded-for'] ||
      request.headers['x-real-ip'] ||
      request.socket.remoteAddress;

    return `contact_rate_limit:${ip}`;
  }

  // Optional: Cleanup old entries periodically
  cleanupOldEntries(): void {
    const now = Date.now();
    for (const [key, entry] of this.rateLimitMap.entries()) {
      if (now > entry.resetTime) {
        this.rateLimitMap.delete(key);
      }
    }
  }
}

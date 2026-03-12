import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 1. Le decimos que busque el token en el Header "Authorization" como un "Bearer Token"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'MI_PALABRA_SECRETA_SUPER_SEGURA', // Debe ser la misma del AuthModule
    });
  }

  async validate(payload: any) {
    // Lo que devuelvas aquí se guardará en "request.user"
    return { userId: payload.sub, username: payload.username };
  }
}
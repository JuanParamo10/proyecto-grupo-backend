import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalponService } from './galpon.service';
import { GalponController } from './galpon.controller';
import { Galpon } from './entities/galpon.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Galpon])
  ],
  controllers: [GalponController],
  providers: [GalponService],
})
export class GalponModule {}

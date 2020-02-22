import { Module } from '@nestjs/common';
import { OwnerGateway } from './owner/owner.gateway';
import { LocationGateway } from './location/location.gateway';

@Module({
  imports: [],
  providers: [OwnerGateway, LocationGateway],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { MarketModule } from './market/market.module';

@Module({
  imports: [UserModule, ProductModule, MarketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

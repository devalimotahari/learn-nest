import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { ReportModule } from './reports/report.module';
import { DBModule } from './_config/DBModule';

@Module({
  imports: [DBModule, UserModule, ReportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

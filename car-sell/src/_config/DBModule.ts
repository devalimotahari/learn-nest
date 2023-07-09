import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Report } from '../reports/report.entity';

export const DBModule = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [User, Report],
  synchronize: true,
});

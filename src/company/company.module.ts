import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { DatabaseModule } from 'src/common';
import { CompanySchema } from './model/company.schema';
import { CompanyRepository } from './company.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: "Company", schema: CompanySchema }])
  ],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository],
  exports: [CompanyService]
})
export class CompanyModule { }

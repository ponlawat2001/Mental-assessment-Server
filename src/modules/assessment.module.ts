import { Module } from '@nestjs/common';
import AssessmentController from '@controller/assessment.controller';
import AssessmentService from '@provider/assessment.service';

@Module({
  controllers: [AssessmentController],
  providers: [AssessmentService],
})
export class AssessmentModule {}

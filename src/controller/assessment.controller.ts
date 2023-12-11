import { Assessment } from '@interface/assessment.interface';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import AssessmentService from '@provider/assessment.service';

@Controller('assessment')
class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Get('findAll')
  async findAll(): Promise<any> {
    return this.assessmentService.findAll();
  }

  @Get('findOne/:id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.assessmentService.findOne(id);
  }

  @Post('create')
  async create(@Body() body: Assessment): Promise<any> {
    return this.assessmentService.create(body);
  }

  @Put('update/:id')
  async update(
    @Body() body: Assessment,
    @Param('id') id: string,
  ): Promise<any> {
    return this.assessmentService.update(body, id);
  }

  @Put('delete/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.assessmentService.delete(id);
  }
}
export default AssessmentController;

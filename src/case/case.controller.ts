import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CaseService } from './case.service';
import { CreateCaseDto } from './dto/create-case.dto';

@Controller('case')
export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  findAllByUserId(@Req() req) {
    return this.caseService.findAllByUserId(req.user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('/all')
  findAll() {
    return this.caseService.findAll();
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  findOneByUserId(@Param('id') id: number, @Req() req) {
    return this.caseService.findOneByUserId(id, req.user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @Post()
  create(@Body() createCaseDto: CreateCaseDto, @Req() req) {
    createCaseDto.user = req.user.id;
    return this.caseService.create(createCaseDto);
  }

  // @UseGuards(AuthenticatedGuard)
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCaseDto: UpdateCaseDto, @Req() req) {
  //   updateCaseDto.user = req.user.id;
  //   return this.caseService.update(+id, updateCaseDto);
  // }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caseService.remove(+id);
  }
}

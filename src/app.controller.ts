import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { FeriadosService } from './services/feriados.service';
import { Feriado } from './models/feriado';

@Controller()
export class AppController {
  constructor(private readonly feriadoService: FeriadosService) {}

  @Get('/feriados')
  getHello(): Promise<Feriado[]> {
    return this.feriadoService.getFeriados();
  }
}

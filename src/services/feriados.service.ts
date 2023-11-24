import { Injectable } from '@nestjs/common';
import { Feriado } from 'src/models/feriado';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FeriadosService {
  constructor(private readonly configService:ConfigService) {}
  async getFeriados(): Promise<Feriado[]> {
    const url: string = this.configService.get<string>('ENDPOINT_FERIADOS');
    const res = await axios.get(url);
    const data = res.data;
    return data.map((p) => ({
      nombre: p.nombre,
      fecha: p.fecha,
      irrenunciable: p.irrenunciable == '1' ? 'Si' : 'No',
    }));
  }

  async getFeriadosIrrenunciables(): Promise<Feriado[]> {
    const data: Feriado[] = await this.getFeriados();
    return data.filter((p) => p.irrenunciable == 'Si');
  }
}

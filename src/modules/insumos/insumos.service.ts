import { Injectable, InternalServerErrorException, BadRequestException, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateInsumoDto } from './dto/update-insumo.dto'; 
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { Insumo } from './entities/insumo.entity';

@Injectable()
export class InsumosService {
  constructor(
    @InjectRepository(Insumo)
    private readonly insumoRepository: Repository<Insumo>,
  ) {}

  async create(createInsumoDto: CreateInsumoDto) {
    try {
      const insumo = this.insumoRepository.create(createInsumoDto);
      await this.insumoRepository.save(insumo);
      return insumo;
    } catch (error) {
      if (error.code === '23505') 
        throw new BadRequestException('Ese insumo ya existe en la base de datos');
      
      throw new InternalServerErrorException('Error al crear el insumo, revisa los logs');
    }
  }

  async findAll() {
    return await this.insumoRepository.find();
  }

  async findOne(id: string) {
    const insumo = await this.insumoRepository.findOneBy({ id });
    if (!insumo) throw new NotFoundException(`Insumo con id ${id} no encontrado`);
    return insumo;
  }
  async update(id: string, updateInsumoDto: UpdateInsumoDto) {
    const insumo = await this.insumoRepository.preload({
      id: id,
      ...updateInsumoDto,
    });

    if (!insumo) throw new NotFoundException(`Insumo con id ${id} no encontrado`);

    try {
      return await this.insumoRepository.save(insumo);
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar el insumo');
    }
  }
async remove(id: string) {
    const insumo = await this.findOne(id);
    await this.insumoRepository.remove(insumo);
    return { message: 'Insumo eliminado correctamente' };
  }

  async findProducts() {
  return await this.insumoRepository.find({
    where: { tipo: 'PRODUCTO' },
    order: { nombre: 'ASC' } 
  });
}

    async getTotalHuevos() {
  const productos = await this.insumoRepository.find({
    where: { tipo: 'PRODUCTO' }
  });

  const huevos = productos.filter(p => p.nombre.toLowerCase().includes('huevo'));
  const totalPanales = huevos.reduce((acc, huevo) => acc + huevo.stock, 0);

  return {
    unidad: 'Unidad Yamboró - Pitalito',
    fechaConsulta: new Date().toLocaleDateString(),
    totalPanales,
    detalle: huevos.map(h => ({ categoria: h.nombre, cantidad: h.stock }))
  };
}
async getReporteDetallado() {
  const productos = await this.insumoRepository.find({
    where: { tipo: 'PRODUCTO' }
  });

  const reporte = productos.map(h => ({
    categoria: h.nombre,
    cantidad: h.stock,
    estado: h.stock < 10 ? 'CRÍTICO' : h.stock < 30 ? 'BAJO' : 'ESTABLE'
  }));

  const totalGeneral = productos.reduce((acc, h) => acc + h.stock, 0);

  return {
    planta: 'SENA - Unidad Yamboró',
    totalGeneral: totalGeneral,
    analisis: reporte,
    alerta: reporte.some(r => r.estado === 'CRÍTICO') ? '¡Atención! Hay productos agotándose' : 'Stock normal'
  };
}
}
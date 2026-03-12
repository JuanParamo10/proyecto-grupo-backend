import { Test, TestingModule } from '@nestjs/testing';
import { EstadoEmpleadoService } from './estado-empleado.service';

describe('EstadoEmpleadoService', () => {
  let service: EstadoEmpleadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadoEmpleadoService],
    }).compile();

    service = module.get<EstadoEmpleadoService>(EstadoEmpleadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

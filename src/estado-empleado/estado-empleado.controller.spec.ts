import { Test, TestingModule } from '@nestjs/testing';
import { EstadoEmpleadoController } from './estado-empleado.controller';
import { EstadoEmpleadoService } from './estado-empleado.service';

describe('EstadoEmpleadoController', () => {
  let controller: EstadoEmpleadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoEmpleadoController],
      providers: [EstadoEmpleadoService],
    }).compile();

    controller = module.get<EstadoEmpleadoController>(EstadoEmpleadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(() => {
    console.log('✅ Entidades cargadas por TypeORM:');
    AppDataSource.entityMetadatas.forEach(entity => {
      console.log(' -', entity.name);
    });
    process.exit(0); // salir después de mostrar
  })
  .catch(error => {
    console.error('❌ Error al inicializar DataSource:', error);
    process.exit(1);
  });
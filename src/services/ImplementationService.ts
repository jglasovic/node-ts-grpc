import { Server, ServiceDefinition } from 'grpc';

export interface ServiceImpl {
  service: ServiceDefinition<any>;
}

export class ImplementationService {
  public static addAll<T extends ServiceImpl>(server: Server, implementations: (new () => T)[]): Server {
    implementations.forEach((I) => {
      const instance = new I();
      server.addService(instance.service, instance);
    });
    return server;
  }
}

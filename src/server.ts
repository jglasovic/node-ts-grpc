import 'dotenv/config';
import { Server, ServerCredentials } from 'grpc';
import { GreeterServiceImpl } from './handlers/greeter';
import { ImplementationService } from './services/ImplementationService';

const implementations = [GreeterServiceImpl];

const port: string | number = process.env.PORT || 50051;
const host = `localhost:${port}`;

export const startServer = (): void => {
  let server: Server = new Server();

  ImplementationService.addAll(server, implementations);

  server.bindAsync(host, ServerCredentials.createInsecure(), (err: Error, port: number) => {
    if (err) {
      return console.error(err);
    }
    console.log(`gRPC listening on ${port}`);
  });

  server.start();
};

startServer();

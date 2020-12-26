import { ServerUnaryCall, sendUnaryData } from 'grpc';
import { ServiceImpl } from '../services/ImplementationService';
import { GreeterService, HelloRequest, HelloResponse, IGreeterServer } from '../__generated__';

export class GreeterServiceImpl implements IGreeterServer, ServiceImpl {
  public readonly service = GreeterService;
  public sayHello(call: ServerUnaryCall<HelloRequest>, callback: sendUnaryData<HelloResponse>): void {
    const res: HelloResponse = new HelloResponse();

    res.setMessage(`Hello, ${call.request.getName()}`);

    callback(null, res);
  }
}

import { credentials } from 'grpc';
import { GreeterClient, HelloRequest } from '../__generated__';

const client = new GreeterClient(`0.0.0.0:50051`, credentials.createInsecure());

const request = new HelloRequest();

request.setName('Jure');

client.sayHello(request, (err, res) => {
  if (err) {
    return console.error(err);
  }
  console.log(res.getMessage());
});

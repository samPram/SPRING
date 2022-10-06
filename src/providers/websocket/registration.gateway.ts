import { InternalServerErrorException, Logger } from '@nestjs/common';
import {
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'node_modules/socket.io/dist';

@WebSocketGateway()
export class RegistrationGateway implements OnGatewayInit, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // constructor() {}

  private logger: Logger = new Logger('RegistrationGateway');

  afterInit() {
    this.logger.log('Init websocket..');
  }

  async handleConnection(server) {
    // await this.registrationService.getUserFromSocket(socket);
  }

  handleDisconnect(server) {
    // this.logger.log(`Client disconnected: ${socket.id}`);
  }

  async emitData(data: any) {
    try {
      await this.server?.emit('sensor_devices', data);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  // @SubscribeMessage('request_remaining')
  // async requestRemaining(
  //   @ConnectedSocket() socket: Socket,
  //   @MessageBody('id_contest') id_contest: string,
  // ) {
  // console.log(socket);
  // await this.registrationService.getUserFromSocket(socket);
  // const remaining = await this.registrationService.getRemainingById(
  //   id_contest,
  // );
  // console.log(remaining);
  // socket.emit('receive_remaining', remaining);
  // }
}

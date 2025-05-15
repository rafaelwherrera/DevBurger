import { Server } from 'socket.io';

let io;

export const setupSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });
};

export const emitNewOrder = (orderData) => {
  if (io) {
    io.emit('newOrder', orderData);
  }
};

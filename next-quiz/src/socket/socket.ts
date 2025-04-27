import {io} from 'socket.io-client';

export const socket = io(
    `http://${process.env.NEXT_PUBLIC_WS_HOST}:${process.env.NEXT_PUBLIC_WS_PORT}`,
    { autoConnect: false }
);

socket.on('connect', () => {
    console.log(`Socket connected with id: ${ socket.id }`);
})

socket.on('connect_error', error => {
    console.log(`Socket connection error: ${error}`);
})
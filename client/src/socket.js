import { io } from "socket.io-client";


export let socket;

export const init = (store) => {
    if (!socket) {
        //only establish a socket connection once
        socket = io.connect();

        

        
    }

    return socket;
};

import { Client } from "@stomp/stompjs";

export const stompClient = new Client({
    brokerURL: "ws://localhost:8080/ws",

    reconnectDelay: 5000,

    debug: message => {
        console.log("[STOMP]", message);
    },
});
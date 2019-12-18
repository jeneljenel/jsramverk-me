import socketIOClient from "socket.io-client";
import {useEffect, useRef, useState } from "react";

const PORT = 8000;
const socket = socketIOClient(`http://localhost:${PORT}`);


/** The hook */
/* eslint-disable */
const useChat = () => {
    const [messages, setMessages] = useState([]);

    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socket;

        socketRef.current.on("chatMessage", ({ message }) => {
            console.log("här är chatMessage", message);
            setMessages(messages => [...messages, message]);
        })

        return () => {
            socketRef.current.disconnect();

        }
    }, []);

    const sendMessage = ({ message }) => {
        socketRef.current.emit("chatMessage", { message })
    }
    return { messages, sendMessage };

}
export default useChat;



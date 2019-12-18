import React, { Component } from 'react';
import socketIOClient from "socket.io-client";

/** material-ui */
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import "../../style/Chat.css";

const PORT = 8000;

/**
 * Render all your chat components in "chat"
 */
class Chat extends Component {
    constructor(props) {
        super(props);

        this.initalState = {
            username: "",
            avatar: "",
            message: "",
            messages: [],
            active: false,
            date: ""
        }

        this.state = this.initalState;
        this.ref = React.createRef();

        // this.socket = socketIOClient(`http://localhost:${PORT}`); // on local
        this.socket = socketIOClient('socket-server.jeneljenel.me');

        this.socket.on('RECEIVE_MESSAGE', function(data) {
            addMessage(data);
        })

        this.socket.on('ENTER_CHAT', function(data) {
            addMessage(data);
        })

        this.socket.on('EXIT_CHAT', function(data){
            addMessage(data);
        })

        const addMessage = (data) => {
            this.setState({
                messages: [...this.state.messages, data]
            });
            this.scrollToBottom();
        }

        this.getDate = () => {
            const now = new Date();
            const months = ["Jan", "Feb", "Mars", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
            const month = months[now.getMonth()];
            const date = "".concat(now.getDate(), ' ', month , ' ', now.getFullYear(), ' kl: ', now.getHours(), ':', now.getMinutes(), ':', now.getSeconds());
            this.setState({
                date: date
            });
        }

        this.getAvatar = () => {
            function getRandomInt() {
                let min = Math.ceil(0);
                let max = Math.floor(200);
                return Math.floor(Math.random() * (max - min)) + min; 
            }
            let id = getRandomInt();
            const url = `https://picsum.photos/id/${id}/100/100`;
            this.setState({
                avatar: url
            });
        }

        this.sendMessage = ev => {
            ev.preventDefault();
            this.getDate();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username.concat(" | ", this.state.date),
                avatar: this.state.avatar,
                message: this.state.message
            });
            this.setState({ message: "" });
        }

        this.joinChat = () => {
            this.getDate();
            this.getAvatar();
            this.setState({ active: true });

            this.socket.emit('JOIN_CHAT', {
                author: this.state.username,
                avatar: this.state.avatar,
                message: "Just entered the chat! Say hello!"
            });
        }

        this.leaveChat = () => {
            this.getDate();
            this.getAvatar();

            this.socket.emit('LEAVE_CHAT', {
                author: this.state.username.concat(" | ", this.state.date),
                avatar: this.state.avatar,
                message: "Left the chat"
            });

            this.setState(this.initalState);
        }


    }
    scrollToBottom = () => {
        if (this.ref.current) {
            this.ref.current.scrollTop = this.ref.current.scrollHeight;
        }
    };
    onChange(ev) {
        this.setState({ [ ev.target.id] : ev.target.value })
    }

    render() {
        const isActive = this.state.active;
        let chat;

        if (isActive) {
            chat =
            <>
            <div className="messages" ref={this.ref}>
                <List>
                    {this.state.messages.flatMap((message, index) => [
                        <ListItem alignItems="flex-start" key={index}>
                            <ListItemAvatar>
                                <Avatar
                                    alt="Random pic from picsum"
                                    src={message.avatar} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={message.author}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="textPrimary"
                                        />
                                        {message.message}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>,
                        <Divider key={"divider-" + index} />
                    ])}
                </List>

            </div>
            <div className="messageBox">

                <TextField
                    fullWidth
                    label="Your message"
                    id="message"
                    margin="normal"
                    onChange={ev => this.onChange(ev)}
                    onKeyDown={ev => {
                        if (ev.key === "Enter") {
                            ev.preventDefault();
                            this.sendMessage(ev);
                        }
                    }}
                    variant="outlined"
                    value={this.state.message}
                />
                <span>
                <Button className="primaryButton" onClick={this.sendMessage} variant="contained">SEND</Button>
                
                <Button className="secondaryButton" onClick={this.leaveChat} variant="contained">LEAVE</Button>
                </span>
            </div>
            <br />
            <br />
            </>
        } else {
            chat = <>
                <p>Enter a nickname to join the chatroom!</p>
                <TextField
                    fullWidth
                    label="Your nickname"
                    id="username"
                    margin="normal"
                    onChange={ev => this.onChange(ev)}
                    onKeyDown={ev => {
                        if (ev.key === "Enter") {
                            ev.preventDefault();
                            this.joinChat();
                        }
                    }}
                    variant="outlined"
                    value={this.state.username}
                />
                <Button onClick={this.joinChat} variant="contained">JOIN</Button>
                <p />
            </>
        }

        return (
        <div className="container">
            <h1>CHAT</h1>
            {chat}

        </div>
        )

    }
}
export default Chat

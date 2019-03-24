import * as React from "react";
import { connect } from "react-redux";
import { State } from "src/Store";
import styled from "styled-components";

import alec from "src/Images/me_orchestra.jpg";
import { Message, YouMessage } from "src/Sockets/Api";
import * as API  from "src/Sockets/Api";
import { User } from "src/Store/reducer";

const MessageArea = styled("div")`
    display: flex;
    flex: 1;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;

    background-color: gray;
`;

const Message = styled("div")`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    min-height: 32px;

    border: 1px 1px 1px 1px black solid;
`;

const Input = styled("input")`
    width: 100%;
`;

const Image = styled("img")`
    display: flex;
    align-self: center;
    justify-self: center;
`;

interface ConnectProps {
    me: User;
    activeUsers: User[];
    messages: Message[];
    dispatch: any;
}

let key = 0;

type Props = ConnectProps;

class ScreenMessage extends React.PureComponent<Props> {

    nameInput: HTMLInputElement | null;
    ref: HTMLInputElement | null;

    componentDidUpdate() {
        if (this.ref) {
            this.ref.focus();
        }
    }

    submitName = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!this.nameInput || e.key !== "Enter") {
            return;
        }

        const name = this.nameInput.value;
        if (name.length) {
            const user: User = {
                name: name
            };

            const message: YouMessage = {
                type: "you",
                payload: user,
            };
            await API.sendYouMessage(message);
        }
    }

    handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && this.ref && this.ref.value.length > 0) {
            const message = this.ref.value;
            this.ref.value = "";

            const signon: Message = {
                type: "message",
                user: {
                    name: name
                },
                payload: message
            }
            await API.sendChatMessage(signon);
        }
    }

    renderMessage = (message: Message) => {
        if (message.type !== "message") {
            return;
        }
        if (!message.user) {
            return <span>{message.payload}</span>
        }
        return (
            <span>{message.user.name}: {message.payload}</span>
        )
    }

    render() {
        const { me, messages, activeUsers } = this.props;
        
        if (!me.id || !me.name) {
            return (
                <>
                    <span>Enter your name</span>
                    <Input type="text" innerRef={ref => this.nameInput = ref} onKeyDown={this.submitName} />
                </>
            );
        }

        return (
            <>
                <span>Your name is: {me.name}</span>
                <div style={{ display: "flex" }}>
                    <MessageArea>
                        {messages.map(m => (
                            <Message key={key++}>{this.renderMessage(m)}</Message>
                        ))}
                    </MessageArea>
                        <div style={{ display: "flex", flexDirection: "column", minWidth: "64px" }}>
                            These bad boys have been on so far
                            {activeUsers.map(user => <span key={key++}>{user.name}</span>)}
                        </div>
                    </div>
                <Input type="text" innerRef={ref => this.ref = ref} onKeyDown={this.handleKeyDown} />
                <h1>Send this picture to all your single friends!!!!!</h1>
                <div style={{ display: "flex" }}>
                    <Image src={alec} />
                </div>
            </>
        );
    }
}

export default connect((state: State) => ({ me: state.messages.me, activeUsers: state.messages.activeUsers, messages: state.messages.messages}))(ScreenMessage);
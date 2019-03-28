import * as React from "react";
import { connect } from "react-redux";
import { State } from "src/Store";
import styled from "styled-components";

import alec from "src/Images/me_orchestra.jpg";
import { Message, LoginMessage } from "src/Sockets/Api";
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

class ScreenMessage extends React.PureComponent<Props, { showMe: boolean; }> {
    state = {
        showMe: false
    };
    nameInput: HTMLInputElement | null;
    ref: HTMLInputElement | null;

    componentWillMount() {
        const { me } = this.props;
        if (me) {
            const loginMessage: LoginMessage = {
                type: "login",
                payload: me
            };
            API.sendLoginMessage(loginMessage);
        }
    }

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

            const message: LoginMessage = {
                type: "login",
                payload: user,
            };
            API.sendLoginMessage(message);
        }
    }

    handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { me } = this.props;
        if (e.key === "Enter" && this.ref && this.ref.value.length > 0) {
            const message = this.ref.value;
            this.ref.value = "";

            const signon: Message = {
                type: "message",
                user: me,
                payload: message
            }

            API.sendChatMessage(signon);
        }
    }

    renderMessage = (message: Message) => {
        if (message.type !== "message") {
            return;
        }
        // console.log(message);
        if (!message.user) {
            return <span>{message.payload}</span>
        }

        return (
            <span>{message.user.name}: {message.payload}</span>
        );
    }

    render() {
        const { me, messages, activeUsers } = this.props;
        const { showMe } = this.state;

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
                <button onClick={() => { localStorage.clear(); location.reload(); }}>Clear localStorage</button>
                <span>Your name is: {me.name}</span>
                <div style={{ display: "flex" }}>
                    <MessageArea>
                        {messages.map(m => (
                            <Message key={key++}>{this.renderMessage(m)}</Message>
                        ))}
                    </MessageArea>
                        <div style={{ display: "flex", flexDirection: "column", minWidth: "64px" }}>
                            These bad boys are on currently
                            {activeUsers.map(user => <span key={key++}>{user.name}</span>)}
                        </div>
                    </div>
                <Input type="text" innerRef={ref => this.ref = ref} onKeyDown={this.handleKeyDown} />
                {showMe && (
                    <>
                    <h1>Send this picture to all your single friends!!!!!</h1>
                    <div style={{ display: "flex" }}>
                        <Image src={alec} />
                    </div>
                    </>
                )}
            </>
        );
    }
}

export default connect((state: State) => ({ me: state.messages.me, activeUsers: state.messages.activeUsers, messages: state.messages.messages}))(ScreenMessage);
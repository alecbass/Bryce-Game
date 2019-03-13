import * as React from "react";
import { connect } from "react-redux";
import { State } from "src/Store";
import styled from "styled-components";
import * as actions from "src/Store/actions";

import socket from "src/Sockets/Socket";

const MessageArea = styled("div")`
    display: flex;
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

interface ConnectProps {
    messages: string[];
    dispatch: any;
}

interface ScreenMessageState {
    handle: (e?: any) => void;
}

let key = 0;

type Props = ConnectProps;

class ScreenMessage extends React.PureComponent<Props, ScreenMessageState> {

    ref: HTMLInputElement | null;

    componentWillMount() {
        this.setState({ handle: socket.handleMessage });
    }

    handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { dispatch } = this.props;

        if (e.key === "Enter" && this.ref && this.ref.value.length > 0) {
            const message = this.ref.value;
            this.ref.value = "";

            dispatch(actions.sendMessage(message));
        }
    }

    thing = (e) => {
        console.log("Eeeeeeeeeeeeeeeee");
    }

    render() {
        const { messages } = this.props;

        return (
            <>
                <MessageArea>
                    {messages.map(m => (
                        <Message key={key++}>{m}</Message>
                    ))}
                </MessageArea>
                <Input type="text" innerRef={ref => this.ref = ref} onKeyDown={this.handleKeyDown} />
            </>
        );
    }
}

export default connect((state: State) => ({messages: state.messages.messages}))(ScreenMessage);
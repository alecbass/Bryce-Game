import * as React from "react";
import "../index.css";
import styled from "styled-components";
import { Header } from "src/Components";
import BattleScreen from "./Battle/Battle";
import { Switch, Route, Link } from "react-router-dom";
import CharacterCreation from "./Creation/CharacterCreation";
import CharacterSelectionScreen from "./CharacterSelection/CharacterSelection";
import ScreenCinema from "./Cinema/Cinema";
import ScreenMessages from "./Messaging/Message";
import { connect } from "react-redux";
import { State } from "src/Store";
import { User } from "src/Store/reducer";
import Socket from "src/Sockets/Socket";

const Container = styled("div")`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    overflow: scroll;
`;

const Main = styled("div")`
    flex: 1;
    background-color: lightgreen;

    padding: 4% 8% 4% 8%;
`;

interface Props {
    me: User;
}

class Page extends React.Component<Props> {

    render() {

        return (
            <Container>
                <Header title="Battle of Bryce" />
                <Main>
                    <Switch>
                        <Route path="/" exact={true} component={ScreenMessages} />
                        <Route path="/battle" exact={true} component={BattleScreen} />
                        <Route path="/create" exact={true} component={CharacterCreation} />
                        <Route path="/select" exact={true} component={CharacterSelectionScreen} />
                        <Route path="/cinema" exact={true} component={ScreenCinema} />
                        <Route path="/messages" exact={true} component={ScreenMessages} />
                        <Link to="/battle">To battle</Link>
                        <Link to="/create">To create</Link>
                        <Link to="/select">To select</Link>
                        <Link to="/cinema">To cinema</Link>
                        <Link to="/messages">To messages</Link>
                    </Switch>
                </Main>
            </Container>
        );
    }
}

export default connect((state: State) => ({ me: state.messages.me }))(Page);
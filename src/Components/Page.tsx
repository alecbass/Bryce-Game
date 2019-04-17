import * as React from "react";
import "../index.css";
import styled from "@emotion/styled";
import { Header } from "Components";
import BattleScreen from "Components/BattleOld/Battle";
import { Switch, Route, Link } from "react-router-dom";
import CharacterCreation from "Components/Creation/CharacterCreation";
import CharacterSelectionScreen from "Components/CharacterSelection/CharacterSelection";
import ScreenCinema from "./Cinema/Cinema";
import ScreenMessages from "./Messaging/Message";
import ScreenMap from "Components//Map/Map";
import { connect } from "react-redux";
import { State } from "Store";
import { User } from "Store/reducer";

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

    display: flex;
    flex-direction: column;
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
                        <Route path="/map" exact={true} component={ScreenMap} />
                        <Link to="/battle">To battle</Link>
                        <Link to="/create">To create</Link>
                        <Link to="/select">To select</Link>
                        <Link to="/cinema">To cinema</Link>
                        <Link to="/messages">To messages</Link>
                        <Link to="/map">To map</Link>
                    </Switch>
                </Main>
            </Container>
        );
    }
}

export default connect((state: State) => ({ me: state.messages.me }))(Page);
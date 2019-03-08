import * as React from "react";
import "../index.css";
import styled from "styled-components";
import { Header } from "src/Components";
import BattleScreen from "./Battle/Battle";
import { Switch, Route, Link } from "react-router-dom";
import CharacterCreation from "./Creation/CharacterCreation";
import CharacterSelectionScreen from "./CharacterSelection/CharacterSelection";
import ScreenCinema from "./Cinema/Cinema";

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

class Page extends React.Component {

    render() {

        return (
            <Container>
                <Header title="Battle of Bryce" />
                <Main>
                    <Switch>
                        <Route path="/" exact={true} component={ScreenCinema} />
                        <Route path="/battle" exact={true} component={BattleScreen} />
                        <Route path="/create" exact={true} component={CharacterCreation} />
                        <Route path="/select" exact={true} component={CharacterSelectionScreen} />
                        <Route path="/cinema" exact={true} component={ScreenCinema} />
                        <Link to="/battle">To battle</Link>
                        <Link to="/create">To create</Link>
                        <Link to="/select">To select</Link>
                        <Link to="/cinema">To cinema</Link>
                    </Switch>
                </Main>
            </Container>
        );
    }
}

export default Page;
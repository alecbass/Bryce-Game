import * as React from "react";
import { connect } from "react-redux";
import { State } from "src/Store";
import { Fighter } from "src/Interfaces/Fighter";
import { GameState } from "src/Store/reducer";
import CharacterIcon from "./CharacterIcon";
import styled from "styled-components";
import avatar from "src/Images/avatar.png";
import { Button } from "reactstrap";
import * as actions from "src/Store/actions";

const Container = styled("div")`
    display: flex;
    flex-direction: row;
    flex: 1;

    align-items: flex-start;
    justify-content: space-between;
    
    height: 100%;
    width: 100%;
`;

const Icons = styled("div")`
    display: flex;
    max-width: 72%;
    flex-wrap: wrap;
`;

const Preview = styled("div")`
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    justify-self: flex-end;
    min-width: 502px;

    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }
`;

const Image = styled("img")`
    height: 502px;
    width: 502px;
`;

interface ConnectProps {
    game: GameState;
    dispatch?: any;
    history?: any;
}

interface SelectionState {
    currentPreview?: Fighter;
    clicked: boolean;
}

class CharacterSelectionScreen extends React.PureComponent<ConnectProps, SelectionState> {
    state: SelectionState = {
        clicked: false
    };

    handleHover = (e: React.MouseEvent<HTMLDivElement>, fighter: Fighter) => {
        e.stopPropagation();
        const { clicked } = this.state;
        if (!clicked) {
            this.setState({ currentPreview: fighter });
        }
    }

    handleUnhover = () => {
        const { clicked } = this.state;
        if (!clicked) {
            this.setState({ currentPreview: undefined});
        }
    }

    handleClick = (e: React.MouseEvent<HTMLDivElement>, fighter: Fighter) => {
        e.stopPropagation();
        this.setState({ currentPreview: fighter, clicked: true });
    }

    handleBeginBattle = () => {
        const { history, dispatch } = this.props;
        const { currentPreview, clicked } = this.state;
        if (!currentPreview || !clicked) {
            return;
        }
        this.setFighter(currentPreview);
        history.push("/battle");
    }

    setFighter = (fighter: Fighter) => {
        const { dispatch } = this.props;
        dispatch(actions.changeFighter(fighter));
    }

    renderPreview = (fighter?: Fighter) => {
        return (
            <Preview>
                { fighter ? 
                    <>
                        {fighter.image && <Image src={fighter.image} />}
                        <div style={{height: "128px", width: "100%"}}>
                            <h2>{fighter.name}</h2>
                            <h3>Health: {fighter.maxHealth}</h3>
                            <h3>Strength: {fighter.strength}</h3>
                        </div>
                    </>
                    :
                    <>
                        <Image src={avatar} />
                        <div style={{height: "128px", width: "100%"}}>
                            <h3>No fighter</h3>
                        </div>
                    </>
                }
            </Preview>
        );
    }

    render() {
        const { fighters } = this.props.game;
        const { currentPreview, clicked } = this.state;

        return (
            <Container onClick={e => this.setState({currentPreview: undefined, clicked: false})}>
                <Icons>
                {fighters.map(f => (
                    <CharacterIcon key={f.id} fighter={f} handleHover={this.handleHover} handleUnhover={this.handleUnhover} handleClick={this.handleClick} />
                ))}
                </Icons>
                {this.renderPreview(currentPreview)}
                <Button color={currentPreview && clicked ? "success" : "danger"} onClick={this.handleBeginBattle}>BEGIN</Button>
            </Container>
        );
    }
}

export default connect((state: State) => ({game: state.gameState}))(CharacterSelectionScreen);
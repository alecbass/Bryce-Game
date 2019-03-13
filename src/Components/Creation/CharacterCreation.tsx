import * as React from "react";
import { Game } from "src/Store/reducer";
import { connect } from "react-redux";
import { State } from "src/Store";
import * as actions from "src/Store/actions";
import { Fighter } from "src/Interfaces/Fighter";


interface ConnectProps {
    game: Game;
    dispatch?: any;
}

class CharacterCreationScreen extends React.PureComponent<ConnectProps> {
    nameInput: HTMLInputElement | null;

    makeCharacter = (e: any) => {
        const { dispatch, game } = this.props;
        if (!dispatch || !this.nameInput) {
            return;
        }
        const newFighter = new Fighter(game.fighters.length, this.nameInput.value, 20, 20, 4);
        dispatch(actions.addFighter(newFighter));
    }

    render() {
        const { fighters } = this.props.game;

        return (
            <div>
                <input name="name" ref={ref => this.nameInput = ref} />
                <button onClick={this.makeCharacter}>Submit</button>
                {fighters.map(f => 
                    <p>{f.name}</p>
                )}
            </div>

        );
    }
}

export default connect((state: State) => ({game: state.Game}))(CharacterCreationScreen);
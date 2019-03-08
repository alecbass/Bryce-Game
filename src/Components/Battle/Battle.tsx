import * as React from "react";
import styled from "styled-components";
import BattleLog from "./BattleLog";
import BattleDisplay from "./BattleDisplay";

import { Fighter } from "src/Interfaces/Fighter";
import { connect } from "react-redux";
import { GameState } from "src/Store/reducer";
import * as actions from "src/Store/actions";
import { State } from "src/Store";
import { Ability } from "src/Interfaces/Ability";
import { Item } from "src/Interfaces/Item";
import Ratboy from "src/Images/ratboy.jpg";
import { FighterContainer } from ".";

const Screen = styled("div")`
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: black;
`;

const Container = styled("div")`
    flex: 1;
    height: 100%;
    width: 100%;
    background-image: url(${Ratboy});

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    background-color: white;
`;

interface ConnectProps {
    game: GameState;
    dispatch?: any;
    history?: any;
};

type Props = ConnectProps;

interface BattleState {
    yourFighter: Fighter;
    enemyFighter: Fighter;
}

class BattleScreen extends React.PureComponent<Props, BattleState> {

    enemyIndex: number = 0;
    componentDidMount() {
        const { game, history } = this.props;
        const { fighters, yourFighterIndex } = game;
        const yourFighter = fighters.find(f => f.id === yourFighterIndex);

        if (!yourFighter) {
            history.push("/select");
            return;
        }
        while (this.enemyIndex === yourFighterIndex) {
            this.enemyIndex = this.randomEnemy(fighters);
        }
        const enemyFighter = fighters[this.enemyIndex];
        this.setState({yourFighter: yourFighter, enemyFighter: enemyFighter});
    }

    componentWillReceiveProps(newProps: Props) {
        if (!this.state) {
            return;
        }
        const { yourFighter, enemyFighter } = this.state;
        const { fighters } = newProps.game;

        const newYourFighter = fighters.find(f => f.id === yourFighter.id);
        const newEnemyFighter = fighters.find(f => f.id === enemyFighter.id);
        if (newYourFighter && newEnemyFighter) {
            this.setState({yourFighter: newYourFighter, enemyFighter: newEnemyFighter});
        }
    }

    attack = (attacker: Fighter, defender: Fighter, ability: Ability) => {
        const { dispatch } = this.props;
        dispatch(actions.attackFighter(attacker, defender, ability));
    }

    useItem = (user: Fighter, item: Item) => {
        const { dispatch } = this.props;
        dispatch(actions.useItem(user, item));
    }

    randomEnemy(enemies: Fighter[]) {
        return Math.floor(Math.random() * ((enemies.length - 1) - 1)) + 1;
    }

    render() {
        const { fighters } = this.props.game;

        if (!this.state || !this.state.yourFighter || !this.state.enemyFighter) {
            return <Screen>
                <a href="/select">SELECT</a>
                Players are loading
            </Screen>;
        }

        const { yourFighter, enemyFighter } = this.state;
        return (
            <Screen>
                <a href="/select">SELECT</a>
                <BattleDisplay yourFighter={yourFighter} enemyFighter={enemyFighter} attack={this.attack} useItem={this.useItem}>
                    <FighterContainer you={true} fighter={yourFighter} startAttack={this.attack} startUseItem={this.useItem} />
                    <FighterContainer you={false} fighter={enemyFighter} startAttack={this.attack} startUseItem={this.useItem} />
                </BattleDisplay>
                <BattleLog fighters={fighters} />
            </Screen>
        );
    }
}

export default connect((state: State) => ({game: state.gameState}))(BattleScreen);
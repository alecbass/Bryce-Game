import * as React from "react";
import styled from "styled-components";
import FighterContainer from "./FighterContainer";

// import Bryce from "src/Images/bryce.jpg";
// import Joe from "src/Images/joe.jpg";
import Ratboy from "src/Images/ratboy.jpg";
import { Fighter } from "src/Interfaces/Fighter";
import { Ability } from "src/Interfaces/Ability";
import { Item } from "src/Interfaces/Item";

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

interface Props {
    yourFighter: Fighter;
    enemyFighter: Fighter;
    attack: (attacker: Fighter, defender: Fighter, ability: Ability) => void;
    useItem: (user: Fighter, item: Item) => void;
}

class BattleDisplay extends React.PureComponent<Props> {
    startAttack = (attacker: Fighter, ability: Ability) => {
        const { yourFighter, enemyFighter, attack } = this.props;
        if (attacker.id === yourFighter.id) {
            attack(yourFighter, enemyFighter, ability);
        } else {
            attack(enemyFighter, yourFighter, ability);
        }
    }

    startUseItem = (user: Fighter, item: Item) => {
        const { useItem } = this.props;

        if (!item.quantity) {
            return;
        }
        
        useItem(user, item);
    }

    componentWillReceiveProps(nextProps: Props) {
        this.forceUpdate();
    }



    render() {
        const { yourFighter, enemyFighter } = this.props;
        if (!yourFighter || !enemyFighter) {
            return <Container>No fighters</Container>;
        }

        return (
            <Container>
                <FighterContainer you={true} fighter={yourFighter} startAttack={this.startAttack} startUseItem={this.startUseItem} />
                <FighterContainer you={false} fighter={enemyFighter} startAttack={this.startAttack} startUseItem={this.startUseItem} />
            </Container>
        );
    }
}

export default BattleDisplay;
import * as React from "react";
import styled from "@emotion/styled";

// import Bryce from "src/Images/bryce.jpg";
// import Joe from "src/Images/joe.jpg";
const ratboy = require("Images/ratboy.jpg");
import { Fighter } from "Interfaces/Fighter";
import { Ability } from "Interfaces/Ability";
import { Item } from "Interfaces/Item";

const Container = styled("div")`
    flex: 1;
    height: 100%;
    width: 100%;
    background-image: url(${ratboy});

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
        const { yourFighter, enemyFighter, children } = this.props;
        if (!yourFighter || !enemyFighter) {
            return <Container>No fighters</Container>;
        }

        return (
            <Container>
                {children}
            </Container>
        );
    }
}

export default BattleDisplay;
import * as React from "react";
import styled from "@emotion/styled";
import { Button, Progress } from "reactstrap";
import { Fighter } from "Interfaces/Fighter";
import Details from "./Details";
import { Ability } from "Interfaces/Ability";
import { Item } from "Interfaces/Item";


interface ContainerProps {
    you?: boolean;
}

const Wrapper = styled("div")`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    max-width: 24%;
`;

const Container = styled<"div", ContainerProps>("div")`
    display: flex;
    flex: 1;
    width: 100%;
    align-self: ${props => props.you ? "flex-end" : "flex-start"};
`;

const Image = styled("img")`
    height: 256px;
    width: 128px;
`;

const ActionButton = styled(Button)`
    flex: 0;
`;

interface Props {
    you: boolean;
    fighter: Fighter;
    startAttack: (attacker: Fighter, ability: Ability) => void;
    startUseItem: (user: Fighter, item: Item) => void;
}

interface State {
    currentDisplay: "initial" | "abilities" | "items";
}

class FighterContainer extends React.PureComponent<Props, State> {
    state: State = {
        currentDisplay: "initial"
    };

    handleAttackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({ currentDisplay: "abilities" });
    }

    handleItemsClick = () => {
        this.setState({ currentDisplay: "items" });
    }

    handleRunClick = () => {
        console.log("Run");
    }

    handleReturnClick = () => {
        this.setState({ currentDisplay: "initial" });
    }

    componentWillReceiveProps() {
        this.forceUpdate();
    }

    attack = (ability: Ability) => {
        const { fighter, startAttack } = this.props;
        startAttack(fighter, ability);
        this.handleReturnClick();
    }

    useItem = (item: Item) => {
        const { fighter, startUseItem } = this.props;
        startUseItem(fighter, item);
        this.handleReturnClick();
    }

    renderInitialActionButtons = () => {
        return (
            <div>
                <ActionButton onClick={this.handleAttackClick}>Attack</ActionButton>
                <ActionButton onClick={this.handleItemsClick}>Items</ActionButton>
                <ActionButton onClick={this.handleRunClick}>Run</ActionButton>
            </div>
        );
    }

    renderAbilities = () => {
        const { fighter } = this.props;
        return (
            <div>
                <ul>
                    {fighter.abilities.map(ability => (
                        <li onClick={e => this.attack(ability)}>{ability.name}</li>
                    ))}
                </ul>
                <Button color="danger" onClick={this.handleReturnClick}>Back</Button>
            </div>
        );
    }

    renderItems = () => {
        const { fighter } = this.props;
        return (
            <div>
                <ul>
                    {fighter.items.map(item => (
                        <li onClick={e => this.useItem(item)}>{item.name}     Remaining: {item.quantity}</li>
                    ))}
                </ul>
                <Button color="danger" onClick={this.handleReturnClick}>Back</Button>
            </div>
        );
    }

    render() {
        const { you, fighter } = this.props;
        const { currentDisplay } = this.state;

        return (
            <Wrapper>
                <Container>
                    <Details fighter={fighter} />
                </Container>
                <Container you={true} style={{ justifyContent: "space-between" }}>
                    <div>
                    <Image src={fighter.image} />
                    </div>

                    {you && <div>
                        {currentDisplay === "initial" && this.renderInitialActionButtons()}
                        {currentDisplay === "abilities" && this.renderAbilities()}
                        {currentDisplay === "items" && this.renderItems()}
                    </div>}
                </Container>
            </Wrapper>
        );
    }
}

export default FighterContainer;
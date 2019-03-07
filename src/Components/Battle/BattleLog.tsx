import * as React from "react";
import styled from "styled-components";
import { Fighter } from "src/Interfaces/Fighter";

const Container = styled("div")`
    height: 25%;
    width: 100%;

    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;

    color: white;
`;

const Line = styled("div")`
    display: flex;
`;

interface Props {
    fighters: Fighter[];
}

class BattleLog extends React.PureComponent<Props> {

    render() {
        const { fighters } = this.props;

        if (!fighters) {
            return <Container>No fighters</Container>;
        }
        return (
            <Container>
                <Line>Battle Log</Line>
            </Container>
        );
    }
}

export default BattleLog;
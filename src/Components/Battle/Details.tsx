import * as React from "react";
import { Fighter } from "src/Interfaces/Fighter";
import styled from "styled-components";

const Wrapper = styled("div")`
`;

interface Props {
    fighter: Fighter;
}

class Details extends React.PureComponent<Props> {

    componentWillReceiveProps(nextProps: Props) {
        this.forceUpdate();
    }

    render() {
        const { fighter } = this.props;
        return (
            <Wrapper>
                <h3>{fighter.name}</h3>
                <h3>{fighter.health}/{fighter.maxHealth}</h3>
            </Wrapper>
        )
    }
}

export default Details;
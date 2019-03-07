import * as React from "react";
import styled from "styled-components";

const Container = styled("div")`
    display: flex;
    height: 15%;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

class Header extends React.PureComponent {

    render() {
        const title = "Battle of Bryce";

        return (
            <Container>
                <h1>{title}</h1>
            </Container>
        );
    }
}

export default Header;
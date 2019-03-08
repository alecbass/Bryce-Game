import * as React from "react";
import styled from "styled-components";

const Container = styled("div")`
    display: flex;
    height: 16%;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

interface Props {
    title: string;
    style?: React.CSSProperties;
}

class Header extends React.PureComponent<Props> {
    static defaultProps: Partial<Props> = {
        style: {
            backgroundColor: "lightblue"
        }
    };

    render() {
        const { title, style } = this.props;

        return (
            <Container style={style}>
                <span>{title}</span>
            </Container>
        );
    }
}

export default Header;
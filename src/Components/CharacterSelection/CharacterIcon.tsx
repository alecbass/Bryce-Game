import * as React from "react";
import { Fighter } from "Interfaces/Fighter";
import styled from "@emotion/styled";

interface IconProps {
    backgroundImage?: string;
}

const Icon = styled<"div", IconProps>("div")`
    height: 128px;
    width: 128px;
    min-height: 128px;
    min-width: 128px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px black solid;
    background-image: url(${props => props.backgroundImage});
    background-size: 100% 100%;
    background-repeat: no-repeat;
`;

const Label = styled("p")`
    flex-wrap: wrap;
    font-weight: bold;
    border: 1px black solid;
    text-align: center;
`;

interface Props {
    fighter: Fighter;
    handleHover: (e: React.MouseEvent<HTMLDivElement>, fighter: Fighter) => void;
    handleUnhover: () => void;
    handleClick: (e: React.MouseEvent<HTMLDivElement>, fighter: Fighter) => void;
}

class CharacterIcon extends React.PureComponent<Props> {

    render() {
        const { fighter, handleHover, handleUnhover, handleClick } = this.props;

        return (
            <div style={{maxWidth: "128px"}}>
                <Icon onMouseOver={e => handleHover(e, fighter)} onMouseLeave={handleUnhover} onClick={e => handleClick(e, fighter)} backgroundImage={fighter.image} />
                <Label>{fighter.name}</Label>
            </div>
        );
    }
}

export default CharacterIcon;
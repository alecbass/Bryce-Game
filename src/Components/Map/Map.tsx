import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import * as actions from "Store/actions";
import { RPGMapState } from "Store/reducer";
import { State } from "Store";

import styled from "@emotion/styled";

const Map = styled("div")`
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
`;

const Grid = styled<"div", { height: number, width: number }>("div")`
    display: grid;
    flex: 1;
    grid-template-columns: repeat(${props => props.height}, 24px);
    grid-template-rows: repeat(${props => props.width}, 24px);
    grid-column-gap: 1px;
    grid-row-gap: 1px;
`;


const Tile = styled<"div", { you?: boolean }>("div")`
    background-color: ${props => props.you ? "white" : "blue"};
    border: 1px solid black;
    height: 24px;
    width: 24px;
`;

interface Props {
    rpgMap: RPGMapState
    dispatch: any;
}

const MapScreen: React.FC<Props> = props => {
    // const map: JSX.Element[][] = new Array(height).fill(new Array(width).fill(<Tile />));
    // const [map, setMap] = useState<JSX.Element[][]>(new Array(height).fill(new Array(width).fill(<Tile />)));
    const [move, setMove] = useState("");
    const [count, setCount] = useState(0);
    let text = "Text";
    const mapRef = useRef(null);

    useEffect(() => {
        console.debug("Updating");
        document.title = `Clicked ${count} times`;
        window.addEventListener("keyup", handleKeyUp);
        // map[y][x] = <Tile you={true} />;
        // mapRef.current
        return () => {
            // componentWillUnmount
            window.removeEventListener("keyup", handleKeyUp);
        }
    }, [move, count]);

    function renderTiles() {
        const { x, y, height, width } = props.rpgMap;
        const mapTiles = new Array<JSX.Element[]>(height).fill(new Array<JSX.Element>(width).fill(<Tile />));
        mapTiles[y][x] = <Tile you={true} />;
        console.debug("Rendering tiles");
        return mapTiles;
    }

    function handleKeyUp(e: KeyboardEvent) {
        // setTimeout(() => {}, 800);
        // map[y][x] = <Tile />;
        const { dispatch } = props;
        switch(e.key) {
            case "ArrowLeft": {
                // newMap.x = Math.max(newMap.x - 1, 0)
                // setX(x - 1);
                dispatch(actions.moveOnRpgMap("left"));
                break;
            }
            case "ArrowRight": {
                // newMap.x = Math.min(newMap.x + 1, height);
                dispatch(actions.moveOnRpgMap("right"));
                // setX(x + 1);
                break;
            }
            case "ArrowUp": {
                // newMap.y = Math.max(newMap.y - 1, 0);
                dispatch(actions.moveOnRpgMap("up"));
                // setY(y - 1);
                break;
            }
            case "ArrowDown": {
                // newMap.y = Math.min(newMap.y + 1, width)
                dispatch(actions.moveOnRpgMap("down"));
                // setY(y + 1);
                break;
            }
            default: {
                break;
            }
        }
        setMove(e.key);
    }

    return (
        <Map onClick={() => setCount(count + 1)} ref={mapRef}>
            <p style={{ flex: 0 }}>Move: {move} x:{props.rpgMap.x}  y:{props.rpgMap.y}</p>
            <Grid height={props.rpgMap.height} width={props.rpgMap.width}>
                {renderTiles()}
            </Grid>
        </Map>
    );
}

export default connect((state: State) => ({ rpgMap: state.rpgMap }))(MapScreen);
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import * as actions from "Store/actions";
import { RPGMapState } from "Store/reducer";
import { State } from "Store";

import styled from "@emotion/styled";

const Map = styled("div")`
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    flex-direction: column;
`;

const TILE_SIZE = "24px";

const Grid = styled<"div", { height: number, width: number }>("div")`
    display: grid;
    flex: 1;
    grid-template-columns: repeat(${props => props.height}, ${TILE_SIZE});
    grid-template-rows: repeat(${props => props.width}, ${TILE_SIZE});
    grid-column-gap: 1px;
    grid-row-gap: 1px;
`;


const Tile = styled<"div", { active?: boolean, c?: boolean | undefined }>("div")`
    background-color: ${props => props.active ? "white" : "blue" };
    border: 1px solid black;
    height: ${TILE_SIZE};
    width: ${TILE_SIZE};
    transform: ${props => props.c === true ? "rotate(30deg)" : props.c === false ? "rotate(-10deg)" : "none" };
`;

interface Props {
    rpgMap: RPGMapState
    dispatch: any;
}

const MapScreen: React.FC<Props> = props => {
    const [move, setMove] = useState("");
    const mapRef = useRef(null);

    useEffect(() => {
        window.addEventListener("keyup", handleKeyUp);

        let o = { num: 3 };
        const a = [
            [{ num: 3 }, { num: 3 }, { num: 3 }],
            [{ num: 3 }, { num: 3 }, { num: 3 }],
            [{ num: 3 }, { num: 3 }, { num: 3 }]
        ];
        // a[1][1] = { s: "string" };
        a[2][1].num = 7;
        console.debug(a);
        return () => {
            // componentWillUnmount
            window.removeEventListener("keyup", handleKeyUp);
        }
    }, [move]);

    function renderTiles() {
        const { x, y, height, width } = props.rpgMap;
        // this exists so wethat don't pass by reference
        const makeTile = () => {
            return <Tile />;
        }
        const mapTiles: JSX.Element[][] = [];
        for (let i = 0; i < height; i++) {
            mapTiles.push(new Array<JSX.Element>());
            for (let j = 0; j < width; j++) {
                mapTiles[i].push(makeTile());
            }
        }
        mapTiles[y][x] = <Tile active={true}/>;
        return mapTiles;
    }

    function handleKeyUp(e: KeyboardEvent) {
        const { dispatch } = props;
        switch(e.key) {
            case "ArrowLeft": {
                dispatch(actions.moveOnRpgMap("left"));
                break;
            }
            case "ArrowRight": {
                dispatch(actions.moveOnRpgMap("right"));
                break;
            }
            case "ArrowUp": {
                // invert the y-axis
                dispatch(actions.moveOnRpgMap("down"));
                break;
            }
            case "ArrowDown": {
                // invert the y-axis
                dispatch(actions.moveOnRpgMap("up"));
                break;
            }
            default: {
                break;
            }
        }
        setMove(e.key);
    }

    return (
        <Map ref={mapRef}>
            <p style={{ flex: 0 }}>Move: {move} x:{props.rpgMap.x}  y:{props.rpgMap.y}</p>
            <Grid height={props.rpgMap.height} width={props.rpgMap.width}>
                {renderTiles()}
            </Grid>
        </Map>
    );
}

export default connect((state: State) => ({ rpgMap: state.rpgMap }))(MapScreen);
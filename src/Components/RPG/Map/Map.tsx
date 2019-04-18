import React, { useState, useEffect, useRef, useContext } from "react";
import { connect } from "react-redux";
import * as actions from "Store/actions";
import { RPGMapState } from "Store/reducer";
import { State } from "Store";
import { RPGContext } from "../Context";

import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import { Button } from "reactstrap";
import { PlayerIcon, MonsterIcon } from "Components/icons";
import Battle from "Components/RPG/BattleFC/Battle";

const Map = styled("div")`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  flex-direction: column;
`;

const TILE_SIZE = "24px";

// when you discover keyframes lmao
const rotate = keyframes`
    0% { transform: rotate3d(0deg, 0deg, 0deg, 0deg); }
    20% { transform: rotate3d(1, 1, 1, 120deg); }
    37% { transform: rotate3d(0.6, 0.2, 0.6, 180deg); }
    72% { transform: rotate3d(2, -1, -1, 270deg); }
    100% { transform: rotate3d(0); }
`;

const Grid = styled<"div", { height: number; width: number; ended?: boolean }>(
  "div"
)`
  display: grid;
  flex: 1;
  grid-template-columns: repeat(${props => props.height}, ${TILE_SIZE});
  grid-template-rows: repeat(${props => props.width}, ${TILE_SIZE});
  grid-column-gap: 1px;
  grid-row-gap: 1px;
  animation: ${props => (props.ended ? `${rotate} 1s infinite` : "none")};
`;

const Tile = styled<"div", { active?: boolean; backgroundColour?: string }>(
  "div"
)`
  background-color: ${props => props.backgroundColour || "black"};
  border: ${props => (props.active ? "1px solid white" : "none")};
  height: ${TILE_SIZE};
  width: ${TILE_SIZE};
`;

const player = require("Images/player.png");

interface Props {
  rpgMap: RPGMapState;
  dispatch: any;
}

const RPGMap: React.FC<Props> = props => {
  const [ended, setEnded] = useState<boolean>(false);
  const [move, setMove] = useState("");
  const mapRef = useRef(null);
  const [isInBattle, setIsInBattle] = useState(false);
  const { map } = useContext(RPGContext);

  useEffect(() => {
    // componentWillMount
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      // componentWillUnmount
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // componentDidUpdate(isInbattle)
    if (isInBattle) {
      window.removeEventListener("keyup", handleKeyUp);
    } else {
      window.addEventListener("keyup", handleKeyUp);
    }

    return () => {
      // the event listener only goes away if this is here
      window.removeEventListener("keyup", handleKeyUp);
    }
  }, [isInBattle]);

  function renderTiles() {
    const { x, y, height, width, map, monsters } = props.rpgMap;
    // this exists so that we don't pass by reference
    const makeTile = (icon?: string) => {
      let tile = <Tile />;
      if (icon === "d") {
        tile = <Tile backgroundColour="brown" />;
      } else if (icon === "g") {
        tile = <Tile backgroundColour="green" />;
      } else if (icon === "s") {
        tile = <Tile backgroundColour="grey" />;
      } else if (icon === "e") {
        tile = <Tile backgroundColour="yellow" />;
      }
      return tile;
    };

    // create the map's tiles
    const mapTiles: JSX.Element[][] = [];
    for (let i = 0; i < height; i++) {
      mapTiles.push(new Array<JSX.Element>());
      for (let j = 0; j < width; j++) {
        mapTiles[i].push(makeTile(map[i][j]));
      }
    }

    // put the monster tiles on
    for (let monster of monsters) {
      mapTiles[monster.y][monster.x] = <MonsterIcon />;
    }

    // put the player tile on
    mapTiles[y][x] = <PlayerIcon />;
    return mapTiles;
  }

  /**
   * The only thing this should do is prevent the page from moving
   */
  function handleKeyDown(e: KeyboardEvent) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }

  function handleKeyUp(e: KeyboardEvent) {
    const { dispatch } = props;

    switch (e.key) {
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

  function renderText() {
    return ended ? (
      <p>Oh god what is happen</p>
    ) : (
      <p style={{ flex: 0 }}>
        Move: {move} x:{props.rpgMap.x} y:{props.rpgMap.y}
      </p>
    );
  }

  function renderGridMap() {
    const { x, y, map, monsters } = props.rpgMap;
    const nextToEnemy = () => {
      for (let monster of monsters) {
        // left or right or above or below
        if (
          (monster.x === x - 1 && monster.y === y) ||
          (monster.x === x + 1 && monster.y === y) ||
          (monster.x === x && monster.y === y - 1) ||
          (monster.x === x && monster.y === y + 1)
        ) {
          return true;
        }
      }
      return false;
    };

    return (
      <>
        <Grid
          height={props.rpgMap.height}
          width={props.rpgMap.width}
          ended={ended}
        >
          {renderTiles()}
        </Grid>
        {props.rpgMap.map[props.rpgMap.y][props.rpgMap.x] === "e" &&
          (ended ? (
            <Button color="info" onClick={() => setEnded(false)}>
              Return...
            </Button>
          ) : (
            <Button color="danger" onClick={() => setEnded(true)}>
              End it???
            </Button>
          ))}
        {nextToEnemy() && (
          <Button color="warning" onClick={() => setIsInBattle(true)}>
            Attack enemy??
          </Button>
        )}
      </>
    );
  }

  function renderBattle() {
    return (
      <>
        <Battle />
        <Button onClick={() => setIsInBattle(false)}>Go back to the map</Button>
      </>
    );
  }

  return (
    <>
      <Map ref={mapRef}>
        {renderText()}
        {isInBattle && renderBattle()}
        {!isInBattle && renderGridMap()}
      </Map>
    </>
  );
};

export default connect((state: State) => ({ rpgMap: state.rpgMap }))(RPGMap);

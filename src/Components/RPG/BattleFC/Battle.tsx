import React, { useState, useEffect, useContext, useRef } from "react";
import { RPGContext } from "../Context";
import Button from "reactstrap/lib/Button";
import styled from "@emotion/styled";
import { clearSelection } from "../utils";

const BattleDiv = styled("div")`
  display: flex;
  flex-direction: column;
`;

const Buttons = styled<"div", { highlightedButton: number }>("div")`
  display: grid;

  grid-template-columns: 33.3%;

  justify-content: space-evenly;

  > button {
    height: 64px;
  }

  > button:first-of-type {
    grid-column-start: 1;
    grid-column-end: 4;
  }

  > button:nth-of-type(${props => props.highlightedButton}) {
    background-color: #f47742;
  }
`;

const RPGBattle: React.FC = () => {
  const { battle, dispatch } = useContext(RPGContext);
  const [highlightedButton, setHighlightedButton] = useState(1);
  const buttonsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    clearSelection();

    switch (e.key) {
      case "ArrowLeft": {
        if (highlightedButton === 1) {
          setHighlightedButton(2);
        } else {
          setHighlightedButton(
            highlightedButton - 1 < 2 ? 2 : highlightedButton - 1
          );
        }
        break;
      }
      case "ArrowUp": {
        setHighlightedButton(1);
        break;
      }
      case "ArrowRight": {
        if (highlightedButton === 1) {
          setHighlightedButton(4);
        } else {
          setHighlightedButton(
            highlightedButton + 1 > 4 ? 4 : highlightedButton + 1
          );
        }
        break;
      }
      case "ArrowDown": {
        if (highlightedButton === 1) {
          setHighlightedButton(3);
        }
        break;
      }
      case "Enter": {
        if (!buttonsRef.current) {
          break;
        }
        const button = buttonsRef.current.children[highlightedButton - 1];
        if (!button || !(button instanceof HTMLButtonElement)) {
          break;
        }
        button.click();
      }
      default: {
        return;
      }
    }
  };

  return (
    <BattleDiv>
      Battle with {battle.player.name}
      Health: {battle.player.health}
      <Buttons highlightedButton={highlightedButton} ref={buttonsRef}>
        <Button onClick={() => dispatch({ type: "ATTACK" })}>Attack</Button>
        <Button onClick={() => dispatch({ type: "HEAL" })}>Heal</Button>
        <Button
          onClick={() =>
            setHighlightedButton(Math.min(highlightedButton + 1, 4))
          }
        >
          Increase Button
        </Button>
        <Button
          onClick={() =>
            setHighlightedButton(Math.max(highlightedButton - 1, 1))
          }
        >
          Decrease Button
        </Button>
      </Buttons>
    </BattleDiv>
  );
};

export default RPGBattle;

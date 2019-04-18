import * as React from "react";

/** RPG Map */
interface MonsterDetail {
  x: number;
  y: number;
}

export interface RPGMapState {
  x: number;
  y: number;
  height: number;
  width: number;
  map: string[];
  monsters: MonsterDetail[];
}

const map = [
  "ssssssssssssssssssss",
  "sggggdgggggggggggggs",
  "sggggggggggggggggggs",
  "sggggggggggggggggggs",
  "sggggggggggggggggggs",
  "sggggggggdgggggggggs",
  "sgggggggggggdggggggs",
  "sggggggdgggggggggggs",
  "sggggggggggggggggggs",
  "sgggggggggdggggggggs",
  "sggggggggegggggggggs",
  "sggggggggggggggggggs",
  "sggggggggggggggggggs",
  "sgggggggggggdggggggs",
  "sggggggggggggggggggs",
  "sggggdgggggggggggggs",
  "sggggggggggggggggggs",
  "sggggggggggggggggggs",
  "sggggggggggggggggggs",
  "ssssssssssssssssssss"
];

const initialMonsters: MonsterDetail[] = [{ x: 10, y: 10 }, { x: 15, y: 12 }];

export const initialRpgMapState: RPGMapState = {
  x: 1,
  y: 1,
  height: map.length,
  width: map[0].length,
  map,
  monsters: initialMonsters
};

// shouldn't be able to walk through these
export const unmoveableTiles = ["s"];

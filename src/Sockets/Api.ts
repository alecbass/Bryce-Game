import Socket from "./Socket";
import { User } from "src/Store/reducer";

export interface BaseMessage {
    type: "signon" | "message" | "signoff" | "refresh" | "you";
    user?: User;
    payload: string | string[] | User | User[];
}

export interface SignonMessage extends BaseMessage {
    type: "signon";
    payload: string | User;
}

export async function sendSignon(message: SignonMessage) {
    Socket.send(message);
}

export interface Message extends BaseMessage {
    type: "message";
    payload: string | string[];
}

export async function sendChatMessage(message: Message) {
    Socket.send(message);
}

export interface RefreshMessage extends BaseMessage {
    type: "refresh";
}

export async function sendRefreshMessage(message: RefreshMessage) {
    Socket.send(message);
}

export interface YouMessage extends BaseMessage {
    type: "you";
    payload: User;
}

export async function sendYouMessage(message: YouMessage) {
    Socket.send(message);
}
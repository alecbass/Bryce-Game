import Socket from "./Socket";
import { User } from "Store/reducer";

export interface BaseMessage {
    type: "signon" | "message" | "signoff" | "refresh" | "login";
    user?: User;
    payload: string | string[] | User | User[] | Message[];
}

export interface SignonMessage extends BaseMessage {
    type: "signon";
    payload: string | User;
}

export async function sendSignonMessage(message: SignonMessage) {
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

export interface LoginMessage extends BaseMessage {
    type: "login";
    payload: User;
}

export async function sendLoginMessage(message: LoginMessage) {
    console.log("sending htis lgin message");
    console.log(message);
    Socket.send(message);
}
import { Achievement } from "./achievement";
import { IEvent } from "./event";
import { Purchase } from "./purchase";

export interface UserDetails {
    id: number;
    name: string;
    points: number;
    achievements: Achievement[];
    purchases: Purchase[];
    events: IEvent[];
}

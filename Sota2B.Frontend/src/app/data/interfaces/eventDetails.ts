import { Achievement } from "./achievement";
import { User } from "./user";

export interface EventDetails {
    id: number;
    name: string;
    description: string;
    reward: number;
    startDate?: Date;
    endDate?: Date;
    achievement?: Achievement; // если Achievement - это другой интерфейс, его нужно будет импортировать
    userWasOnEvent: User[]; // массив пользователей, которые были на событии
}

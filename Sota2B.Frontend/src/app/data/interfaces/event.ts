import { TuiDay } from "@taiga-ui/cdk";
import { PostAchievement } from "./postAchievement";

export interface IEvent {
    id: number;
    name: string;
    description: string;
    reward: number;
    startDate?: Date;
    endDate?: Date;
    achievement?: PostAchievement;
}

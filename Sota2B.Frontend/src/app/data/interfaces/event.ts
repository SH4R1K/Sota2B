export interface IEvent {
    id: number;
    name: string;
    description: string;
    reward: number;
    startDate?: Date;
    endDate?: Date;
}

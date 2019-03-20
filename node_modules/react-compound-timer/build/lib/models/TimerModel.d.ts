import { Unit, TimePartsType } from '../helpers/getTimeParts';
export interface Checkpoint {
    time: number;
    callback: () => any;
}
export declare type Direction = 'forward' | 'backward';
export default class Timer {
    private initialTime;
    private time;
    private direction;
    private timeToUpdate;
    private lastUnit;
    private checkpoints;
    private innerState;
    private onChange;
    private timerId;
    constructor({ initialTime, direction, timeToUpdate, lastUnit, checkpoints, onChange, }: {
        initialTime: number;
        direction: Direction;
        timeToUpdate: number;
        lastUnit: Unit;
        checkpoints: Checkpoint[];
        onChange: () => any;
    });
    readonly state: import("./TimerState").TimerStateType;
    readonly timeParts: TimePartsType;
    getTimeParts(time: any): TimePartsType;
    setTime(time: any): void;
    getTime(): number;
    setDirection(direction: any): void;
    setCheckpoints(checkpoints: any): void;
    start(): void;
    resume(): void;
    pause(): void;
    stop(): void;
    reset(): void;
    private setTimerInterval;
    private computeTime;
}

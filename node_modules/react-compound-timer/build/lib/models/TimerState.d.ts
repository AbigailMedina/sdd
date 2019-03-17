export declare const INITED = "INITED";
export declare const PLAYING = "PLAYING";
export declare const PAUSED = "PAUSED";
export declare const STOPPED = "STOPPED";
export declare type TimerStateType = 'INITED' | 'PLAYING' | 'PAUSED' | 'STOPPED';
export default class TimerState {
    private onChange;
    private state;
    constructor(onChangeStatus?: (obj: {
        timerState: TimerStateType;
    }) => void);
    getState(): TimerStateType;
    setInited(): boolean;
    isInited(): boolean;
    setPlaying(): boolean;
    isPlaying(): boolean;
    setPaused(): boolean;
    isPaused(): boolean;
    setStopped(): boolean;
    isStopped(): boolean;
}

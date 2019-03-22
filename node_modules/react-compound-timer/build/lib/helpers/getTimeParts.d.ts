export declare type Unit = 'ms' | 's' | 'm' | 'h' | 'd';
export interface TimePartsType {
    ms: number;
    s: number;
    m: number;
    h: number;
    d: number;
}
export default function getTimeParts(time: number, lastUnit: Unit): TimePartsType;

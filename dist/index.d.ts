export interface IGamepadProps {
    gamepadButtonsMap?: Record<number, string>;
    onGamepadsUpdate?: (gamepads: Gamepad[]) => void;
    onAxesChange?: (data: IGamepadAxesData) => void;
    onButtonsDown?: (data: IGamepadButtonsData) => void;
}
/**
 * 内置的手柄键位 Map，开发者可以自行注入自己的手柄键位
 */
export declare const INITIAL_GAMEPAD_BUTTONS_MAP: Record<number, string>;
interface IGamepadEventData {
    gamepad: Gamepad;
    index: number;
}
/**
 * axes 长度为 4，分别为左摇杆 X、Y，右摇杆 X、Y
 */
export interface IGamepadAxesData extends IGamepadEventData {
    axes: number[];
}
/**
 * 如果传入了 gamepadButtonsMap，则返回的 buttons 为 { key: number, value: string }[]
 */
export interface IGamepadButtonsData extends IGamepadEventData {
    buttons: number[] | {
        key: number;
        value: string;
    }[];
}
export default function useGamepads(props?: IGamepadProps): void;
export {};

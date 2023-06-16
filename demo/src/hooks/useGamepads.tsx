import { useEffect, useRef } from 'react';

export interface IGamepadProps {
  gamepadButtonsMap?: Record<number, string>;
  onGamepadsUpdate?: (gamepads: Gamepad[]) => void;
  onAxesChange?: (data: IGamepadAxesData) => void;
  onButtonDown?: (data: IGamepadButtonsData) => void;
};

/**
 * 内置的手柄键位 Map，开发者可以自行注入自己的手柄键位
 */
export const INITIAL_GAMEPAD_BUTTONS_MAP: Record<number, string> = {
  0: 'A',
  1: 'B',
  2: 'X',
  3: 'Y',
  4: 'LB',
  5: 'RB',
  6: 'LT',
  7: 'RT',
  8: 'BACK',
  9: 'START',
  10: 'LS',
  11: 'RS',
  12: 'UP',
  13: 'DOWN',
  14: 'LEFT',
  15: 'RIGHT',
};

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

interface GamepadsRef {
  [key: number]: Gamepad;
}

/**
 * 如果传入了 gamepadButtonsMap，则返回的 buttons 为 { key: number, value: string }[]
 */
export interface IGamepadButtonsData extends IGamepadEventData {
  buttons: number[] | { key: number, value: string }[];
}

export default function useGamepads(props?: IGamepadProps) {
  const {
    gamepadButtonsMap = INITIAL_GAMEPAD_BUTTONS_MAP,
    onGamepadsUpdate = (gamepads: Gamepad[]) => console.log('onGamepadsUpdate: ', gamepads),
    onAxesChange = (data: IGamepadAxesData) => console.log('onAxisChange: ', data),
    onButtonDown = (data: IGamepadButtonsData) => console.log('onButtonDown: ', data),
  } = props || {};

  const gamepadsRef = useRef<GamepadsRef>({});

  // Initialize gamepads connected
  useEffect(() => {
    let animationFrame: any = null;
    const handleGamepadLoopEvent = () => {
      // Grab gamepads from browser API
      const _gamepads = navigator.getGamepads
        ? navigator.getGamepads()
        : // @ts-ignore
        navigator.webkitGetGamepads
        ? // @ts-ignore
          navigator.webkitGetGamepads()
        : [];
      _gamepads.forEach((gamepad: Gamepad, index: number) => {
        if (!gamepad) {
          return;
        }
        gamepadsRef.current = Object.assign({}, gamepadsRef.current, {
          [gamepad.index]: gamepad,
        });
        onGamepadsUpdate && onGamepadsUpdate(Object.values(gamepadsRef.current));
        let buttons: any[] = [];
        for (let i = 0; i < gamepad.buttons.length; i++) {
          if (gamepad.buttons[i].pressed) {
            !gamepadButtonsMap
              ? buttons.push(i)
              : buttons.push({ key: i, value: gamepadButtonsMap[i]})
          }
        }

        // 处理按钮点击事件
        onButtonDown && onButtonDown({
          gamepad,
          index,
          buttons,
        });

        const [laxes_X, laxes_Y, raxes_X, raxes_Y] = (gamepad as Gamepad).axes;
        // 处理摇杆事件
        onAxesChange && onAxesChange({
          gamepad,
          index,
          axes: [laxes_X, laxes_Y, raxes_X, raxes_Y],
        });
      });

      animationFrame = requestAnimationFrame(handleGamepadLoopEvent);
    };

    const handleGamepadConnected = (event: GamepadEvent) => {
      const gamepad: Gamepad = event.gamepad;
      console.log(`Gamepad ${gamepad.id} connected`);
      handleGamepadLoopEvent();
    };

    const handleGamepadDisconnected = (event: GamepadEvent) => {
      const gamepad: Gamepad = event.gamepad;
      console.log(`Gamepad ${gamepad.id} disconnected`);
      cancelAnimationFrame(animationFrame);
    };

    window.addEventListener('gamepadconnected', handleGamepadConnected);
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

    return () => {
      window.removeEventListener('gamepadconnected', handleGamepadConnected);
      window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
    };
  }, []);
}

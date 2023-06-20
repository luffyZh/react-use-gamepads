(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactUseGamepads = {}, global.React));
})(this, (function (exports, react) { 'use strict';

    /**
     * 内置的手柄键位 Map，开发者可以自行注入自己的手柄键位
     */
    const INITIAL_GAMEPAD_BUTTONS_MAP = {
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
      15: 'RIGHT'
    };
    function useGamepads(props) {
      const {
        gamepadButtonsMap,
        onGamepadsUpdate = gamepads => console.log('onGamepadsUpdate: ', gamepads),
        onAxesChange = data => console.log('onAxisChange: ', data),
        onButtonsDown = data => console.log('onButtonDown: ', data)
      } = props || {};
      const gamepadsRef = react.useRef({});
      // Initialize gamepads connected
      react.useEffect(() => {
        let animationFrame = null;
        const handleGamepadLoopEvent = () => {
          // Grab gamepads from browser API
          const _gamepads = navigator.getGamepads ? navigator.getGamepads() :
          // @ts-ignore
          navigator.webkitGetGamepads ?
          // @ts-ignore
          navigator.webkitGetGamepads() : [];
          _gamepads.forEach((gamepad, index) => {
            if (!gamepad) {
              return;
            }
            gamepadsRef.current = Object.assign({}, gamepadsRef.current, {
              [gamepad.index]: gamepad
            });
            onGamepadsUpdate && onGamepadsUpdate(Object.values(gamepadsRef.current));
            let buttons = [];
            for (let i = 0; i < gamepad.buttons.length; i++) {
              if (gamepad.buttons[i].pressed) {
                !gamepadButtonsMap ? buttons.push(i) : buttons.push({
                  key: i,
                  value: gamepadButtonsMap[i]
                });
              }
            }
            // 处理按钮点击事件
            onButtonsDown && onButtonsDown({
              gamepad,
              index,
              buttons
            });
            const [laxes_X, laxes_Y, raxes_X, raxes_Y] = gamepad.axes;
            // 处理摇杆事件
            onAxesChange && onAxesChange({
              gamepad,
              index,
              axes: [laxes_X, laxes_Y, raxes_X, raxes_Y]
            });
          });
          animationFrame = requestAnimationFrame(handleGamepadLoopEvent);
        };
        const handleGamepadConnected = event => {
          const gamepad = event.gamepad;
          console.log(`Gamepad ${gamepad.id} connected`);
          handleGamepadLoopEvent();
        };
        const handleGamepadDisconnected = event => {
          const gamepad = event.gamepad;
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

    exports.INITIAL_GAMEPAD_BUTTONS_MAP = INITIAL_GAMEPAD_BUTTONS_MAP;
    exports["default"] = useGamepads;

    Object.defineProperty(exports, '__esModule', { value: true });

}));

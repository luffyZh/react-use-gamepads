(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.myPackage = {}, global.React));
})(this, (function (exports, React) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

    const MyComponent = () => {
      const [count, setCount] = React.useState(0);
      const handleClick = () => {
        setCount(count + 1);
      };
      return React__default["default"].createElement("div", null, React__default["default"].createElement("p", null, "You clicked ", count, " times"), React__default["default"].createElement("button", {
        onClick: handleClick
      }, "Click me"));
    };

    exports.MyComponent = MyComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));

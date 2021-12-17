import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { useBoolean } from "../.";

const App = () => {
  const [checked, , , check] = useBoolean(false);

  return (
    <div>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {
          check(!checked);
        }}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { useBoolean } from "../.";

const App = () => {
  const { value, setValue } = useBoolean(false);

  return (
    <div>
      <input
        type="checkbox"
        checked={value}
        onChange={() => {
          setValue(!value);
        }}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

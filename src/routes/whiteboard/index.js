import React from "react";

// Components
import Whiteboard from "components/whiteboard";
import Toolbar from "components/toolbar";
import Notifications from "./components/notifications";

// CSS
import "./index.css"


export default () => (
    <div className="app">
        <Toolbar />
        <Whiteboard width={"100%"} height={"100%"} />
        <Notifications />
    </div>
);
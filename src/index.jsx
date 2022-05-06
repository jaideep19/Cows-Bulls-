import React from "react";
import ReactDOM from "react-dom";
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Routes, browserHistory, IndexRoute} from "react-router-dom";
import { createBrowserHistory } from "history";

import Computer from "./components/ComputerGuess";
import { Root } from "./components/Root"
import Room from "./components/Room"
// // import User from "./components/UserGuess";
import MultiPlayer  from "./components/MultiPlayer";

// ReactDOM.render( < MultiPlayer /> , document.getElementById("root"));


class App extends React.Component {
    render() {
        return (
            <Router>
            <Routes>
                <Route path={"/"} element={ <Root/> } />
                    {/* <IndexRoute component={Home} />
                    <Route path={"user/:id"} component={User} />
                    <Route path={"home"} component={Home} />
                </Route> */}
                <Route path={"/multiplayer"} element={<Room/>}/>
                <Route path={"/singleplayer"} element={<Computer/>}/>
                <Route path={"/multiplayer/room/:id"} element={<MultiPlayer />}/>
            </Routes>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
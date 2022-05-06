import React from "react";
import { browserHistory } from "react-router";
import {Link} from "react-router-dom";

export class Root extends React.Component {

    render() {
        // return (
        //     <div className="container">
        //         <div className="row">
        //             <div className="col-xs-10 col-xs-offset-1">
        //                 <Header />
        //             </div>
        //         </div>
        //         <hr/>
        //         <div className="row">
        //             <div className="col-xs-10 col-xs-offset-1">
        //                 {this.props.children}
        //             </div>
        //         </div>
        //     </div>
        // );

        return (
            <div className="container">
              <div className="heading">
                <h1>Cows and Bulls Game</h1>
              </div>
              <div className="form">
                <Link to="/multiplayer"> <button type="button"> <span>MultiPlayer</span> </button> </Link>
                {/* <button onClick={enterMultiPlayer}> <span>MultiPlayer</span> </button>
                <button onClick={inputChangeButton}> <span>SinglePlayer</span> </button>        */}
              </div>
              <div className="form">
                <Link to="/singleplayer"> <button type="button"> <span>SinglePlayer</span> </button> </Link>
              </div>

              {/* <div>
                <ul>
                  {items.map(todoItem => (
                    <li key={todoItem.uniqueId}>{todoItem}</li>
                  ))}
                </ul>
              </div>
              <button onClick={disconnect}>
                  <span>Disconnect</span>
              </button> */}

            </div> 
        );
    }
}
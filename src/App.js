import React from "react";
import {Switch, Route, Link} from "react-router-dom";
import Form from "./Components/order.jsx";


export default function App(){
  
  const Home = () => {
    return (
        <div className="homeWrapper">
          <h1>Lambda Eats</h1>
          <p>Pizza style pizza arcade.</p>
        </div>
      );
  };


  return(
    <div className="bod">
      <nav>
          <Link to="/pizza"><button>Order Form</button></Link>
          <Link to="/" exact>Home</Link>
      </nav>

      <div className="pizzabox">
        <Switch>
          <Route path="/pizza"><Form/></Route>
          <Route path="/" exact><Home/></Route>
        </Switch>
      </div>
      
    </div>
    );
};

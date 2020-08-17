import React from "react";
import {Route, Switch} from "react-router-dom";
// import Navigation from "./Components/Navigation";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Form from "./Components/Form";

const App = () => {

	
  return (
  	<>
  	<Header />
  	<div className="reactBody">
  		<Switch>
  			<Route path="/Pizza">
  				<Form />
  			</Route>
  			<Route path="/">
  				<Home/>
  			</Route>
  		</Switch>
  	</div>
  	</>
  );
};
export default App;

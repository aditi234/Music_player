import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* <Route
            path="/"
            exact
            component={() => (
              <SignUp />
            )}
          />
          <Route
            path="/login"
            exact
            component={() => (
              <Login />
            )}
          />  */}
          <Route
            path="/"
            exact
            component={() => (
              <Home />
            )}
          /> 
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

import {BrowserRouter as Router, Route} from "react-router-dom";
import {FormAuth} from "./containers/FormAuth";
import {UsersList} from "./containers/UsersList";
import {Header} from "./containers/Header";

function App() {
  return (
      <div className="container">
          <Router>
              <Route path="/" exact component={Header}>
              </Route>
              <Route path="/auth" component={FormAuth} />
              <Route path="/private">
                  <Header />
                  <UsersList />
              </Route>
          </Router>
      </div>
  );
}

export default App;

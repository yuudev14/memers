import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import Header from './components/nav/header';

const App = () =>{
  return (
    <div className="App">
      <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/sign-up" component={SignUp} />
            <Route path="/sign-in" component={SignIn} />
          </Switch>
      </Router>
      
    </div>
  );
}

export default App;

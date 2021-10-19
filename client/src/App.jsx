import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/authenticatedPage/home';
import SignUp from './pages/notAuthenticatedPage/signup';
import SignIn from './pages/notAuthenticatedPage/signin';
import Header from './components/nav/header';
import Authenticated from './components/authenticated';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { verifyAuth } from './slice/actions/authAction';
import SingleMeme from './pages/authenticatedPage/singleMeme';

const App = () =>{
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyAuth());
  }, [])
  return (
    <div className="App">
      <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Authenticated>
                <Home />
              </Authenticated>
            </Route>
            <Route path="/:id">
              <Authenticated>
                <SingleMeme />
              </Authenticated>
            </Route>
            <Route path="/sign-up" component={SignUp} />
            <Route path="/sign-in" component={SignIn} />
          </Switch>
      </Router>
      
    </div>
  );
}

export default App;

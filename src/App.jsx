import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import './App.scss';
import Header from './components/Header';
import NotFoundPage from './components/NotFoundPage';
import HomePage from './components/HomePage';
import PeoplePage from './components/PeoplePage';
import NewPerson from './components/NewPerson';

const App = () => (
  <div>
    <Header />
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/people/new" component={NewPerson} />
      <Route path="/people/:personSlug?" component={PeoplePage} />
      <Redirect from="/home" to="/" />
      <NotFoundPage />
    </Switch>
  </div>
);

export default App;

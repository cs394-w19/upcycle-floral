import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './components/App';
import ArrangementDetails from './components/ArrangementDetails';
import Confirmation from './components/Confirmation';
import HomePage from './components/HomePage/HomePage.js';
import Search from './components/Search';
import Sellers from './components/Sellers/Sellers.js';

const SiteRoutes = () => (
  <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
    <App>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/search' component={Search}/>
        <Route path='/details' component={ArrangementDetails}/>
        <Route path='/confirmation' component={Confirmation}/>
        <Route path='/sellers' component={Sellers}/>
      </Switch>
    </App>
  </BrowserRouter>
  );

export default SiteRoutes;

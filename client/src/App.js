import * as React from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import Movies from 'movie/components/Movies';

import AppHeader from 'layout/AppHeader';
import AppToolbar from 'layout/AppToolbar';

import MoviePage from 'movie/components/MoviePage';
import TagPage from 'tag/components/TagPage';
import StatsPage from 'dashboard/StatsPage';

import { useWindowDimensions } from 'core/hooks';

const headerHeight = 50;
// const footerHeight = 30;
const fixDoubleScroll = 5;

const App = () => {
  const { height } = useWindowDimensions();

  return (
    <div className="App">
      <AppHeader height={headerHeight} />

      <div className="App-toolbarAndContent">
        <AppToolbar />

        <div
          className="App-content"
          style={{ height: height - headerHeight - fixDoubleScroll }}
        >
          <Switch>
            <Route exact path="/" component={Movies} />
            <Route path="/item/:id" component={MoviePage} />
            <Route path="/stats" component={StatsPage} />
            <Route exact path="/info" component={TagPage} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;

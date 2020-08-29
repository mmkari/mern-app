import * as React from 'react';
import './App.css';

import { Route, Link, Switch } from 'react-router-dom';

import Movies from './Movies';

import AppHeader from './AppHeader';
import AppToolbar from './AppToolbar';

import { debounce } from 'lodash';

import MoviePage from 'movie/components/MoviePage';
import TagPage from 'tag/components/TagPage';
import StatsPage from 'dashboard/StatsPage';

const About = () => {
  return <div>Add graphs and stats here..</div>;
};

// HOOKS
const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

const useWindowDimensions = (debounceMs = 0) => {
  // dims in state
  const [dimensions, setDimensions] = React.useState(getWindowDimensions());

  // debounce
  const handleResize = () => {
    setDimensions(getWindowDimensions());
  };
  const debouncedHandleResize = debounce(handleResize, debounceMs);

  // effect to update via listener
  React.useEffect(() => {
    window.addEventListener('resize', debouncedHandleResize);

    return () => window.removeEventListener('resize', debouncedHandleResize); // cleanup
  }, []);

  // return values
  return dimensions;
};

//

const headerHeight = 50;
const footerHeight = 30;
const fixDoubleScroll = 5;

const DefaultView = () => {
  return (
    <div>
      <div style={{ background: 'pink', opacity: 0.5 }}>
        <div>
          <Switch>
            <Route
              exact
              path="/g/:id"
              render={(props) => (
                <MoviePage name={props.match.params.id} {...props} />
              )}
            />
            <Route path="/about" component={About} />
            <Route
              path="/test/:id"
              render={(props) => (
                <MoviePage name={props.match.params.id} {...props} />
              )}
            />
          </Switch>
        </div>
      </div>

      <Movies />
    </div>
  );
};

const App = () => {
  const { width, height } = useWindowDimensions();

  return (
    <div className="App">
      <AppHeader height={headerHeight} />
      {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header> */}

      <div className="App-toolbarAndContent">
        <AppToolbar />

        <div
          className="App-content"
          style={{ height: height - headerHeight - fixDoubleScroll }}
        >
          <Switch>
            <Route exact path="/" component={DefaultView} />
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

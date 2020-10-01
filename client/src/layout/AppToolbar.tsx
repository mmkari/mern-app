import * as React from 'react';
import { Link } from 'react-router-dom';
import 'layout/AppToolbar.css';

import Info from '@material-ui/icons/Info';
import TrackChanges from '@material-ui/icons/TrackChanges';

const links = [
  { link: 'info', icon: Info },
  { link: 'stats', icon: TrackChanges },
];

const AppToolbar = () => {
  return (
    <div className="AppToolbar">
      {links.map((link) => {
        //
        const IconComponent = link.icon;

        return (
          <Link
            key={`link-${link}`}
            className="AppToolbar-link"
            to={`/${link.link}`}
          >
            <IconComponent />
          </Link>
        );
      })}
    </div>
  );
};

export default AppToolbar;

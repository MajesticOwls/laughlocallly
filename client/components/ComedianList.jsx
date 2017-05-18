import React from 'react';
import ComedianListItem from './ComedianListItem.jsx';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ComedianProfile from '../containers/ComedianProfile.jsx';

const ComedianList = ({comedians}) => (
  <div className="container">
    <div className="comedianListHeader">
      <h2> Comedians For You </h2>
    </div>
    {comedians.map((obj) => (
        <ComedianListItem key={obj.id} item={obj} />
    ))}
  </div>
)

export default ComedianList




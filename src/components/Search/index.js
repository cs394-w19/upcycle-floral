import React, { Component } from 'react';
import './style.css';
import staticImage from '../../static/images/lily_static.jpeg';

const Search = () => (
  <div className="search">
    <h1>Search</h1>
    <input type='text' className="searchbar"/>
    <div className="button searchbut">
      <a class="searchmore" href="/"> Search </a>
    </div>
    <div className="button surpriseme">
      <a class="searchmore" href="/"> Surprise Me! </a>
    </div>
  </div>
);

export default Search;

import React from 'react';
import { Link } from 'react-router-dom';

const ManiNav = () => {
  return (
    <div>
      <Link to="/">Category List</Link>
      <br/>
      <Link to="/add-category">Add New Category</Link>
    </div>
  )
}

export default ManiNav

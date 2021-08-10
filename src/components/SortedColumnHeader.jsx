/* eslint-disable react/prop-types */
import React from 'react';
import { useLocation } from 'react-router';
import sortBoth from '../images/sort_both.png';
import sortAsc from '../images/sort_asc.png';
import sortDesc from '../images/sort_desc.png';

const SortedColumnHeader = ({ name }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  let sortImg = sortBoth;

  if (sortBy === name) {
    sortImg = sortOrder === 'asc'
      ? sortAsc
      : sortDesc;
  }

  return (
    <div className="sorted_column_img">
      {name}
      <img
        alt="sorted"
        src={sortImg}
        className="sorted_img"
      />
    </div>
  );
};

export default SortedColumnHeader;

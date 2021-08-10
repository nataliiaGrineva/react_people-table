/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';
import { useLocation } from 'react-router';
import classNames from 'classnames';
import './PeopleTable.scss';
import PersonRow from './PersonRow';
import SortedColumnHeader from './SortedColumnHeader';

const PeopleTable = ({ people, sortTable }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy');

  return (
    <table className="PeopleTable">
      <thead>
        <tr>
          <th
            onClick={event => sortTable('name')}
            className={classNames('column', 'column__sort', { column__selected: sortBy === 'name' })}
          >
            <SortedColumnHeader name="name" />
          </th>
          <th
            onClick={event => sortTable('sex')}
            className={classNames('column', 'column__sort', { column__selected: sortBy === 'sex' })}
          >
            <SortedColumnHeader name="sex" />
          </th>
          <th
            onClick={event => sortTable('born')}
            className={classNames('column', 'column__sort', { column__selected: sortBy === 'born' })}
          >
            <SortedColumnHeader name="born" />
          </th>
          <th
            onClick={event => sortTable('died')}
            className={classNames('column', 'column__sort', { column__selected: sortBy === 'died' })}
          >
            <SortedColumnHeader name="died" />
          </th>
          <th className="column">mother</th>
          <th className="column">father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(item => (
          <PersonRow key={item.slug} person={item} />
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;

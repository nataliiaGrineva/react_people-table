/* eslint-disable react/prop-types */
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import './PersonName.scss';

const PersonName = ({ person }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return (
    <NavLink
      to={`/people/${person.slug}?${searchParams.toString()}`}
      className={classNames({
        person_name__blue: person.sex === 'm',
        person_name__red: person.sex === 'f',
      })}
    >
      {person.name}
    </NavLink>
  );
};

export default PersonName;

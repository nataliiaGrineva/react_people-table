/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import { useParams, useLocation } from 'react-router';
import classNames from 'classnames';
import PersonName from './PersonName';
import './PersonRow.scss';

const PersonRow = ({ person }) => {
  const params = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy');
  const selected = params.personSlug === person.slug;

  return (
    <tr className={classNames('person_row', {
      person_row__selected: selected,
    })}
    >
      <td
        className={classNames({ column__selected: sortBy === 'name' && !selected })}
      >
        <PersonName person={person} />
      </td>
      <td
        className={classNames({ column__selected: sortBy === 'sex' && !selected })}
      >
        {person.sex}
      </td>
      <td
        className={classNames({ column__selected: sortBy === 'born' && !selected })}
      >
        {person.born}
      </td>
      <td
        className={classNames({ column__selected: sortBy === 'died' && !selected })}
      >
        {person.died}
      </td>
      <td>{(person.mother && <PersonName person={person.mother} />) || person.motherName}</td>
      <td>{(person.father && <PersonName person={person.father} />) || person.fatherName}</td>
    </tr>
  );
};

export default PersonRow;

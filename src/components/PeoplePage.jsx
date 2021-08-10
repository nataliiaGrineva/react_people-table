/* eslint-disable max-len */
/* eslint-disable no-console */
import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { getPeople } from '../api';
import PeopleTable from './PeopleTable';
import ErrorLoadingTable from './ErrorLoadingTable';
import './PeoplePage.scss';

const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const appliedQuery = searchParams.get('query') || '';
  const lowerQuery = appliedQuery.toLowerCase();
  const [query, setQuery] = useState(appliedQuery);
  const [loadingError, setLoadingError] = useState(false);

  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const loadPeople = () => {
    getPeople()
      .then((res) => {
        const peopleWithParents = res.map(item => ({
          ...item,
          mother: res.find(p => p.name === item.motherName) || null,
          father: res.find(p => p.name === item.fatherName) || null,
        }
        ));

        setPeople(peopleWithParents);
        setLoadingError(false);
      })
      .catch(() => {
        setLoadingError(true);
      });
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const applyQuery = useCallback(
    debounce((newQuery) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      history.push(`?${searchParams.toString()}`);
    }, 500),
    [],
  );

  const sortTable = (field) => {
    if (sortOrder === '') {
      searchParams.set('sortOrder', 'asc');
    }

    if (sortBy === field) {
      if (sortOrder === 'asc') {
        searchParams.set('sortOrder', 'desc');
      } else {
        searchParams.set('sortOrder', 'asc');
      }
    }

    searchParams.set('sortBy', field);
    history.push(`?${searchParams.toString()}`);
  };

  const handleQuery = (event) => {
    applyQuery(event.target.value);
    setQuery(event.target.value);
  };

  let visiblePeople = appliedQuery !== ''
    ? people.filter(person => person.name.toLowerCase().includes(lowerQuery)
      || (person.fatherName
        && person.fatherName.toLowerCase().includes(lowerQuery))
      || (person.motherName
        && person.motherName.toLowerCase().includes(lowerQuery)))
    : people;

  switch (sortBy) {
    case 'name':
    case 'sex':
      if (sortOrder === 'asc') {
        visiblePeople = visiblePeople.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
      } else {
        visiblePeople = visiblePeople.sort((a, b) => b[sortBy].localeCompare(a[sortBy]));
      }

      break;

    case 'born':
    case 'died':
      if (sortOrder === 'asc') {
        visiblePeople = visiblePeople.sort((a, b) => a[sortBy] - b[sortBy]);
      } else {
        visiblePeople = visiblePeople.sort((a, b) => b[sortBy] - a[sortBy]);
      }

      break;

    default:
      break;
  }

  console.log(loadingError);

  return (
    <>
      <h2>People page</h2>
      {/* <NewPerson people={people} /> */}
      <div className="add_btn_container">
        <Link
          to="/people/new"
          className="newPerson_btn"
        >
          ADD NEW PERSON
        </Link>
      </div>
      <div className="search_container">
        <input
          type="text"
          value={query}
          onChange={event => handleQuery(event)}
          className="search_input"
          placeholder="search"
        />
      </div>
      {loadingError
        ? (
          <ErrorLoadingTable onLoading={loadPeople} />
        ) : (
          <PeopleTable people={visiblePeople} sortTable={sortTable} />
        )
      }
    </>
  );
};

export default PeoplePage;

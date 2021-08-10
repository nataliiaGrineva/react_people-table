/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import classNames from 'classnames';
import './NewPerson.scss';
import { getPeople } from '../api';

const NewPerson = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [born, setBorn] = useState('');
  const [died, setDied] = useState('');
  const [motherName, setMotherName] = useState('');
  const [fatherName, setFatherName] = useState('');

  const [nameErr, setNameErr] = useState(false);
  const [sexErr, setSexErr] = useState(false);
  const [bornErr, setBornErr] = useState(false);
  const [diedErr, setDiedErr] = useState(false);
  const [motherErr, setMotherErr] = useState(false);
  const [fatherErr, setFatherErr] = useState(false);

  const [people, setPeople] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getPeople().then((res) => {
      setPeople(res);
    });
  }, []);

  let mothers = people.filter(person => person.sex === 'f');
  let fathers = people.filter(person => person.sex === 'm');

  const handleName = (event) => {
    const validName = event.target.value.replace(/[^\sA-Za-z]/g, '');

    setNameErr(false);
    setName(validName);
  };

  const handleSex = (event) => {
    setSex(event.target.value);
    setSexErr(false);
  };

  const handleBorn = (event) => {
    let validBorn = event.target.value.replace(/[^\d]/g, '');

    validBorn = validBorn.slice(0, 4);

    setBorn(validBorn);
    setBornErr(false);
    setMotherName('');
    setFatherName('');
  };

  const handleDied = (event) => {
    let validDied = event.target.value.replace(/[^\d]/g, '');

    validDied = validDied.slice(0, 4);

    setDied(validDied);
    setDiedErr(false);
  };

  const handleMother = (event) => {
    setMotherName(event.target.value);
    setMotherErr(false);
  };

  const handleFather = (event) => {
    setFatherName(event.target.value);
    setFatherErr(false);
  };

  const validateNewPerson = (newPerson) => {
    const date = new Date();
    const year = date.getFullYear();
    let errors = false;

    if (newPerson.name === '') {
      setNameErr(true);
      errors = true;
    }

    if (newPerson.sex === '') {
      setSexErr(true);
      errors = true;
    }

    if (+newPerson.born < 1400 || +newPerson.born > year) {
      setBornErr(true);
      errors = true;
    }

    if (+newPerson.died < 1400 || +newPerson.died > year
      || +newPerson.died - newPerson.born < 0
      || +newPerson.died - newPerson.born >= 150) {
      setDiedErr(true);
      errors = true;
    }

    if (newPerson.motherName === '') {
      setMotherErr(true);
      errors = true;
    }

    if (newPerson.fatherName === '') {
      setFatherErr(true);
      errors = true;
    }

    return !errors;
  };

  const addNewPerson = (event) => {
    event.preventDefault();

    const slug = `${name} ${born}`.toLowerCase().replace(/\s/g, '-');
    const newPerson = {
      name, sex, born, died, motherName, fatherName, slug,
    };

    if (validateNewPerson(newPerson)) {
      console.log('adding new person...');
      console.log(newPerson);
      // addPeople(newPerson);
      setName('');
      setSex('');
      setBorn('');
      setDied('');
      setMotherName('');
      setFatherName('');

      setSuccess(true);
      setTimeout(() => {
        history.push('/people');
      }, 3000);
    }
  };

  mothers = born.length === 4
    ? mothers.filter(mother => mother.died >= born)
    : mothers;
  fathers = born.length === 4
    ? fathers.filter(father => father.died >= born)
    : fathers;

  return (success
    ? (
      <div className="success_msg_container">
        <div className="success_msg">person added success</div>
      </div>
    ) : (
      <form
        className="add_new_person"
        autoComplete="off"
        onSubmit={addNewPerson}
      >
        <input
          type="text"
          name="name"
          placeholder="name"
          value={name}
          onChange={handleName}
          className={classNames('fieldText', { errorField: nameErr })}
        />
        <div className="error_message">
          {nameErr && (<span>Enter your name</span>)}
        </div>
        <div className={classNames('fieldSex', { errorField: sexErr })}>
          <label htmlFor="sex_m">Male</label>
          <input
            type="radio"
            name="sex"
            id="sex_m"
            value="m"
            checked={sex === 'm'}
            onChange={handleSex}
          />
          <label htmlFor="sex_f">Female</label>
          <input
            type="radio"
            name="sex"
            id="sex_f"
            value="f"
            checked={sex === 'f'}
            onChange={handleSex}
          />
        </div>
        <div className="error_message">
          {sexErr && (<span>Enter your sex</span>)}
        </div>
        <input
          type="text"
          name="born"
          placeholder="date born"
          value={born}
          onChange={handleBorn}
          className={classNames('fieldText', { errorField: bornErr })}
        />
        <div className="error_message">
          {bornErr && (<span>Enter correct year</span>)}
        </div>
        <input
          type="text"
          name="died"
          placeholder="date died"
          value={died}
          onChange={handleDied}
          disabled={born.length !== 4}
          className={classNames('fieldText', { errorField: diedErr })}
        />
        <div className="error_message">
          {diedErr && (<span>Enter correct year</span>)}
        </div>
        <select
          name="mothers"
          disabled={born.length !== 4}
          value={motherName}
          onChange={handleMother}
          className={classNames('fieldText', { errorField: motherErr })}
        >
          <option
            value=""
          >
            Choose the mother
          </option>
          {mothers.map(person => (
            <option
              key={person.slug}
              value={person.name}
            >
              {person.name}
            </option>
          ))}
        </select>
        <div className="error_message">
          {motherErr && (<span>choose mother</span>)}
        </div>
        <select
          name="fathers"
          disabled={born.length !== 4}
          value={fatherName}
          onChange={handleFather}
          className={classNames('fieldText', { errorField: fatherErr })}
        >
          <option
            value=""
          >
            Choose the father
          </option>
          {fathers.map(person => (
            <option
              key={person.slug}
              value={person.name}
            >
              {person.name}
            </option>
          ))}
        </select>
        <div className="error_message">
          {fatherErr && (<span>choose father</span>)}
        </div>
        <button type="submit">ADD</button>
      </form>
    ));
};

export default NewPerson;

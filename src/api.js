// import axios from 'axios';

// eslint-disable-next-line max-len
const PEOPLE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = () => (fetch(PEOPLE_URL)
  .then(response => response.json()));

// export const addPeople = async(newPerson) => {
//   try {
//     const addingPerson = await axios.post(PEOPLE_URL, newPerson);

//     return addingPerson;
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     console.warn(error);
//   }
// };

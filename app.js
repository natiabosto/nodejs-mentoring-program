const axios = require('axios');

function fetchData(url) {
  return new Promise((resolve, reject) => {
    axios
      .post(url)
      .then((response) => {
        console.log('first', response);
        return response.json();
      })
      .then((data) => {
        console.log('second', data);
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const blah = async () => {
  return await fetchData('https://date.nager.at/api/v3/CountryInfo/GE');
};

const bluh = blah();

console.log({ bluh });

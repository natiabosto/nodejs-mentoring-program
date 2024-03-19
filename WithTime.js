const MyEventEmitter = require('./MyEventEmitter');
const http = require('http');

class WithTime extends MyEventEmitter {
  async execute(asyncFunc, ...args) {
    try {
      this.emit('begin');
      const startTime = Date.now();
      const data = await asyncFunc(...args);
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;
      this.emit('data', data);
      this.emit('end');
      console.log(`Execution time: ${elapsedTime} ms`);
    } catch (error) {
      console.error('Error executing async function:', error);
      this.emit('error', error);
    }
  }
}

const fetchFromUrl = async (url) => {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(error);
          }
        });
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

module.exports = { WithTime, fetchFromUrl };

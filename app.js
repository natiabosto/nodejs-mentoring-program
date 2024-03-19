// Task 1

const MyEventEmitter = require('./MyEventEmitter');

const myEmitter = new MyEventEmitter();

function c1() {
  console.log('an event occurred!');
}

function c2() {
  console.log('yet another event occurred!');
}

myEmitter.on('eventOne', c1); // Register for eventOne
myEmitter.on('eventOne', c2); // Register for eventOne

// Register eventOnce for one time execution
myEmitter.once('eventOnce', () => console.log('eventOnce once fired'));
myEmitter.once('init', () => console.log('init once fired'));

// Register for 'status' event with parameters
myEmitter.on('status', (code, msg) => console.log(`Got ${code} and ${msg}`));

myEmitter.emit('eventOne');

// Emit 'eventOnce' -> After this the eventOnce will be
// removed/unregistered automatically
myEmitter.emit('eventOnce');

myEmitter.emit('eventOne');
myEmitter.emit('init');
myEmitter.emit('init'); // Will not be fired
myEmitter.emit('eventOne');
myEmitter.emit('status', 200, 'ok');

// Get listener's count
console.log(myEmitter.listenerCount('eventOne'));

// Get array of rawListeners//
// Event registered with 'once()' will not be available here after the
// emit has been called
console.log(myEmitter.rawListeners('eventOne'));

// Get listener's count after remove one or all listeners of 'eventOne'
myEmitter.off('eventOne', c1);
console.log(myEmitter.listenerCount('eventOne'));
myEmitter.off('eventOne', c2);
console.log(myEmitter.listenerCount('eventOne'));

// Task 2

const { WithTime, fetchFromUrl } = require('./WithTime');

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));
withTime.on('data', (data) => console.log('Data received:', data));
withTime.on('error', (error) => console.error('Error:', error));

withTime.execute(fetchFromUrl, 'http://jsonplaceholder.typicode.com/posts/1');

console.log(withTime.rawListeners('end'));

//  Task 3

const fs = require('fs');
const path = require('path');

const csvFilePath = path.join(__dirname, 'data.csv');
const txtFilePath = path.join(__dirname, 'output.txt');

const readStream = fs.createReadStream(csvFilePath, { encoding: 'utf-8' });
const writeStream = fs.createWriteStream(txtFilePath, { encoding: 'utf-8' });

readStream.on('data', (chunk) => {
  const lines = chunk.split(/\r?\n/);

  lines.forEach((line) => {
    const fields = line.split(',');

    const jsonData =
      JSON.stringify({
        Book: fields[0],
        Author: fields[1],
        Amount: parseInt(fields[2]),
        Price: parseFloat(fields[3]),
      }) + '\n';

    writeStream.write(jsonData, (err) => {
      if (err) {
        console.error('Error writing to TXT file:', err);
      }
    });
  });
});

readStream.on('error', (err) => {
  console.error('Error reading CSV file:', err);
});

writeStream.on('error', (err) => {
  console.error('Error writing to TXT file:', err);
});

console.log('Conversion process started...');

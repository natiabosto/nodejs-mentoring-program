const fs = require('fs');
const os = require('os');
const readline = require('readline');
const { stdin: input, stdout: output } = require('node:process');

const refreshRate = 100;
const logInterval = 1000 * 60;
const logFile = 'activityMonitor.log';

const executeCommand = require('./executeCommand');

const rl = readline.createInterface({ input, output });

function logProcessInfo(processInfo) {
  const logEntry = `${Date.now()} : ${processInfo}\n`;
  fs.appendFile(logFile, logEntry, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
}

async function main() {
  let processInfo = '';
  let command = '';

  if (os.platform() === 'win32') {
    command = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;
  } else {
    command = 'ps -eo comm,%cpu,%mem --sort=-%cpu | head -n 2 | tail -n 1';
  }

  setInterval(() => {
    processInfo && rl.write(null, { ctrl: true, name: 'u' });
    processInfo && rl.write(`Most CPU-intensive process: ${processInfo}`);
  }, refreshRate);

  setInterval(() => {
    processInfo && logProcessInfo(processInfo);
  }, logInterval);

  while (true) {
    processInfo = await executeCommand(command);
  }
}

main();

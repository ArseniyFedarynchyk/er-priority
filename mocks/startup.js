const chokidar = require('chokidar');
const { spawn } = require('child_process');
const treeKill = require('tree-kill');

let wiremockProcess = startWiremock();

chokidar
  .watch('./mocks', { ignoreInitial: true })
  .on('change', restartWiremock)
  .on('add', restartWiremock)
  .on('unlink', restartWiremock);

function startWiremock() {
  const process = spawn(
    'java -jar ./mocks/wiremock-jre8-standalone-2.35.0.jar --root-dir="./mocks" --enable-stub-cors',
    {
      shell: true,
    },
  );

  process.stdout.on('data', data => console.log(data.toString()));

  return process;
}

function restartWiremock() {
  console.log('Restarting wiremock... \n');

  treeKill(wiremockProcess.pid);
  wiremockProcess = startWiremock();
}

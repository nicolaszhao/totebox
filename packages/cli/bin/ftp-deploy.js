#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const util = require('util');
const ora = require('ora');
const chalk = require('chalk');
const ini = require('ini');
const client = require('scp2');
const inquirer = require('inquirer');

const cwd = process.cwd();
const CONFIG_NAME = '.ftpdeployconfig';
const CONFIG_PATH = path.join(cwd, CONFIG_NAME);
const scp = util.promisify(client.scp);

async function run(config) {
  const {
    username, password, host, port,
  } = config;
  let { from, to } = config;
  let time = Date.now();

  from = path.resolve(from);

  if (!to.startsWith('/')) {
    to = `/${to}`;
  }
  if (!to.endsWith('/')) {
    to = `${to}/`;
  }

  const { checked } = await inquirer.prompt([{
    type: 'confirm',
    name: 'checked',
    message: `Is the remote path ${chalk.yellow(`"${to}"`)} right?`,
    default: true,
  }]);

  if (!checked) {
    process.exit(1);
  }

  const spinner = ora();
  spinner.start('Uploading files...');

  try {
    await scp(from, {
      host,
      port,
      username,
      password,
      path: to,
    });
    time = ((Date.now() - time) / 1000).toFixed(2);
    spinner.succeed(`All files uploaded successfully in ${chalk.yellow(time)}s!`);
  } catch (err) {
    spinner.fail(`Deploy failed! Error: ${chalk.red(err.message)}.`);
  }
}

function getDeployConfig() {
  try {
    return ini.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
  } catch (err) {
    return null;
  }
}

function checkDeployConfig(config) {
  return 'username password host port from to'.split(' ')
    .every((key) => config[key]);
}

const config = getDeployConfig();

if (!config) {
  console.error(`Missing configuration file: ${chalk.red(`"${CONFIG_NAME}"`)}`);
  process.exit(1);
}

if (!checkDeployConfig(config)) {
  console.error(
    `Missing configuration field(s), complete sample:

    ${chalk.blue('username')} = username
    ${chalk.blue('password')} = password
    ${chalk.blue('host')} = host
    ${chalk.blue('port')} = port
    ${chalk.blue('from')} = dist
    ${chalk.blue('to')} = /data/awesome_project/
    `,
  );
  process.exit(1);
}

run(config);

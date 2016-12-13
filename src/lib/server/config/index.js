import Configstore from 'configstore';
import inquirer from 'inquirer';
import ReadPkgUp from 'read-pkg-up';
import prompts from './setup-prompts';

class ServerConfig {

  static DEFAULTS = {
    'clientData': null,
    'clusterWorkerCount': 1,
    'isFirstRun': true,
    'serverPort': '3000'
  };

  constructor(defaults = this.constructor.DEFAULTS) {
    const { pkg } = ReadPkgUp.sync();
    this.db = new Configstore(pkg.name, defaults);
  }

  get isFirstRun() {
    return this.db.get('isFirstRun');
  }

  verify() {
    const promise = this.isFirstRun ? this.prompt() : Promise.resolve();
    return promise.then(function() {
      // TODO: Verify the actual configuration and bail out when needed
    });
  }

  prompt() {
    console.log('> Preparing initial setup\n');

    return inquirer.
      prompt(prompts).
      then((answers) => {
        Object.keys(answers).map(key => {
          return this.db.set(key, answers[key]);
        });

        this.db.set('isFirstRun', false);

        console.log('\n> Setup finished!');

        return true;
      });
  }
}

export default new ServerConfig();

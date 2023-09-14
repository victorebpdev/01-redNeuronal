import colors from 'colors';
import  {exit, inquirerMenu, readInput,  confirm, }  from './helpers/inquirer.js';
import NeuralNetwork from './classes/redNeuronal.js';
console.clear();
const main = async() => {
    let opt = '';
    do{
      opt = await inquirerMenu();
      switch (opt) {
        case '1':
          const NNetwork = new NeuralNetwork();
            console.log('test',NNetwork);
          break;
      }
      await exit();

    }while( opt !== '0');

}
main();
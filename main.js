import colors from 'colors';
import  {exit, inquirerMenu, readInput,  confirm, }  from './helpers/inquirer.js';
import NeuralNetwork from './classes/redNeuronal.js';
console.clear();
const main = async() => {
    let opt = '';
    do{
      opt = await inquirerMenu(2);
      switch (opt) {
        case '1':
          const NNetwork = new NeuralNetwork();
          NNetwork.beginTraining()
          let arr = NNetwork.results;      
          let data = arr[arr.length -1]
          console.log('data:',data);
         
          break;
      }
      await exit();

    }while( opt !== '0');

}
main();
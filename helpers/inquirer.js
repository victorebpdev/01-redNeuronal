import inquirer  from 'inquirer';
import colors from 'colors';
import  menu1  from '../menus/menu1.js';
import  menu2  from '../menus/menu2.js';
const questions = [];
const setMenu = (opcion)=>{ 
    switch (opcion) {
        case 1:
            questions[0] = menu1
            break;
        case 2: 
            questions[0]  = menu2
            break;
        default:
            questions[0]  = menu1
            break;
    }

}

const inquirerMenu = async (opcion) => {
    setMenu(opcion);
    console.clear();
    console.log('======================'.green);
    console.log('Choose an option'.green);
    console.log('======================\n'.green);
    
    const { option } = await inquirer.prompt(questions);
    
    return option;
};

const exit = async() => {
    const questions = [
        {
            type:'list',
            name:'option',
            message:` \nPress ${'ENTER'.green} to continue`,
            choices: [
                {
                    value: '1',
                    name: '1. ENTER'
                },
            ]
        }
    ];

    console.log('\n');
    await inquirer.prompt(questions);
  
}

const readInput = async( message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if( value.length === 0 ){
                    return 'Please enter a value';
                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.prompt(question);
    return desc;
}



const confirm = async( message ) => {
    const question = [
        {
            type:'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(question);
    return ok;

}


export {
    inquirerMenu,
    exit,
    readInput,
    confirm,
    setMenu
}
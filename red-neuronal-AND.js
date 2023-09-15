import colors from 'colors';
import  {exit, inquirerMenu, readInput,  confirm, }  from './helpers/inquirer.js';

console.clear();

/**
 * El siguiente codigo corresponde al entrenamiento de una red neuronal monocapa quei
 * imita el comportamiento de una compuerta Logica AND; por lo que los datos a tratar son
 * los siguientes y corresponde a su tabla de verdad:
 * datos:[[1,1],[1,0],[0,1],[0,0]]
 * Salida deseada: [1,0,0,0]
 * 
 */

const datosI = [[1,1],[1,0],[0,1],[0,0]];
const ouputD = [1,0,0,0];
let outputC = 0;
const sesgo = 0.25;
let umbral = 0.24;
let bUmbral =0.0;
let gw1 = 0.0;
let gw2 = 0.0;
let error = 0.0;
let totalErrores=0;
let resultados = [];
let iteracion = 0;
let ciclo = 0;
let correccion = 0;
let data= [];
let deltaX1 = 0.0;
let deltaX2 = 0.0;
// console.log(`DatosI 1,1: ${datosI[1][0]}`)

const main = async() => {
    let opt = '';

    do{

      opt = await inquirerMenu(1);
      switch (opt) {
        case '1':
            const desc = await readInput('Pesos(0.1,0.2): ');
            trainningW(desc)
          break;
        case '2':
           trainning()     
          break;   
        case '3':
           correction()       
          break;   
        case '4':
           results()       
          break;     
        case '5':
           saveData()       
          break;     
      }
      await exit();

    }while( opt !== '0');


}

const trainningW = (strWeights)=>{
    const split = strWeights.split(',');
    
    let w1 = parseFloat(split[0]);
    let w2 = parseFloat(split[1]);
    
    gw1 = w1;
    gw2 = w2;

    let x1 = datosI[iteracion][0];
    let x2 = datosI[iteracion][1];
     deltaX1 = fx(x1);
     deltaX2 = fx(x2)
    let y = GetY(w1,w2,x1,x2);
    let newError = ouputD[iteracion] - y
    error = newError;   
    let newUmbral = umbral- sesgo * (error)
    let resultado = {
        'Ciclo': ciclo,
        'Iteracion': iteracion,
        'Correccion': correccion,
        'x1':x1,
        'x2':x2,
        'w1':w1,
        'w2':w2,
        'deltaX1':deltaX1,
        'deltaX2':deltaX2,
        'umbral':umbral,
        'bUmbral':bUmbral,
        'sesgo':sesgo,
        'D':ouputD[iteracion],
        'Y':y,
        'newError':newError,
        'outputPerseptron':outputC,
        'newUmbral': newUmbral,
        'error':error,
        'datosI.length':  datosI.length
    }
    resultados.push(resultado);
    console.log('======== Resultados ======== \n iteracion:',iteracion, '\n datos: ',resultado)
}

const trainning = ()=>{
  if (error != 0){
    console.log('Utilice opcion 3, Existe un error al entrenar red')
    return;
  }

  iteracion++;
  if (iteracion > datosI.length - 1 ){
    iteracion = 0;
    ciclo++;
  }
  let w1 = gw1
  let w2 = gw2;

  let x1 = datosI[iteracion][0];
  let x2 = datosI[iteracion][1];
  let y = GetY(w1,w2,x1,x2);
  let newError = ouputD[iteracion] - y
  error = newError; 
  deltaX1 = fx(x1);
  deltaX2 = fx(x2)
  let newUmbral = umbral- sesgo * (error)
  if (error != 0){
    bUmbral = umbral;
    umbral = newUmbral;
    totalErrores++;
  }
  let resultado = {
      'Ciclo': ciclo,
      'Iteracion': iteracion,
      'Correccion': correccion,
      'x1':x1,
      'x2':x2,
      'w1':w1,
      'w2':w2,
      'deltaX1':deltaX1,
      'deltaX2':deltaX2,
      'umbral':umbral,
      'bUmbral':bUmbral,
      'sesgo':sesgo,
      'D':ouputD[iteracion],
      'Y':y,
      'newError':newError,
      'outputPerseptron':outputC,
      'newUmbral': newUmbral,
      'error':error,
      'datosI.length':  datosI.length
  }
  resultados.push(resultado);
  console.log('======== Resultados ======== \n iteracion:',iteracion, '\n datos: ',resultado)
}

const correction = ()=>{

  if (error == 0){
    console.log('No existe error en el proceso elija opcion 2')
    return;
  }
  let w1 = gw1 + deltaX1;
  let w2 = gw2 + deltaX2;

  gw1 = w1;
  gw2 = w2;

  correccion ++;
  let x1 = datosI[iteracion][0];
  let x2 = datosI[iteracion][1];
  let y = GetY(w1,w2,x1,x2);
  let newError = ouputD[iteracion] - y
  error = newError;   
  let newUmbral = umbral- sesgo * (error)
  let resultado = {
      'Ciclo': ciclo,
      'Iteracion': iteracion,
      'Correccion': correccion,
      'x1':x1,
      'x2':x2,
      'w1':w1,
      'w2':w2,
      'deltaX1':deltaX1,
      'deltaX2':deltaX2,
      'umbral':umbral,
      'bUmbral':bUmbral,
      'sesgo':sesgo,
      'D':ouputD[iteracion],
      'Y':y,
      'newError':newError,
      'outputPerseptron':outputC,
      'newUmbral': newUmbral,
      'error':error,
      'datosI.length':  datosI.length,
  }
  // iteracion = iteracion+1;

  resultados.push(resultado);
  console.log('======== Resultados ======== \n iteracion:',iteracion, '\n datos: ',resultado)
}
const results = ()=> {
  console.log('==========  Resultados  =========','\n', resultados, '\noutputC', outputC)
}

const fx= (value)=>{
  let x = sesgo * error * value
  return (x == -0)? Math.abs(x):x;
}

const GetY= (w1,w2,x1,x2)=>{
  let y = parseFloat(((w1*x1)+(w2*x2) - umbral).toFixed(2));
  outputC =y; 
  return (y>= 0)? 1:0
}

main();
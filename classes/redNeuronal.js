import Perceptron from "./perceptron.js";

class NeuralNetwork {
    constructor(){
        this.datosI = [[1,1],[1,0],[0,1],[0,0]];
        this.outpuD = [1,0,0,0];        
        this.ciclo = 0;
        this.correccion=0;
        this.perceptron = new Perceptron();
        this.delta1=0.0;
        this.delta2=0.0;
        this.error= 0;
        this.saves= []
    }
    beginTraining(){
        console.log('class NeuralNetwork', this.NeuralNetwork)
    };

    correction(){

    }
    #Fx(value){
        let x =  this.perceptron.sesgo * error * value
        return (x == -0)? Math.abs(x):x;
    } 
    #GetY(){

    }
}

export default NeuralNetwork
import Perceptron from "./perceptron.js";

class NeuralNetwork {
    constructor(){
        this.datosI = [[1,1],[1,0],[0,1],[0,0]];
        // this.datosI = [[0,0],[0,1],[1,0],[1,1]];

        this.outpuD = [1,0,0,0];        
        // this.outpuD = [0,0,0,1];        
        this.ciclo = 0;
        this.iteracion = 0;
        this.correccion = 0;
        this.perceptron = new Perceptron();
        this.delta1 = 0.0;
        this.delta2 = 0.0;
        this.error = 0;
        this.saves = {
            'w1':0.0,
            'w2':0.0,
            'umbral':0.0,
            'lastUmbralBeforeChange':0.0
        };
        this.outputC= 0.0;
        this.results=[];
    }
    beginTraining(){        
        let i=0;
        while(true){
            if(i >=10){
                return this;
            }
           for (let j = 0; j < this.datosI.length  ; j++) {
            
            let xi1 = this.datosI[j][0];
            let xi2 = this.datosI[j][1];
          
            let w1 = this.perceptron.w1;
            let w2 = this.perceptron.w2;
            this.perceptron.y = this.#GetY(w1,w2,xi1,xi2, this.perceptron.umbral);
     
            this.error = this.outpuD[j] - this.perceptron.y;
            // console.log('Deseado:',this.outpuD[j],
            //             '(Y):',this.perceptron.y,
            //             'ERROR:',this.error,'ciclo:',i
            //             ,'iteracion:',j)
            this.delta1 = this.#Fx(xi1); // depende del error 
            this.delta2 = this.#Fx(xi2); // depende del error

            this.perceptron.umbral = this.perceptron.umbral - this.perceptron.sesgo *  (this.error);
            if(this.error != 0){
                this.correction(w1,w2,xi1,xi2,this.outpuD[j]);               
                this.perceptron.w1= this.saves.w1;
                this.perceptron.w2= this.saves.w2;              
            }
            this.iteracion =j;
            let results= {
                'perceptron': this.perceptron,
                'saves': this.saves,
                'd1':this.delta1,
                'd2':this.delta2,
                'iteraciones':this.iteracion,
                'ciclos': this.ciclo,
                'D':this.outpuD[j],
                'error': this.error,
                'correcciones':this.correccion,
    
            }
            this.results.push(results);
        } 
        i++;           
        this.ciclo = i;
        }       
    };

    correction(w1,w2,x1,x2,D){
        this.saves.w1 = w1 + this.delta1;
        this.saves.w2 = w2 + this.delta2;
        this.saves.lastUmbralBeforeChange = this.perceptron.umbral;
        this.correccion++;
        this.perceptron.y = this.#GetY(w1,w2,x1,x2, this.perceptron.umbral);
        let newError = D - this.perceptron.y
        this.error = newError;   
        this.perceptron.umbral =  this.perceptron.umbral -  this.perceptron.sesgo  * (newError)               
        
        this.saves.umbral =  this.perceptron.umbral;
       
    }
    #Fx(value){
        let x =  this.perceptron.sesgo * this.error * value;
        return (x == -0)? Math.abs(x):x;
    } 
    #GetY(w1,w2,x1,x2,umbral){
        // let umbral = this.perceptron.umbral
        let y = parseFloat(((w1*x1)+(w2*x2) - umbral).toFixed(2));
        this.outputC = y; 
        return (y>= 0)? 1:0
    }
}

export default NeuralNetwork
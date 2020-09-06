export default class Util {
    constructor() {}

    generateNumber(n: number): number {
        
            var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   
    
            if ( n > max ) {
                    return this.generateNumber(max) + this.generateNumber(n - max);
            }
    
            max        = Math.pow(10, n+add);
            var min    = max/10; // Math.pow(10, n) basically
            var number = Math.floor( Math.random() * (max - min + 1) ) + min;
    
            return parseInt(("" + number).substring(add)); 
    
    }
}
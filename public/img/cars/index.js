import fs from "fs";


const arrDir = fs.readdirSync('./');
// console.log(arrDir);
function lovefunc(flower1, flower2){
    // moment of truth
    return (!(flower1%2) && flower2%2)||(flower1%2 && !(flower2%2))? true :false; 
  }
console.log(lovefunc(1, 4));
console.log(lovefunc(0,0))
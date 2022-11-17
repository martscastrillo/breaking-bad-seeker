
function handelClickResult(){
    console.log(arrayev);
    for (const number of arrayev) {
       if(number>arrayLength){
        console.log(`El número de resultados es ${arrayLength} y es menor que ${number}.`);
       }
       else{
        console.log(`El número de resultados es ${arrayLength} y es mayor que ${number}.`);
       }
    }
}

searchResult.addEventListener('click', handelClickResult)
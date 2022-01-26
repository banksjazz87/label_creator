/**
 * 
 * @param {*} value 
 * @returns string of the value that it is given, with a comma placed in the correct location.
 */
 const commaPlacer = (value) => {
    let finalValue;
    let valueString = value.toString();
  
    if(value.length <= 3){
      finalValue = valueString;
  
    }else{
      let arrOfValue = valueString.split("");
      let lastThree = arrOfValue.slice(arrOfValue.length - 3);
      let arr = [];
  
      while(arrOfValue.length > 3){
        let joinThree = lastThree.join('');
        arr.unshift(joinThree);
        arrOfValue.splice(arrOfValue.length - 3, 3);
      }
  
      let joinFirstDigits = arrOfValue.join('');
      arr.unshift(joinFirstDigits);
      finalValue = arr.join(',');  
    }
  
    return finalValue;
  }

  export default commaPlacer;
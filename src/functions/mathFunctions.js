const MathFunctions = {
  /**
 * 
 * @param {*} value 
 * @returns removes all commas and returns a number with all of the trailing zeroes.
 */
  numOrNot: function(value) {
    let copyOfValue = value;

    while(copyOfValue.indexOf(',') > -1){
      
      let indexOfComma = copyOfValue.indexOf(',');
      let firstHalf = copyOfValue.slice(0, indexOfComma);
      let lastHalf = copyOfValue.slice(indexOfComma + 1, value.length);

      copyOfValue = firstHalf + lastHalf;
    }
    

    let finalNum = parseInt(copyOfValue);
    console.log(finalNum);

    return finalNum;
  },

/**
 * 
 * @param {*} value 
 * @returns string of the value that it is given, with a comma placed in the correct location.
 */
  commaPlacer: function(value){
    let finalValue;
    let valueString = value.toString();
  
    if(value.length <= 3){
      finalValue = valueString;
  
    }else{
      let arrOfValue = valueString.split("");
      let arr = [];
  
      while(arrOfValue.length > 3){

        let lastThree = arrOfValue.slice(arrOfValue.length - 3);
        let joinThree = lastThree.join('');

        arr.unshift(joinThree);
        arrOfValue.splice(arrOfValue.length - 3, 3);

      }
  
      let joinFirstDigits = arrOfValue.join('');
      arr.unshift(joinFirstDigits);
      finalValue = arr.join(',');  
    }
  
    return finalValue;

    },
  
  //Function to get the total number of cartons and the total qty.
  total: function(itemsClassName){
    const items = document.getElementsByClassName(itemsClassName);
    
    let currentTotal = 0;

    for(let i = 0; i < items.length; i++){
    
      let currentItem = MathFunctions.numOrNot(items[i].value);

      currentTotal = currentTotal + currentItem;
    }

    return MathFunctions.commaPlacer(currentTotal);
  },

  //Loops over a string and returns all numbers
  numbers: function(str){

    let arr = [];

    for(let i = 0; i < str.length; i++){
      if(isNaN(str[i]) === false){
        arr.push(str[i]);
      }
    }
    return arr.join('');
  }
}

export default MathFunctions;
import MathFunctions from "../functions/mathFunctions.js";

const NoDuplicates = {
  skidText: function (arr, itemNum, obj) {
    let text = "";

    arr[itemNum].numOfCartons > 1
      ? (text = `${arr[itemNum].numOfCartons} Cartons @ ${arr[itemNum].qtyPerCarton} (${obj.packageUnit} @ ${arr[itemNum].packsRolls})`)
      : (text = `${arr[itemNum].numOfCartons} Carton @ ${arr[itemNum].qtyPerCarton} (${obj.packageUnit} @ ${arr[itemNum].packsRolls})`);

    return text;
  },

  //returns an array of objects with a cartonText field added to it. All duplicate items with the same name are conoslidated to one object.
  checkForDuplicateItems: function (newArr, obj) {
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].cartonText = NoDuplicates.skidText(newArr, i, obj);

      if (newArr[i + 1]) {
        let j = i + 1;

        while (j < newArr.length) {
          if (newArr[i].itemDescription === newArr[j].itemDescription) {
            newArr[i].cartonText =
              newArr[i].cartonText +
              " " +
              NoDuplicates.skidText(newArr, j, obj);

            let sum =
              MathFunctions.numOrNot(newArr[i].qtyShipped) +
              MathFunctions.numOrNot(newArr[j].qtyShipped);

            newArr[i].qtyShipped = MathFunctions.commaPlacer(sum);
            newArr.splice(j, 1);
          } else {
            j++;
          }
        }
      }
    }
    return newArr;
  },
};

export default NoDuplicates;

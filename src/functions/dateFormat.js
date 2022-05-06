//Function to change the format of the date
const changeDateFormat = (str) => {
  let month = str[5] + str[6];
  let day = str[str.length - 2] + str[str.length - 1];
  let year = str.slice(0, 4);

  let date = `${month}/${day}/${year}`;
console.log('fart for brains');
  return date;
};

export default changeDateFormat;

//Used in production mode
//async function using fetch to retrieve the data from the server
const serverCall = async (url) => {
  const response = await fetch(
    //"http://localhost:4500/allData"
    url
  );

  try {
    let updatedRes = await response.json();

    //this was commented out
    //userDataFromCreator = updatedRes;
    console.log(updatedRes);
    return updatedRes;

  } catch (e) {
    console.log("error", e);
  }
};

export default serverCall;
//Used in production mode
//async function using fetch to retrieve the data from the server
const serverCall = async (url) => {
  const response = await fetch(url);

  try {
    let updatedRes = await response.json();
    return updatedRes;
  } catch (e) {
    console.log("error", e);
  }
};

export default serverCall;

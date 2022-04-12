/**
 * 
 * @param {*} url 
 * @param {*} data 
 * @returns sends an HTTP post request to whatever url is specified and posts whatever data is supplied as the second parameter.
 */

 const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json', 
      }, 
      redirect: 'follow', 
      referrerPolicy: 'no-referrer', 
      body: JSON.stringify(data)
    });
  
    return response.json();
  }

  export default postData;
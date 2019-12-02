const axios = require('axios');
 
const instance = axios.create({
    baseURL: 'https://testvm2.frontdesk.ai'
  });
// Make a request for a user with a given ID

const getBusinessData =()=>{
    return instance.get('/business?query=504318@15')
    .then(function (response) {
      // handle success
      console.log(response);
       return response;
      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return error;
    })
    .finally(function () {
      // always executed
    });
}

export {getBusinessData};
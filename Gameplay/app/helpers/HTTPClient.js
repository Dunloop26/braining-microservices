const HTTPClient = module.exports;
const axios = require('axios');



HTTPClient.post = (url, data, headers=undefined) => {
     
      let config = {
        url: url,
        method: "post",
        data: data,
        withCredentials: true
      }

      if (headers){
        config["headers"] = headers;
      }

      return axios(config)
      .then(function (response) {
        //console.log(response, 5555555555999999999999999999999999999999999);
        return response;
        
      })
      .catch(function (error) {
        //console.log(error, 11111111119999999999999999999999999999999);
        throw error;
      });
    }


HTTPClient.get = (url, headers=undefined) => {
     
      let config = {
        url: url,
        method: "get",
        withCredentials: true
      }

      if (headers){
        config["headers"] = headers;
      }

      return axios(config)
      .then(function (response) {
        //console.log(response, 5555555555999999999999999999999999999999999);
        return response;
        
      })
      .catch(function (error) {
        //console.log(error, 11111111119999999999999999999999999999999);
        throw error;
      });
    }
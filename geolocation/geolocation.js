const opencage = require('opencage-api-client');
const chalk = require('chalk');
const f = require('../app');
const key = require('../config').geocodeKey;


//exports a function that return lat and lng as callback and Promise
module.exports = (address, cb = ()=>{}) => {

  return new Promise((resolve, reject) => {

    opencage.geocode({q: address, key: key}).then(data => {
      
      if (data.total_results != 0) {          
          
        if (data.status.code == 200) {
          if (data.results.length > 0) {
            var place = data.results[0];          
            resolve(place);
            return cb(null, place); 
          }
  
        } else if (data.status.code == 402) {        
          reject('You hit free-trial daily limit');
          return cb('You hit free-trial daily limit'); 
        } else {        
          console.log('error', data.status.message);
          reject(data.status.message);
          return cb(data.status.message);
        }

      } else {
        //if adrress was not found a message pops and the primary function invokes
        console.log(chalk.red('You typed wrong address.. Try again'));
        f.f();        
      }

    }).catch(error => {
      
      reject(error.message);
      return cb(error.message);
    });

  });
}









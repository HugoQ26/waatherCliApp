const rp = require('request-promise-native');
const key = require('../config.js').darkskyKey;

//exports a function that return weather forcast as callback and Promise
module.exports = (lat, lng, cb =()=>{}) => {

    return new Promise((resolve, reject) => {
        
        const options = {
            uri: `https://api.darksky.net/forecast/${key}/${lat},${lng}?lang=pl&units=ca`,    
            json: true // Automatically parses the JSON string in the response
        };
        
        rp(options)
            .then((data) => {
                resolve(data);
                return cb(null, data);
            })
            .catch(function (err) {                                
                reject(err);
                return cb(err);                
            });

    });

} 



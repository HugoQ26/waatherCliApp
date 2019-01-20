const inquirer = require('inquirer');
const chalk = require('chalk');

const place = require('./geolocation/geolocation');
const weather = require('./weather/weather');

const f = () => {
  //prompt user for city or postal code and return answer as 'answer' object
  inquirer
    .prompt([{
      name: 'spot',  
      type: 'input',
      message: chalk.yellow('Type city name or postal code..'),
      default: 'Opole'
    }    
    ])
    .then(answers => {    


      const all = (async() => {  
          try {  

            //get lat i lng of typed adrress and formated name          
            const { geometry, formatted } = await place(answers.spot);            
            const {lat, lng} = geometry;

            //get weather from lat and lng 
            const weath = await weather(lat, lng);
            
            //format the result
            const temp = weath.currently.temperature < 0 ? chalk.cyan('temp:') : chalk.yellow('temp:');
            const tempapp = weath.currently.apparentTemperature > weath.currently.temperature ? chalk.red('temp:') : chalk.blue('temp:');
            const str1Length = weath.daily.summary.length;    
            let str = '';
            for(let i = 0; i < str1Length; i++) {
              str += '*';              
            }    
            console.log(chalk.grey(str));            
            console.log(`Pogoda dla ${chalk.green(formatted)}`);    
            console.log(`${chalk.cyan('Pogoda teraz:')} ${weath.currently.summary}, ${temp} ${weath.currently.temperature}, odczuwalna ${tempapp} ${weath.currently.apparentTemperature}`);    
            console.log(`${weath.hourly.summary}`);    
            console.log(`${weath.daily.summary}`);              
            console.log(chalk.grey(str));
            

            //function recall to loop qestion    
            f();

          } catch (error) {
            console.log(error);          
          }              
  
      })();
    });
}

f();



module.exports.f = f;






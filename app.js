const readline = require('readline');
const chalk = require('chalk');


const place = require('./geolocation/geolocation');
const weather = require('./weather/weather');

const f = () => {
  //prompt user for city or postal code and return answer as 'answer' object
      
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  

  rl.question('Type city or postal code...', (answers) => {
    // TODO: Log the answer in a database
    console.log(`Thank you`);
  

    const all = (async() => {  
      try {  

        //get lat i lng of typed adrress and formated name          
        const { geometry, formatted } = await place(answers);            
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

    rl.close();
  });

      
    
}

f();



module.exports.f = f;






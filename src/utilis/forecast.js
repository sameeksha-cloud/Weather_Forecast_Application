const request = require('request')

const forecast = (longitutde,latitude,callback) =>{
const url = 'http://api.weatherstack.com/current?access_key=48f53e83c7fdb239595a4c5e8550b7f2&query=' + longitutde +','+ latitude +'&units=f'
 request({url,json:true},(error,{ body }) =>{
   if(error){
      callback("Unable to connect to weather service.",undefined)
   }
   else if(body.error){
      callback("Unable to get the location.",undefined)
   }else{
    callback(undefined ,body.current.weather_descriptions+ ". It is currently " + body.current.temperature + " degree out. It feels like "+body.current.feelslike+" degrees out.")
 }})

}
module.exports=forecast
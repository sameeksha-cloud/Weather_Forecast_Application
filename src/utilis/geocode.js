const { response } = require('express')
const request = require('request')

const geocode = (address,callback) =>{
    const url = 'https://api.openweathermap.org/geo/1.0/direct?q='+address+'&limit=1&appid=380caa3ecf85f54550efd299c5cdaac6'
    request({url,json:true},(error,{ body }) => {
        //console.log(response.body)
       if(error){
         callback("Unable to connect to geocode service.",undefined)
       }
       else if(body[0] == undefined){
          callback("Unable to connect to geocode service response.",undefined)
       }
       else{
          callback(undefined,{
          latitude:body[0].lat,
          longitude:body[0].lon,
          place:[body[0].state,body[0].name,(body[0].country)].join(',')
          }
       )
    }
    })
    }



// geocode('lucknow',(error,response) => {
//    console.log(error)
//    console.log(response)
// })
module.exports= geocode
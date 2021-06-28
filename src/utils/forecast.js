const request = require('postman-request')
const { url } = require('inspector')
const { builtinModules } = require('module')

const forecast = (longitude , latitude, callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=853d18c08843da5827a8df6fc199a97e&query="+ encodeURIComponent(latitude)+","+encodeURIComponent(longitude)

     request({url, json: true}, (error, {body}) =>{
        if(error){
            callback("Unable to connect to weather service!")
        }else if(body.error){
            callback("Unable to find location")
        }else{
            const act_temp = body.current.temperature
            const app_temp = body.current.feelslike
            const humidity = body.current.humidity
            callback(undefined,body.current.weather_descriptions[0]+ ". It is currently "+act_temp+" degrees out. It feels like "+ app_temp+" degrees out. There is "+ body.current.precip +" probability of precipitation. The humidity is "+ humidity + "%.")
        }
        
    })

    
}
module.exports = forecast
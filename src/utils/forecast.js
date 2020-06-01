const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=68dffdef73b3bb511c2129635d00962e&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('UNABLE TO CONNECT TO WEATHER SERVICES', undefined)
        } else if (body.error) {
            callback('UNABLE TO FIND LOCATION', undefined)
        } else {
            callback(undefined,'It is currently ' + body.current.temperature + ' degress out. Feels like ' 
            + body.current.feelslike + '. There is a ' + body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast

// const url = 'http://api.weatherstack.com/current?access_key=68dffdef73b3bb511c2129635d00962e&query=32.7157,-117.1610&units=f'

// request({ url: url, json: true }, (error, response) => {

//     if (error) {
//         console.log('UNABLE TO CONNEC T TO WEATHER SERVICES')
//     } else if (response.body.error) {
//         console.log('UNABLE TO FIND LOCATIONS')
//     } else {
//         console.log(response.body.location.name + ', ' + response.body.location.region  + '. ' + response.body.current.weather_descriptions +
//         '. It is currently ' + response.body.current.temperature + ' degress out. Feels like ' 
//         + response.body.current.feelslike + '. There is a ' + response.body.current.precip + '% chance of rain.')
//     }

// })
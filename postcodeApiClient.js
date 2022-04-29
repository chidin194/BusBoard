const request = require("request");
const {getLiveArrivalPredictions} = require('./tflApiClient');

const validatePostcode = (postCode) => {

    return new Promise((resolve, reject) => {
        request(`https://api.postcodes.io/postcodes/${postCode}/validate`, function (error, response, body) {
                if (response.statusCode === 200 & !error) {
                    const result = JSON.parse(body).result;
                    resolve(result)
                } else {
                    reject(Error("Unable to complete request"))
                }
            }
        )
    })
}

const fetchPostCodeCoordinates = (postCode) => {

        return new Promise((resolve, reject) => {
            request(`https://api.postcodes.io/postcodes?q=${postCode}`, function (error, response, body) {
                if (response.statusCode === 200 && !error) {
                    const postcodeInfo = JSON.parse(body);
                    const coordinates = [postcodeInfo.result[0].latitude, postcodeInfo.result[0].longitude]
                    resolve(coordinates)
                } else {
                    reject(Error("Unable to complete request"))
            }
        })
        })
}

module.exports = {fetchPostCodeCoordinates}
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
                if (response.statusCode === 200 & !error) {
                    const postcodeInfo = JSON.parse(body);
                    const coordinates = [postcodeInfo.result[0].latitude, postcodeInfo.result[0].longitude]
                    resolve(coordinates)
                } else {
                    reject(Error("Unable to complete request"))
            }
        })
        })
}

async function getPostCodeCoordinates(postCode) {
    const data = await Promise.resolve(fetchPostCodeCoordinates(postCode));
    return data
}

const fetchBusStops = (data) => {
    return new Promise((resolve, reject) => {
        request(`https://api.tfl.gov.uk/StopPoint?stopTypes=NaptanPublicBusCoachTram&lat=
${data[0]}&lon=${data[1]}&radius=800`, function (error, response, body) {
            if (response.statusCode === 200 & !error) {
                const busStops = JSON.parse(body);
                const closestBusStops = [busStops['stopPoints'][0], busStops['stopPoints'][1]];
                resolve(closestBusStops);
                // resolve(await getArrivals(closestBusStops[0].naptanId))
                // resolve(await getArrivals(closestBusStops[1].naptanId))
            } else {
                reject(Error("Unable to complete request"))
            }
        })
    })
}

async function getBusStops(data) {
    const nearestBusStops = await Promise.resolve(fetchBusStops(data));
    return nearestBusStops
}

module.exports = {getPostCodeCoordinates, getBusStops}
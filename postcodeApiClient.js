const request = require("request");
const {getLiveArrivalPredictions} = require('./tflApiClient');

const validatePostcode = (postCode) => {

        try {
            request(`https://api.postcodes.io/postcodes/${postCode}/validate`, function (error, response, body) {
                const result = JSON.parse(body).result;
                console.log(result)
                if (result === false) {
                    throw new Error(`It looks like ${userPostcode} isn't a valid postcode.`)
                } else {
                    return postCode;
                }
            });
        }
        catch (error) {
            console.error(error.message);
        }
}

const getBusStopsInfo = (postCode) => {
        request(`https://api.postcodes.io/postcodes?q=${postCode}`, function (error, response, body) {
            const postcodeInfo = JSON.parse(body);

            const lat = postcodeInfo.result[0].latitude;
            const lon = postcodeInfo.result[0].longitude;

        request(`https://api.tfl.gov.uk/StopPoint?stopTypes=NaptanPublicBusCoachTram&lat=
        ${lat}&lon=${lon}&radius=800`, function (error, response, body) {
            const busStops = JSON.parse(body);
            const closestBusStops = [busStops['stopPoints'][0], busStops['stopPoints'][1]];

            getLiveArrivalPredictions(closestBusStops[0].naptanId)

            getLiveArrivalPredictions(closestBusStops[1].naptanId)
            // console.log(`Arrivals for your nearest bus stop (2): ${getLiveArrivalPredictions(closestBusStops[1])}`);

            }
        );

})

}
































module.exports = {validatePostcode, getBusStopsInfo};
const request = require("request");

const getLiveArrivalPredictions = (userStopCode) => {
    request(`https://api.tfl.gov.uk/StopPoint/${userStopCode}/Arrivals`, function (error, response, body) {

        const sortedArrivals = JSON.parse(body).sort((b1, b2) => b1.timeToStation - b2.timeToStation);

        sortedArrivals.map(a => {
            if(sortedArrivals.indexOf(a) <= 4) {
                let arrivalTime = Math.floor(a.timeToStation/60);
                console.log(`${a.lineId} to ${a.destinationName} ${arrivalTime <= 0 ? 'due' : 'arriving in ' + arrivalTime + ' minutes'}`)
            }

        })
    });
}

module.exports = {getLiveArrivalPredictions};

// 490008660N
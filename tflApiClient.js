const request = require("request");

const getLiveArrivalPredictions = (userStopCode) => {

    return new Promise((resolve, reject) => {
            request(`https://api.tfl.gov.uk/StopPoint/${userStopCode}/Arrivals`, function (error, response, body) {
                if (response.statusCode === 200 && !error) {
                    const sortedArrivals = JSON.parse(body).sort((b1, b2) => b1.timeToStation - b2.timeToStation);
                    resolve(sortedArrivals)
                } else {
                    reject(Error("Unable to fetch data"))
                }
            })
        })
}

const logArrivals = (sortedArrivals) => {

    console.log(`Bus stop: ${sortedArrivals[0].stationName}`);

    sortedArrivals.map(a => {
        if(sortedArrivals.indexOf(a) <= 4) {
            let arrivalTime = Math.floor(a.timeToStation/60);
            console.log(`${a.lineId} to ${a.destinationName} ${arrivalTime <= 0 ? 'due' : 'arriving in ' + arrivalTime + ' minutes'}`)
        }
    })
}

const convertArrivalsToArrivalObjects = (arrivals) => {
    return arrivals.map((arrival) => {
        let busArrival = new Arrival(
                    arrival.lineId,
                    Math.floor(arrival.timeToStation/60),
                    arrival.stationName,
                    arrival.naptanId,
                    arrival.destinationName

        )
    })
}

async function getArrivals(userStopCode) {
    const data = await Promise.resolve(getLiveArrivalPredictions(userStopCode));
    return data
}

module.exports = {logArrivals, getArrivals, convertArrivalsToArrivalObjects};

// 490008660N
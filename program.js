const request = require('request');
const ps = require('prompt-sync');
const {getLiveArrivalPredictions, getArrivals} = require('./tflApiClient.js');
const {validatePostcode, getPostCodeCoordinates, fetchBusStops, getBusStops} = require('./postcodeApiClient.js');

    const prompt = ps({});

    const runProgram = async () => {
        // const userStopCode = prompt('Please enter the stop code of your nearest bus stop: ')

        // const userPostcode = prompt("Please enter your postcode: ");
        //
        // getBusStopsInfo(userPostcode);

        // getLiveArrivalPredictions(userStopCode);

        // validatePostcode('tw94bh')
    // getArrivals('490008660N')

        const coordinates = await getPostCodeCoordinates('tw94bh');
        const nearestBusStops = await getBusStops(coordinates);
        const arrivalsClosestBusStop = await getArrivals(nearestBusStops[0].naptanId);
        const arrivalsSecondBusStop = await getArrivals(nearestBusStops[1].naptanId);

    console.log(arrivalsClosestBusStop);
}

runProgram()




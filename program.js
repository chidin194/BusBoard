const request = require('request');
const ps = require('prompt-sync');
const {getLiveArrivalPredictions} = require('./tflApiClient.js');
const {validatePostcode, getBusStopsInfo} = require('./postcodeApiClient.js');

const prompt = ps({});

const runProgram = () => {
    const userStopCode = prompt('Please enter the stop code of your nearest bus stop: ')

    // const userPostcode = prompt("Please enter your postcode: ");
    //
    // getBusStopsInfo(userPostcode);

    getLiveArrivalPredictions(userStopCode);
}

runProgram()




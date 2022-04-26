const request = require('request');
const ps = require('prompt-sync');
const {getLiveArrivalPredictions} = require('./tflApiClient');

const prompt = ps({});

const runProgram = () => {
    const userStopCode = prompt('Please enter the stop code of your nearest bus stop:')
    getLiveArrivalPredictions(userStopCode);
}

runProgram()




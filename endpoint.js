const express = require('express')
const app = express()
const port = 3000
const {getArrivals, logArrivals, getLiveArrivalPredictions,  convertArrivalsToArrivalObjects, fetchBusStops} = require('./tflApiClient');
const {fetchPostCodeCoordinates} = require('./postcodeApiClient')
const {Arrival} = require('./Arrival')


app.use(express.static('frontend'));

app.set('query parser', 'simple');

app.get(`/departureBoards/:postcode`, async (req, res, err) => {

    try {
        const coordinates = await Promise.resolve(fetchPostCodeCoordinates(req.params.postcode));
        const nearestBusStops = await Promise.resolve(fetchBusStops(coordinates));

        const arrivalsClosestBusStop = await Promise.resolve(getLiveArrivalPredictions(nearestBusStops[0].naptanId));
        const arrivalsSecondBusStop = await Promise.resolve(getLiveArrivalPredictions(nearestBusStops[1].naptanId));

        res.send([arrivalsClosestBusStop, arrivalsSecondBusStop]);
    }

    catch {
        throw new Error('Unable to complete request, no data found. Please try again')
    }

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
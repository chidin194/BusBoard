const express = require('express')
const app = express()
const port = 3000
const {getArrivals, logArrivals, getLiveArrivalPredictions,  convertArrivalsToArrivalObjects, getBusStops} = require('./tflApiClient');
const {getPostCodeCoordinates} = require('./postcodeApiClient')
const {Arrival} = require('./Arrival')


app.use(express.static('frontend'));

app.set('query parser', 'simple');

app.get(`/departureBoards/:postcode`, async (req, res, err) => {

    const coordinates = await getPostCodeCoordinates(req.params.postcode);
    const nearestBusStops = await getBusStops(coordinates);

    const arrivalsClosestBusStop = await getArrivals(nearestBusStops[0].naptanId);
    const arrivalsSecondBusStop = await getArrivals(nearestBusStops[1].naptanId);

    res.send([arrivalsClosestBusStop, arrivalsSecondBusStop]);

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
const express = require('express')
const app = express()
const port = 3000
const {getArrivals, logArrivals, getLiveArrivalPredictions,  convertArrivalsToArrivalObjects} = require('./tflApiClient');
const {getPostCodeCoordinates, getBusStops} = require('./postcodeApiClient')
const {Arrival} = require('./Arrival')


app.set('query parser', 'simple');

app.get(`*`, async (req, res, err) => {

    const coordinates = await getPostCodeCoordinates(req.query.postCode[0]);
    const nearestBusStops = await getBusStops(coordinates);

    const arrivalsClosestBusStop = await getArrivals(nearestBusStops[0].naptanId);
    const arrivalsSecondBusStop = await getArrivals(nearestBusStops[1].naptanId);

    res.send(arrivalsClosestBusStop);

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

    function populateData(postcode) {
        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', `/departureBoards/${postcode}`, true);
        xhttp.setRequestHeader('Content-Type', 'application/json');

        xhttp.load = function() {
            if (xhttp.readyState === xhttp.DONE) {
                if (xhttp.status === 200) {
                    document.getElementById("results").innerHTML = xhttp.response;
                } else {
                    console.log(`error? ${xhttp.status}`);
                }
            }
        }
        xhttp.send();
    }




    //
    //
    // document.getElementById("subtitle").innerHTML = "Next Arrivals for your Nearest Bus Stops"
    //
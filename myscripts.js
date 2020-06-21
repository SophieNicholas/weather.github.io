APIkey = "189b79b5e67df1fad8b5340a47c537f7";
// cityname= "London"
// console.log(queryURL)
var searchTerm = "";

$("#searchButton").on("click", function () {

    event.preventDefault();
    searchTerm = $("#searchTerm").val();
    console.log(searchTerm);


    function print_today() {
        var now = new Date();
        var months = new Array('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12');
        var date = ((now.getDate() < 10) ? "0" : "") + now.getDate();

        function fourdigits(number) {
            return (number < 1000) ? number + 1900 : number;
        }
        var today = months[now.getMonth()] + "/" + date + "/" + (fourdigits(now.getYear()));
        return today;
    }

    function convertKelvinToCelsius(kelvin) {
        if (kelvin < (0)) {
            return 'below absolute zero (0 K)';
        } else {
            return (kelvin - 273.15);
        }
    }
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&APPID=" + APIkey;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (result) {
        console.log(result);

        var date = $("#date");
        date.text(print_today);

        var city = $("#city");
        city.text(result.name)

        var humidity = $("#humidity");
        humidity.text(result.main.humidity + " %")
        console.log(humidity);

        var temperature = $("#temperature");
        temperature.text(convertKelvinToCelsius(result.main.temp).toFixed(2) + " degrees");
        console.log(temperature);

        var wind = $("#wind");
        wind.text(result.wind.speed + " mph")
        console.log(wind);

        var des = $("#des");
        des.text(result.weather[0].description)
        console.log(des);

        var long = result.coord.lat;
        console.log(long)

        var lat = result.coord.lon;
        console.log(lat);

        querytwoURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIkey + "&lat=" + lat + "&lon=" + long;
        console.log(querytwoURL)
        $.ajax({
            url: querytwoURL,
            method: "GET"
        }).then(function (result) {
            console.log(result);
            var UV = $("#UV");
            UV.text(result.value)
            console.log(UV);

            if (result.value > 3) {
                UV.addClass("danger");
            } else if (result.value === 3) {
                UV.addClass("moderate");
            } else {
                UV.addClass("safe");
            }

         querythreeURL

        });


    });

});
//First API for weather and Time

window.addEventListener("load", () => {
    let lat;
    let long;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            //API adress 
            const proxy = "https://cors-anywhere.herokuapp.com/";  //proxy that help with requesting data
            const url2 = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

            fetch(url2)
            .then(response => {
                return response.json()
            })
            .then(data => {
                const country = document.getElementById("country");
                const possibleOfRain = document.getElementById("psr");
                const temp = document.getElementById("temp");
                const time = document.getElementById("time");
                const wind = document.getElementById("wind");

                const convert = Math.floor((data.currently.temperature - 32) * 5 / 9);
                country.innerHTML = data.timezone;
                temp.innerHTML = "Temperature " + convert + "°";
                possibleOfRain.innerHTML = "Weather " + data.currently.summary;
                wind.innerHTML = "Wind speed " + data.currently.windSpeed;
            })
            .catch((error) => {
                alert(" Something went wrong, Please try Again" + error);
            })
        });

    } else {
        alert("Location access denied")
    }
})
function clock() {
    var date = new Date();
    var h = date.getHours();
    var m = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    var s = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();
    time.innerHTML = `Local Time ${h}:${m}:${s}`

    setTimeout(clock, 1000);
}

//second API for Countries
const button1 = document.querySelector(".button1");
button1.addEventListener("click", (e) => {
    e.preventDefault();
    const input = document.querySelector(".search input");
    fetch("https://restcountries-v1.p.rapidapi.com/name/" + input.value, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
            "x-rapidapi-key": "9ac4dabd4bmsha1c908e8f39f027p16c603jsn20945aa017ff"
        }
    })
    .then(response => response.json())
    .then(data => {
        const name = document.getElementById("name");
        const capital = document.getElementById("capital");
        const region = document.getElementById("region");
        const languages = document.getElementById("languages");
        const currency = document.getElementById("currency");
        const population = document.getElementById("population");
        const area = document.getElementById("area");
        const callingCode = document.getElementById("callingCode");

        name.innerHTML = "Name " + "\xa0\xa0\ " + data[0].name;
        capital.innerHTML = "Capital " + "\xa0\xa0\ " + data[0].capital;
        population.innerHTML = "Population " + "\xa0\xa0 " + data[0].population;
        region.innerHTML = "Region " + " \xa0\xa0\ " + data[0].region;
        languages.innerHTML = "Languages " + "\xa0\xa0\ " + data[0].languages;
        currency.innerHTML = "Currency " + "\xa0\xa0\ " + data[0].currencies;
        area.innerHTML = "Area " + " \xa0\xa0\ " + data[0].area;
        callingCode.innerHTML = "Calling Code " + " \xa0\xa0\ " + data[0].callingCodes;
    })
    .catch(err => {
        console.log(err);
    });
})

//using ajax to autocomplete the search bar
$("#userInput").on("input", function () {
    if ($("#userInput").val().length > 3) {
        $.ajax({
            url: "https://restcountries-v1.p.rapidapi.com/name/" + $("#userInput").val(),
            dataType: 'json',
            header: {
                "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
                "x-rapidapi-key": "9ac4dabd4bmsha1c908e8f39f027p16c603jsn20945aa017ff"
            },
            success: (data) => {
                $("#countryList").empty();
                $("#countryList").append("<option value=" + data[0].name + "></option>");
            },
            error: function (xhr, status, error) {
                console.log(xhr + " " + status + " " + error)
            }
        })
    }
})

//jquery functions began here

//********show or hide header */
$(document).ready(function () {
    var count = 0; //count the amount of click, then it is used to change the text to show header or hide header
    clock();
    $(".button1 .btn").on("click", () => {
        $(".main-content").slideToggle(2000, function () {
            count++;
            console.log(count);
            if (count % 2 == 0) {
                $(".button1 .btn").text("Hide Header");
            } else {
                $(".button1 .btn").text("Show Header");
            }
        });
    })

    //********changing the background color of top-bar and contact*/
    var countColor = 0;
    var color = ["olive", "brown", "teal", "blue", "purple", "magenta"];

    $(".button1 .clr").on("click", function () {
        $(".contact").css("background-color", color[countColor])
        $(".top-bar").css("background-color", color[countColor])
        countColor++;
        if (countColor == 5) {
            countColor -= 5;   // if the last color is reached then it will began from the first color again
        }
    })
})


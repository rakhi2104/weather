$(document).ready(function () {
  setDate();
  getLoc();
  if(new Date().getHours() > 18) {
    document.documentElement.style.setProperty('--color-start','#667eea');
    document.documentElement.style.setProperty('--color-end','#764ba2');
  }

});

function getLoc() {

  var lat = 17.740453;
  var long = 83.217260;

  var gmapURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=`+lat+`,`+long+`&key=AIzaSyB5ZQ3Op9X9FPAeS-fvoexZjj2SLr0k1Z4`
  var cityName, country ;
  $.getJSON(gmapURL,function (m) {

    console.log(m);

    if (m== 'undefined') {
      cityName = '-';
    }
    else {
      for (var i = 0; i < m.results[0].address_components.length; i++) {
        if (m.results[0].address_components[i].types[0] === 'locality') {
          cityName = (m.results[0].address_components[i].long_name);
        }
        else if (m.results[0].address_components[i].types[0] === "administrative_area_level_1") {
          cityName = (m.results[0].address_components[i].long_name);
        }
        else {
          cityName = (m.results[0].address_components[i].long_name);
        }
        if (m.results[0].address_components[i].types[0] === 'country') {
          country = (m.results[0].address_components[i].short_name);
        }
      }
    }
    $('#place').text(cityName + ', '+ country);
  });

  fetchData(lat,long)
}

function setDate() {
  var date = new Date();
  var month = date.toLocaleString('en-us',{month : 'long'});
  $('#date').text(month + ' ' + date.getDate() + ', ' + date.getFullYear());
}

function fetchData(lat,long) {
  var postURL =
		"https://api.darksky.net/forecast/cb45cfc47ae0062994bf3c1ee1d8a7b1/" +
		lat +
		"," +
		long +
		"?callback=?";

	$.getJSON(postURL, function(w) {
		tempN = w.currently.temperature;
    tempN = Math.ceil((tempN - 32) * 5/9);
    $('#tempDigit').text(tempN+"°");
    $('#current-status').text(w.currently.summary);

    var timeNow = new Date();

    fetchToday(w.hourly.data);
    console.log(w.currently.icon);

    switch (w.currently.icon) {
      case 'clear-day':
        document.documentElement.style.setProperty('--color-start','#209cff');
        document.documentElement.style.setProperty('--color-end','#68e0cf');
        break;
      case 'clear-night':
        document.documentElement.style.setProperty('--color-start','#868f96');
        document.documentElement.style.setProperty('--color-end','#596164');
        break;

      case 'partly-cloudy-night':
        document.documentElement.style.setProperty('--color-start','#868f96');
        document.documentElement.style.setProperty('--color-end','#596164');
        break;

      case 'Overcast':
        document.documentElement.style.setProperty('--color-start','#868f96');
        document.documentElement.style.setProperty('--color-end','#596164');
        break;
      default:

    }

  /*  clear-day, clear-night, rain, snow, sleet,
    wind, fog, cloudy, partly-cloudy-day, partly-cloudy-night*/

    $('#cloud-cover').text(w.currently.cloudCover * 100 + ' %');
    $('#wind-speed').text((w.currently.windSpeed * 1.60934).toFixed(1) + ' km/h');
    $('#precip').text(Math.ceil(w.currently.precipProbability * 100) + ' %');
    dir = 270 - w.currently.windBearing;

    $('.wi-direction-up').css('transform','rotate('+dir+'deg)' );
    $('#wind-dir').text(dir + ' deg');

    var sunrise = new Date(w.daily.data[0].sunriseTime * 1000);
    var sunset = new Date(w.daily.data[0].sunsetTime * 1000);

      var sunriseT = (sunrise.getHours() >10 ? sunrise.getHours() :"0"+sunrise.getHours() ) + ':' + (sunrise.getMinutes() < 10 ? "0"+sunrise.getMinutes() : sunrise.getMinutes()) /* + (sunrise.getHours() >=12 ? ' PM' : ' AM')*/;
      var sunsetT = (sunset.getHours() >10 ? sunset.getHours() :"0"+sunset.getHours() ) + ':' + (sunset.getMinutes() < 10 ? "0"+sunset.getMinutes() : sunset.getMinutes()) /*+ (sunset.getHours() >=12 ? ' PM' : ' AM')*/;

      //console.log(sunsetT);

    $('#sunrise-time').text(' '+sunriseT);
    $('#sunset-time').text(' '+sunsetT);

	});

}

function fetchToday(data) {
  var count = 0;
$('#today-panel-main').empty();

  for (var i = 0; count < 5; i++, count++) {
    var date = new Date(data[i].time * 1000);
    var time = date.getHours() + ' : ' + date.getMinutes() ;
    var summ = data[i].summary;
    var tem = ((data[i].temperature - 32) * 5/9 ).toFixed(1) + ' °C';
    console.log( date.getHours() + ' ' + ((data[i].temperature - 32) * 5/9 ).toFixed(1) + ' ' + data[i].summary );

    $('#today-panel-main').append(`
      <ul class="text-center">

        <li class="today-time col-sm-4">
            ` + time + `
        </li>
        <li class="today-summary col-sm-4">
            ` + summ + `
        </li>
        <li class="today-temp col-sm-4">
            ` + tem + `
        </li>

      </ul>

      `);
  }
}

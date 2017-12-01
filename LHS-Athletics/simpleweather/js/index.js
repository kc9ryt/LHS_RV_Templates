// v3.1.0
//Docs at http://simpleweatherjs.com


$(document).ready(function() { 
  $.simpleWeather({
    location: 'Lebanon, IN',
    unit: 'f',
    success: function(weather) {
      html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<h1> Todays High</h1>'
      html += '<p>'+weather.high+'</p>';
      html += '<h1> Todays Low</h1>'
      html += '<p>'+weather.low+'</p>';
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
});


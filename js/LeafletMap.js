var map = L.map('map',{zoomControl: false}).setView([1.349, 32.722], 7);


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mnajarro.gp7d5ljb',
    accessToken: 'pk.eyJ1IjoibW5hamFycm8iLCJhIjoia3h6MUNBZyJ9.ZTwY6_c7nym9bshqjdAopA'
}).addTo(map);
//L.esri.basemapLayer('Gray').addTo(map);

L.esri.dynamicMapLayer({
    url: 'http://geocenterusaid.org/geocenter/rest/services/Uganda/Uganda_2015Births/MapServer',
    opacity: 0.5,
    useCors: false
  }).addTo(map);
  
var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
		div.innerHTML = "<img src='img/legendBirths.JPG'>";
    return div;
    };
    legend.addTo(map);
var zoomHome = L.Control.zoomHome();
zoomHome.addTo(map);	

var map35 = L.map('map35',{zoomControl: false}).setView([1.349, 32.722], 7);


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mnajarro.gp7d5ljb',
    accessToken: 'pk.eyJ1IjoibW5hamFycm8iLCJhIjoia3h6MUNBZyJ9.ZTwY6_c7nym9bshqjdAopA'
}).addTo(map35);
//L.esri.basemapLayer('Gray').addTo(map);

L.esri.dynamicMapLayer({
    url: 'http://geocenterusaid.org/geocenter/rest/services/Uganda/ugandaBirths2035/MapServer',
    opacity: 0.5,
    useCors: false
  }).addTo(map35);
  
var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
		div.innerHTML = "<img src='img/legendBirths2035.JPG'>";
    return div;
    };
    legend.addTo(map35);
	
	zoomHome.addTo(map35);
	map.sync(map35);
	map35.sync(map);
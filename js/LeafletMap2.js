var map35 = L.map('map35',{zoomControl: false}).setView([1.349, 32.722], 7);


/*L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mnajarro.gp7d5ljb',
    accessToken: 'pk.eyJ1IjoibW5hamFycm8iLCJhIjoia3h6MUNBZyJ9.ZTwY6_c7nym9bshqjdAopA'
}).addTo(map35);*/
L.esri.basemapLayer('Imagery').addTo(map35);

var Birthrates= L.esri.dynamicMapLayer({
    url: 'http://geocenterusaid.org/geocenter/rest/services/Uganda/Uganda_Birthrates_2015/MapServer',
    opacity: 0.85,
    useCors: false
  });
  Birthrates.addTo(map35);
  Birthrates.bindPopup(function (error, featureCollection) {
		var birthratefield= featureCollection.features[0].properties.Birthrate2015
      return 'District: <b>' + featureCollection.features[0].properties.DISTRICT +'</b><br>Birth rate: <b>' + Number(birthratefield).toFixed(2)+'</b>';
    
  });

  
var totalpop= L.esri.dynamicMapLayer({
    url: 'http://geocenterusaid.org/geocenter/rest/services/Uganda/Uganda_Totalpop_2015/MapServer',
    opacity: 0.85,
    useCors: false
  });
  totalpop.bindPopup(function (error, featureCollection) {
    
      return 'District: ' + featureCollection.features[0].properties.DISTRICT +'<br>Total Population: ' + Math.round(featureCollection.features[0].properties.SUM);
    
  });

var BRlegend = L.control({position: 'bottomright'});
    BRlegend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
		div.innerHTML = "<img class='maplegend' src='img/legendbirthrate.jpg'>";
    return div;
    };
var TPlegend = L.control({position: 'bottomright'});
	TPlegend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
		div.innerHTML = "<img class='maplegend' src='img/legendtotalpopulation.jpg'>";
    return div;
    };
var zoomHome = L.Control.zoomHome();
    
	zoomHome.addTo(map35);

var overlayMaps = {
    "Birth Rates": Birthrates,
	"Total Population": totalpop
};
L.control.layers(overlayMaps, null).addTo(map35);

BRlegend.addTo(map35);
currentLegend = BRlegend;

map35.on('baselayerchange', function (eventLayer) {
    if (eventLayer.name === 'Birth Rates') {
        map35.removeControl(currentLegend );
        currentLegend = BRlegend;
        BRlegend.addTo(map35);
    }
    else if  (eventLayer.name === 'Total Population') {
        map35.removeControl(currentLegend );
        currentLegend = TPlegend;
        TPlegend.addTo(map35);
    }
	});
Birthrates.on('mouseover', function(e) {
    alert('works!');
});
	


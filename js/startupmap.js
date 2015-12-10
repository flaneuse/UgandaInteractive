var run = 0;
      var map;
	  var dynamicMapServiceLayer; 

      require(["esri/map", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/config", "dojo/domReady!"], function(Map, ArcGISDynamicMapServiceLayer, esriConfig) {
        //configure map animation to be faster
        esriConfig.defaults.map.panDuration = 0.5; // time in milliseconds, default panDuration: 350
        esriConfig.defaults.map.panRate = 0.1; // default panRate: 25
        esriConfig.defaults.map.zoomDuration = 1500; // default zoomDuration: 500 and was changed to 3500
        esriConfig.defaults.map.zoomRate = 0.1; // default zoomRate: 25

        map = new Map("map", {
          //basemap: "satellite",
          center: [19, 5],
          zoom: 5,
		  smartNavigation: false
        });
		var baseMapLayer = new esri.layers.ArcGISTiledMapServiceLayer("http://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer");
		map.addLayer(baseMapLayer);
		
		dynamicMapServiceLayer = new ArcGISDynamicMapServiceLayer("http://geocenterusaid.org/geocenter/rest/services/Uganda/Uganda_PopulationChangeTwo/MapServer", {
          "opacity" : 1.0
		  });

		dynamicMapServiceLayer.setVisibleLayers([]);	
		

		
		
        map.addLayer(dynamicMapServiceLayer);
		
		map.on("load", function(){
		map.disablePan();
		map.disableScrollWheelZoom(); 
		map.disableRubberBandZoom();
		map.disableClickRecenter();
		map.disableDoubleClickZoom();
		map.disableShiftDoubleClickZoom(); 
		map.disableKeyboardNavigation();
		map.hidePanArrows();
		map.hideZoomSlider();
		map.disableMapNavigation();
		}); 
		
		map.on("update-end", RunAnimation);
		
      });
	  
	  function ReRun(){
			//alert("Rerunning animation"); 
			run = 0; 
			map.centerAndZoom([19,5],5); 
		}
		
		function RunAnimation(){
		//alert("running"); 
			if(run == 0){
			//alert("running"); 
			//setInterval(function () {dojo.byId("text").innerHTML="Located in the heart of Africa, Uganda is known as the Pearl of Africa. "; map.centerAndZoom([30,0],8);}, 3000);
			setTimeout(function () {dojo.byId("text").innerHTML="Africa: A land of 1.1 billion people, and bigger than China, India, the contiguous U.S. Combined";}, 500);
			setTimeout(function () {run = 5; dynamicMapServiceLayer.setDPI(200); dynamicMapServiceLayer.setVisibleLayers([0]);}, 6500);
			setTimeout(function () {dojo.byId("text").innerHTML="In the heart of Africa is Uganda, a small landlocked country known by many as the <i>Pearl of Africa</i>. ";}, 5500);
			setTimeout(function () {run = 1; map.centerAndZoom([32.8,1.6],8);}, 11000);
			}
			
			if(run == 1){
			setTimeout(function () {dojo.byId("text").innerHTML="Despite its natural beauty, the country remains plagued by high fertility rates and over population. ";}, 200);
			setTimeout(function () {dojo.byId("text").innerHTML="Between 1969 and 2014, Uganda's population has grown from 9.5 million  to 34.9 million. ";}, 7000);
			setTimeout(function () {dojo.byId("text").innerHTML="In <b><u>1991</u></b>, the population of Uganda was only 18.16 million people. <br><br><img src='img/startuplegend.jpg'>";}, 13000);
			
			setTimeout(function () {run = 2; dynamicMapServiceLayer.setDPI(96); dynamicMapServiceLayer.setVisibleLayers([1,2,5]); }, 12500);
			}
			
			if(run == 2){
			setTimeout(function () {dojo.byId("text").innerHTML="By <b><u>2002</u></b>, the population of Uganda had jumped to 25.94 million people. <br><br><img src='img/startuplegend.jpg'>";}, 5000);
			setTimeout(function () {run = 3; dynamicMapServiceLayer.setVisibleLayers([1,3,5]);}, 5000);
			}
			
			if(run == 3){
			setTimeout(function () {dojo.byId("text").innerHTML="<b><u>Today</u></b>, at 34.9 million people, the growth continues. <br><br><img src='img/startuplegend.jpg'>";}, 5000);
			setTimeout(function () {run = 4; dynamicMapServiceLayer.setVisibleLayers([1,4]);}, 5000);
			}
			
			if(run == 4){
			setTimeout(function () {dojo.byId("text").innerHTML="What are the effects of the population growth? What happens if growth rates increase or decline? <br><br><img src='img/startuplegend.jpg'> <br><br>Scroll down to learn more. <br><br><button type='button' class='btn-dark' onclick='ReRun();'>Rerun Animation</button> <br><br><a href='#about'><div class='scroll-invite-btn'></div></a>"; map.showPanArrows(); map.showZoomSlider(); }, 5000);
			} //<a href='#about' id='startbutton' class='.btn-light glyphicon glyphicon-chevron-down'></a>
			
			
		}
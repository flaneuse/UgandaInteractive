  var margin = {top: 20, right: 55, bottom: 100, left: 40},
            width  = 1000 - margin.left - margin.right,
            height = 500  - margin.top  - margin.bottom;
        var xtfr = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);
        var ytfr = d3.scale.linear()
            .rangeRound([height, 0]);
        var xAxistfr = d3.svg.axis()
            .scale(xtfr)
            .orient("bottom");
        var yAxistfr = d3.svg.axis()
            .scale(ytfr)
            .orient("left");
        var linetfr = d3.svg.line()
            .interpolate("cardinal")
            .x(function (d) { return xtfr(d.label) + xtfr.rangeBand() / 2; })
            .y(function (d) { return ytfr(d.value); });
        var colortfr = d3.scale.ordinal()
            .range(["#FEDE89","#ccebc5","#dddddd","#B5E0FF","#002A6C","#C21F32"]);
        var svgtfr = d3.select("#TFRchart").append("svg")
            .attr("width",  width  + margin.left + margin.right)
            .attr("height", height + margin.top  + margin.bottom)
  		  .attr("id", "UGtfrChart")
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        d3.csv("data/africatfr3.csv", function (error, data) {
          var labelVar = 'interval';
          var varNames = d3.keys(data[0]).filter(function (key) { return key !== labelVar;});
  		
          colortfr.domain(varNames);
          var seriesData = varNames.map(function (name) {
            return {
              name: name,
              values: data.map(function (d) {
                return {name: name, label: d[labelVar], value: +d[name]};
              })
            };
          });
          xtfr.domain(data.map(function (d) { return d.interval; }));
          ytfr.domain([
            /*d3.min(seriesData, function (c) { 
              return d3.min(c.values, function (d) { return d.value; });
            })*/0,
            d3.max(seriesData, function (c) { 
              return d3.max(c.values, function (d) { return d.value+0.5; });
            })
          ]);
          svgtfr.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
        .style({fill: "white", "font-size": "18px"})
              .call(xAxistfr);
          svgtfr.append("g")
              .attr("class", "y axis")
  			.style({fill: "white", "font-size": "18px"})
              .call(yAxistfr)
            .append("text")
              .attr("y", 6)
              .attr("x", 200)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Children per woman");
          var series = svgtfr.selectAll(".series")
              .data(seriesData)
            .enter().append("g")
              .attr("class", "series");
          series.append("path")
            .attr("class", "linetfr")
  		  .attr("id", function (d) { return d.name.replace(/\s+/g, ''); })
            .attr("d", function (d) { return linetfr(d.values); })
            .style("stroke", function (d) { return colortfr(d.name); })
            .style("stroke-width", "4px")
            .style("fill", "none")
  		  .style("opacity", function(d){if ((d.name.replace(/\s+/g, '') == "Uganda")||(d.name.replace(/\s+/g, '') == "Africa")){ return 1 }else{ return 0 } })
            //.on("mouseover", function (d) { lineBright(d); })
            //.on("mouseout",  function (d) { removelineBright(); })
          series.selectAll(".point")
            .data(function (d) { return d.values; })
            .enter().append("circle")
             .attr("class", "point")
  		   .attr("id", function (d) { return d.name.replace(/\s+/g, ''); })
             .attr("cx", function (d) { return xtfr(d.label) + xtfr.rangeBand()/2; })
             .attr("cy", function (d) { return ytfr(d.value); })
             .attr("r", "5px")
             .style("fill", function (d) { return colortfr(d.name); })
             .style("stroke", "white")
             .style("stroke-width", "1.5px")
  		   .style("opacity", function(d){if ((d.name.replace(/\s+/g, '') == "Uganda")||(d.name.replace(/\s+/g, '') == "Africa")){ return 1 }else{ return 0 } })
  		   .on("mouseover", function (d) { showPopover.call(this, d); })
             .on("mouseout",  function (d) { removePopovers(); })
          //alert(JSON.stringify(data));
  		var legendtfr = svgtfr.selectAll(".legendtfr")
              .data(varNames.slice().reverse())
            .enter().append("g")
              .attr("class", "legendtfr")
  			.style("fill", "white")
              .attr("transform", function (d, i) { return "translate(230," + i * 30 + ")"; });
          legendtfr.append("rect")
              .attr("x", width - 0)
              .attr("width", 13)
              .attr("height", 13)
              .style("fill", function(d){if ($("#"+ d.replace(/\s+/g, '')).css("opacity") == 1){ return colortfr(d); }else{ return "#337AB7"; } })
              .style("stroke", "white")
  			.on("mouseover", function () { $('rect').css('cursor', 'pointer');})
              .on("mouseout",  function () { $('rect').css('pointer', 'cursor');})
  			.on("click", function(d){ 
  			if ($("#"+ d.replace(/\s+/g, '')).css("opacity") == 1){
  			
  	        	//alert("reading 1");
  					d3.selectAll("#" + d.replace(/\s+/g, ''))
                      .transition().duration(100) 
                      .style("opacity", 0); 
  					
  					d3.select(this)
  					.style("fill", "#337AB7");
  					
  				}else {
  				//alert($("#"+ d).css("opacity"));
  					d3.selectAll("#" + d.replace(/\s+/g, ''))
                      .transition().duration(100) 
                      .style("opacity", 1);
  					
  					d3.select(this)
  					.style("fill", colortfr);
  				};
  					
  			});
  			
  			
          legendtfr.append("text")
              .attr("x", width - 5)
              .attr("y", 6)
              .attr("dy", ".55em")
  			.style("font-size","12px")
              .style("text-anchor", "end")
  			.text(function (d) { return d; })
  			.on("click", function(d){ 
  			/*if ($("#"+ d).css("opacity") == 1){
  			
  	        	alert("reading 1");
  					d3.selectAll("#" + d)
                      .transition().duration(100) 
                      .style("opacity", 0); 
  				
  					
  				}else {
  				alert($("#"+ d).css("opacity"));
  					d3.selectAll("#" + d)
                      .transition().duration(100) 
                      .style("opacity", 1);
  				};
  				//alert(d);
  				/*var idopacity =$(this).css("opacity");
  				var active   = idopacity == 1 ? true : false,
  					newOpacity = active == true ? 0: 1; 
  					alert(d3.select("#" + d) ? true : false);
  					d3.selectAll("#" + d)
                      .transition().duration(100) 
                      .style("opacity", newOpacity); 
  				
  					//active = newOpacity;
  					//console.log(active)
  					idopacity = active;
  					//console.log(active)
  					alert(d3.select("#" + d).style("opacity", 1) ? true : false);*/
  			});
  			
              
  			
          function removePopovers () {
            $('.popover').each(function() {
              $(this).remove();
            });
  		/*d3.selectAll(".linetfr")
                    .transition().duration(100) 
                    .style("opacity", 1);
  		d3.selectAll(".point" )
                    .transition().duration(100) 
                    .style("opacity", 1);	*/	  
          }
          function showPopover (d) {
            $(this).popover({
              title: d.name,
              placement: 'auto top',
              container: 'body',
              trigger: 'manual',
              html : true,
              content: function() { 
                return "Years: " + d.label + 
                       "<br/>Children per Woman: " + d3.format(",")(d.value ? d.value: d.y1 - d.y0); }
            });
            $(this).popover('show');
  		  /*d3.selectAll(".linetfr:not(#"+ d.name.replace(/\s+/g, '') +")" )
                    .transition().duration(100) 
                    .style("opacity", .1);
  		  d3.selectAll(".point:not(#"+ d.name.replace(/\s+/g, '') +")" )
                    .transition().duration(100) 
                    .style("opacity", .1);*/
          }
  		/*function lineBright(d){
  			d3.selectAll(".linetfr:not(#"+ d.name.replace(/\s+/g, '') +")" )
                    .transition().duration(100) 
                    .style("opacity", .1);
  			d3.selectAll(".point:not(#"+ d.name.replace(/\s+/g, '') +")" )
                    .transition().duration(100) 
                    .style("opacity", .1);
  		}
  		function removelineBright(){
  			d3.selectAll(".linetfr")
                    .transition().duration(100) 
                    .style("opacity", 1);
  			d3.selectAll(".point" )
                    .transition().duration(100) 
                    .style("opacity", 1);
  			
  		}*/
        });
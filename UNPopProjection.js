				var barData = [
					{
						'x': 1961,
						'y': 	200000000,
						'z': 'Independence- 1962: 7 M'
					},
					{
						 'x': 1999,
						'y': 	200000000,
						'z': 'Beginning of Millenium: 23 M'
					},
					{
						'x': 2022,
						'y': 	200000000,
						'z': '2023: Population expected to hit 50 M'
					},
					{
						 'x': 2048,
						'y': 	200000000,
						'z': '2049: Population expected to hit 100 M'
					},
					 {
						 'x': 2099,
						'y': 	200000000,
						'z': '2100: Population tops 200 M'
					}
				];
				
				var lineData1 = [
					{
						'x': 1950,
						'y': 	5158000,
					},
			{
						'x': 1955,
						'y': 	5899000,
					},
			{
						'x': 1960,
						'y': 	6788000,
					},
			{
						'x': 1965,
						'y': 	8014000,
					},
			{
						'x': 1970,
						'y': 	9446000,
					},
			{
						'x': 1975,
						'y': 	10827000,
					},
			{
						'x': 1980,
						'y': 	12548000,
					},
			{
						'x': 1985,
						'y': 	14631000,
					},
			{
						'x': 1990,
						'y': 	17384000,
					},
			{
						'x': 1995,
						'y': 	20413000,
					},
			{
						'x': 2000,
						'y': 	23758000,
					},
			{
						'x': 2005,
						'y': 	28042000,
					},
			{
						'x': 2010,
						'y': 	33149000,
					},
			{
						'x': 2015,
						'y': 	39032000,
					}
			]; 
				
				
				var lineData2 = [
				{
						'x': 2015,
						'y': 	39032000,
					},
			{
						'x': 2020,
						'y': 	45856000,
					},
			{
						'x': 2025,
						'y': 	53497000,
					},
			{
						'x': 2030,
						'y': 	61929000,
					},
			{
						'x': 2035,
						'y': 	71102000,
					},
			{
						'x': 2040,
						'y': 	80904000,
					},
			{
						'x': 2045,
						'y': 	91190000,
					},
			{
						'x': 2050,
						'y': 	101873000,
					},
			{
						'x': 2055,
						'y': 	112864000,
					},
			{
						'x': 2060,
						'y': 	124029000,
					},
			{
						'x': 2065,
						'y': 	135228000,
					},
			{
						'x': 2070,
						'y': 	146276000,
					},
			{
						'x': 2075,
						'y': 	157089000,
					},
			{
						'x': 2080,
						'y': 	167483000,
					},
			{
						'x': 2085,
						'y': 	177374000,
					},
			{
						'x': 2090,
						'y': 	186650000,
					},
			{
						'x': 2095,
						'y': 	195177000,
					},
			{
						'x': 2100,
						'y': 	202868000,
					}
				];
				
				
				var lineData = [
					{
						'x': 1950,
						'y': 	5158000,
					},
			{
						'x': 1955,
						'y': 	5899000,
					},
			{
						'x': 1960,
						'y': 	6788000,
					},
			{
						'x': 1965,
						'y': 	8014000,
					},
			{
						'x': 1970,
						'y': 	9446000,
					},
			{
						'x': 1975,
						'y': 	10827000,
					},
			{
						'x': 1980,
						'y': 	12548000,
					},
			{
						'x': 1985,
						'y': 	14631000,
					},
			{
						'x': 1990,
						'y': 	17384000,
					},
			{
						'x': 1995,
						'y': 	20413000,
					},
			{
						'x': 2000,
						'y': 	23758000,
					},
			{
						'x': 2005,
						'y': 	28042000,
					},
			{
						'x': 2010,
						'y': 	33149000,
					},
			{
						'x': 2015,
						'y': 	39032000,
					},
			{
						'x': 2020,
						'y': 	45856000,
					},
			{
						'x': 2025,
						'y': 	53497000,
					},
			{
						'x': 2030,
						'y': 	61929000,
					},
			{
						'x': 2035,
						'y': 	71102000,
					},
			{
						'x': 2040,
						'y': 	80904000,
					},
			{
						'x': 2045,
						'y': 	91190000,
					},
			{
						'x': 2050,
						'y': 	101873000,
					},
			{
						'x': 2055,
						'y': 	112864000,
					},
			{
						'x': 2060,
						'y': 	124029000,
					},
			{
						'x': 2065,
						'y': 	135228000,
					},
			{
						'x': 2070,
						'y': 	146276000,
					},
			{
						'x': 2075,
						'y': 	157089000,
					},
			{
						'x': 2080,
						'y': 	167483000,
					},
			{
						'x': 2085,
						'y': 	177374000,
					},
			{
						'x': 2090,
						'y': 	186650000,
					},
			{
						'x': 2095,
						'y': 	195177000,
					},
			{
						'x': 2100,
						'y': 	202868000,
					}
				];
				var vis = d3.select('#visualisation'), WIDTH = 1000, HEIGHT = 500, MARGINS = {
						top: 20,
						right: 20,
						bottom: 20,
						left: 50
					}, xRange = d3.scale.linear().range([
						MARGINS.left,
						WIDTH - MARGINS.right
					]).domain([
						d3.min(lineData, function (d) {
							return d.x;
						}),
						d3.max(lineData, function (d) {
							return d.x;
						})
					]), yRange = d3.scale.linear().range([
						HEIGHT - MARGINS.top,
						MARGINS.bottom
					]).domain([
						d3.min(lineData, function (d) {
							return d.y;
						}),
						d3.max(lineData, function (d) {
							return d.y;
						})
					]), xAxis = d3.svg.axis().scale(xRange).tickSize(10).tickSubdivide(true).tickFormat(d3.format("d")), yAxis = d3.svg.axis().scale(yRange).tickSize(10).orient('left').tickFormat(d3.format("3s")).tickSubdivide(true);
				vis.append('svg:g').attr('class', 'x axis').attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')').call(xAxis);
				vis.append('svg:g').attr('class', 'y axis').attr('transform', 'translate(' + MARGINS.left + ',0)').call(yAxis).append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("dy", ".71em")
				.style("text-anchor", "end")
				.text("Total Population (millions)");
				
				var lineFunc = d3.svg.line().x(function (d) {
					return xRange(d.x);
				}).y(function (d) {
					return yRange(d.y);
				}).interpolate('linear');
				//var LineGraph = vis.append('svg:path').attr('d', lineFunc(lineData1)).attr('stroke', 'blue').attr('stroke-width', 2).attr('fill', 'none').attr('class','MyLine');
				var LineGraph = vis.append('svg:path'); 
				var LineGraph2 = vis.append('svg:path'); 
				LineGraph.transition().duration(1000).ease("linear").attr("d", lineFunc(lineData1)).attrTween('d', pathTween).attr('stroke', 'blue').attr('stroke-width', 5).attr('fill', 'none');
				
				 function pathTween() {
					var interpolate = d3.scale.quantile()
							.domain([0,1])
							.range(d3.range(1, lineData1.length + 1));
					return function(t) {
						return lineFunc(lineData1.slice(0, interpolate(t)));
					};
				}
				
					 function pathTween2() {
					var interpolate = d3.scale.quantile()
							.domain([0,1])
							.range(d3.range(1, lineData2.length + 1));
					return function(t) {
						return lineFunc(lineData2.slice(0, interpolate(t)));
					};
				}
				
				
				function ShowFutureLine(){
				$("#FutureInfo").html("In less than 10 years, the population of Uganda will approach 50 million. By 2050, the population will exceed 100 million, almost ⅓ of the current population of the United States. At this rate of growth, Uganda will have nearly 200 million inhabitants by the end of the century.").fadeIn(30000); 
				document.getElementById("MilestoneB").innerHTML ="<button class='btn-dark btn-lg' onclick='ShowBars()'>See Major Milestones</button>"
				LineGraph2.transition().duration(2000).ease("linear").attr("d", lineFunc(lineData2)).attrTween('d', pathTween2).attr('stroke', 'red').attr('stroke-width', 5).attr('fill', 'none');
				//vis.select('MyLine').transition().duration(3000).ease("linear");
				//vis.append('MyLine').attr('d', lineFunc(lineData)).attr('stroke', 'blue').attr('stroke-width', 2).attr('fill', 'none');
				}
				
				function ShowBars(){
				
				document.getElementById("MilestoneB").innerHTML ="<button class='btn-dark btn-lg' onclick='HideBars()'>Hide Major Milestones</button>"; 
				
				 vis.selectAll('rect').data(barData).enter().append('rect').attr('x', function (d) {
					return xRange(d.x);
				}).attr('y', function (d) {
					return yRange(d.y);
				}).attr('width', 25).attr('height', function (d) {
					return HEIGHT - MARGINS.bottom - yRange(d.y);
				}).attr('fill', 'gray').style("opacity", 1).transition().duration(2000);

				
				vis.selectAll('bartext').
				data(barData).
				enter().
				append('text').
				attr("class", "milestonetext").
				//attr("transform",  "translate("+function (d) {return (xRange(d.x))/2;}+ ", " + function (d) {return (yRange(d.y))/2;} + ") rotate(90)" ).
				//attr("transform", "rotate(-45)").
				attr('x', function (d) {return xRange(d.x);}).
				attr('y', 250).
				attr('dx', 10).
				attr("dy", "1.2em").
				attr("text-anchor", "middle").
				style("writing-mode", "tb").
				style("opacity", 1).
				text(function (d) {return d.z;}).
				attr('fill', 'white'); 
				}
				
				function HideBars(){
				vis.selectAll('rect').style("opacity", 0);
				vis.selectAll('.milestonetext').style("opacity", 0);
				document.getElementById("MilestoneB").innerHTML ="<button class='btn-dark btn-lg' onclick='ReshowBars()'>Show Major Milestones</button>"; 	
				}
				
				function ReshowBars(){
				vis.selectAll('rect').style("opacity", 1);
				vis.selectAll('.milestonetext').style("opacity", 1);
				document.getElementById("MilestoneB").innerHTML ="<button class='btn-dark btn-lg' onclick='HideBars()'>Hide Major Milestones</button>"; 
				}
				var margin = {top: 20, right: 20, bottom: 100, left: 50},
						width = 960 - margin.left - margin.right,
						height = 500 - margin.top - margin.bottom;

					var parseDates = d3.time.format("%Y%m%d").parse;

					var xvar = d3.time.scale()
						.range([0, width]);

					var yvar = d3.scale.linear()
						.range([height, 0]);

					var xAxisvar = d3.svg.axis()
						.scale(xvar)
						.orient("bottom");

					var yAxisvar = d3.svg.axis()
						.scale(yvar)
						.orient("left");

					var linef = d3.svg.line()
						.x(function(d) { return xvar(d.date); })
						.y(function(d) { return yvar(d.close); });

					var svgs = d3.select("#popproj").append("svg")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
					  .append("g")
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

					d3.tsv("test.tsv", function(error, data) {
					  if (error) throw error;

					  data.forEach(function(d) {
						d.date = parseDates(d.date);
						d.close = +d.close;
					  });

					  xvar.domain(d3.extent(data, function(d) { return d.date; }));
					  yvar.domain(d3.extent(data, function(d) { return d.close; }));

					  svgs.append("g")
						  //.attr("id", "projchartx")
						  .attr("class", "x axis")
						  .attr("transform", "translate(0," + height + ")")
						  .call(xAxisvar);

					  svgs.append("g")
						//.attr("id", "projcharty")
						  .attr("class", "y axis")
						  .call(yAxisvar)
						.append("text")
						  .attr("transform", "rotate(-90)")
						  .attr("y", 6)
						  .attr("dy", ".71em")
						  .style("text-anchor", "end")
						  .text("Total Population (thousands)");
						  
						svgs.append("path")
						  .datum(data)
						  .attr("id", "projpath")
						  .attr("class", "linefine");
						  //.attr("d", linef);
						  
					d3.select('button').on('click', function() {
							
						  d3.select(".linefine").transition().duration(100000).delay(100).attr("d", linef);       
					  
						  });
					});
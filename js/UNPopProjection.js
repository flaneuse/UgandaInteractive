var margin = {top: 20, right: 20, bottom: 30, left: 50},
						width = 960 - margin.left - margin.right,
						height = 500 - margin.top - margin.bottom;

					var parseDates = d3.time.format("%Y%m%d").parse;

					var xvar = d3.time.scale()
						.range([0, width]);

					var yvar = d3.scale.linear()
						.range([height, 0]);

					var xAxisvar = d3.svg.axis()
						.scale(x)
						.orient("bottom");

					var yAxisvar = d3.svg.axis()
						.scale(y)
						.orient("left");

					var linef = d3.svg.line()
						.xvar(function(d) { return xvar(d.date); })
						.yvar(function(d) { return yvar(d.close); });

					var svg = d3.select("#popproj").append("svg")
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

					  svg.append("g")
						  .attr("class", "xaxis")
						  .attr("transform", "translate(0," + height + ")")
						  .call(xAxisvar);

					  svg.append("g")
						  .attr("class", "yaxis")
						  .call(yAxisvar)
						.append("text")
						  .attr("transform", "rotate(-90)")
						  .attr("y", 6)
						  .attr("dy", ".71em")
						  .style("text-anchor", "end")
						  .text("Total Population");
						  
						svg.append("path")
						  .datum(data)
						  .attr("class", "linefine");
						  //.attr("d", linef);
						  
					d3.select('button').on('click', function() {
							
						  d3.select(".linefine").transition().duration(100000).delay(100).attr("d", linef);       
					  
						  });
					});
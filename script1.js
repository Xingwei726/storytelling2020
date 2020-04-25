//shape on the definition slide
var width = 1440,
    height = 700;
var margin = { top: 200, right: 50, bottom: 200, left: 50 },
    width2 = width - margin.left - margin.right,
    height2 = height - margin.top - margin.bottom;



d3.csv("./data/gender09.csv").then(function(data1) {
    d3.csv("./data/gender19.csv").then(function(data2) {

		var sScale = d3.scaleLinear()
			           .domain([0, 100])
			           .range([0, 1000])

		var mScale = d3.scaleLinear()
			           .domain([0, 300])
			           .range([0, 800])	    


		var svg3 = d3.select('#gender')
			         .append('svg')
			         .attr('width', "100%")
			         .attr('height', 750)

        var genderS1= svg3.append('g')
			.attr("transform", "translate(70,0)")
			.selectAll('rect')
			.data(data1)
			.enter()
			.append('rect')
			.attr("x", "200px") 
			.attr("width", function (d){
				return sScale(d.susceptibility)
			})
			.attr('y', function(d,i){
				return 120 + i*120
			})
			.attr("height", "100px")
			.attr('fill', '#000000')
			
		var genderM1 = svg3.append('g')
			.attr("transform", "translate(70,0)")
			.selectAll('rect')
			.data(data1)
			.enter()
			.append('rect')
			.attr("x", "600px") 
			.attr("width", function (d){
				return mScale(d.medianLoss)
			})
			.attr('y', function(d,i){
				return 120 + i*120
			})
			.attr("height", "100px")
			.attr('fill', '#000000')

		var sLegend = svg3.append('g')
			.attr("transform", "translate(70,0)")
			.selectAll('rect')
			.data(data1)
			.enter()
			.append('rect')
			.attr("x", "600px") 
			.attr("width", function (d){
				return mScale(d.medianLoss)
			})
			.attr('y', function(d,i){
				return 120 + i*120
			})
			.attr("height", "100px")
			.attr('fill', '#000000')






    });
});



d3.csv("./data/age09.csv").then(function(data3) {

var ageScale

		var svg4 = d3.select('#age')
			         .append('svg')
			         .attr('width', "100%")
			         .attr('height', 1000)
			                   .attr("transform", "translate(" + margin.left + ",-250)");

			         
        var yScale = d3.scaleLinear()
          .domain([0, 500])
          .range([height2,0])			         

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .ticks(10);
         
         svg4.append("g")
              .attr("class", "y axis")
              .call(yAxis)
              .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Value ($)");

		
        svg4.append('g')
            .selectAll('rect')
            .data(data3)
            .enter()
            .append('rect')
          .attr("x", function(d,i) {
			  return i*200;
    	  }) 
          .attr("width", 195)
    	  .attr('y', function(d) { 
    	      return yScale(d.medianLoss)+400
    	  })
          .attr("height", function(d) {
			  return height2-yScale(d.medianLoss);
    	  })
          .attr('fill', '#000000')




});
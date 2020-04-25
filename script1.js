//shape on the definition slide
var width = 1440,
    height = 700;
var margin = { top: 200, right: 50, bottom: 200, left: 50 },
    width2 = width - margin.left - margin.right,
    height2 = height - margin.top - margin.bottom;


//gender graph
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


//key screen ---age comparison
d3.csv("./data/age09.csv").then(function(data3) {

	    var tooltip = d3.select("#age")
            // .attr("transform", "translate(" + margin.left + "," + -8000 + ")")
            .append("div")
            .style("opacity", 0)
            .style("position", "absolute")
            .style("color", "#e8e8e8")
            .style("background", "#000000")
		      	.style("font-family", "Source Sans Pro")
	      		.style("font-size", "14px")
            .style("padding", "8px")
            .style("z-index", "1000")


        var mouseover = function (d) {
               tooltip
                  .style("opacity", 1)
                  .html(d.age+" Susceptibility: <br/>"+ d.susceptibility + " %") 
                  .style('left', (d3.event.pageX+12) + 'px')
                  .style('top', (d3.event.pageY) + 'px')

                d3.select(this)
                  .attr("fill", "#C373FC")

        }
        
        var mouseleave = function (d) {
                tooltip
                  .style("opacity", 0);
                d3.select(this)
                  .attr("fill", "#000000")
        }

	    	var svg4 = d3.select('#age')
			         .append('svg')
			         .attr('width', "100%")
			         .attr('height', 1000)
			         .attr("transform", "translate(" + margin.left + ",-250)");

			         
        var yScale = d3.scaleLinear()
          .domain([0, 500])
          .range([height2,0])	
        
        var yScale2 = d3.scaleLinear()
          .domain([0, 100])
          .range([height2-200,0])	 
          
        var xScale = d3.scalePoint()
            .domain(["A", "B", "C", "D", "E", "F"]) 
            .range([100, 1100]);
        
        // Draw the x-axis
        svg4
          .append("g")
          .attr("transform", "translate(50,700)") 
          .call(d3.axisBottom(xScale));

        // Draw the y-axis
        svg4
          .append("g")
          .attr("transform", "translate(30,400)") 
          .call(d3.axisLeft(yScale));

        // // Draw the y-axis
        // svg4
        //   .append("g")
        //   .attr("transform", "translate(30,400)") 
        //   .call(d3.axisRight(yScale2));


		    //medianLoss bars
        svg4.append('g')
            .selectAll('rect')
            .data(data3)
            .enter()
            .append('rect')
            .attr("x", function(d,i) {
			        return 50+i*200;
    	      }) 
            .attr("width", 195)
    	      .attr('y', function(d) { 
    	        return yScale(d.medianLoss)+400
    	       })
            .attr("height", function(d) {
			        return height2-yScale(d.medianLoss);
    	      })
            .attr('fill', '#000000')
            .on("mouseover", mouseover)
		        .on("mouseleave", mouseleave)
	
  		  //susceptibility dots    
  		  svg4.append('g')
  		      .selectAll('circle')
  		      .data(data3)
  		      .enter()
  		      .append('circle')
  		      .attr('cx', function(d,i) {
  			        return 50+i*200+100;
      	      })
  		      .attr('cy', function(d) { 
      	        return height2- yScale2(d.medianLoss)
      	       })
  		      .attr('r', "5px")
  		      .attr('fill', '#C373FC')


  		  //susceptibility legend   
  		  svg4.append('g')
  		      .selectAll('text')
  		      .data(data3)
  		      .enter()
  		      .append('text')
  		      .attr('x', function(d,i) {
  			        return 50+i*200+88;
      	      })
  		      .attr('y', function(d) { 
      	        return height2- yScale2(d.medianLoss)-10
      	       })
  		      .attr('fill', '#C373FC')
  		      .attr("text-anchor", "left")
		        .attr("font-family", "Source Sans Pro")
		        .attr('font-weight',600)
		        .style("font-size", "14px")
		        .text(function(d,i) {
			   	     return d.susceptibility;
		        })


        //median loss y-scale legend
		    svg4.append('text')
  		      .attr('x', "0px")
  		      .attr('y', "380px")
  		      .attr('fill', '#000000')
  		      .attr("text-anchor", "left")
		        .attr("font-family", "Source Sans Pro")
		        .attr('font-weight',600)
		        .style("font-size", "14px")
		        .text("Median Money Loss ($)")


        //susceptibility y-scale legend
		    svg4.append('text')
  		      .attr('x', "0px")
  		      .attr('y', "220px")
  		      .attr('fill', '#C373FC')
  		      .attr("text-anchor", "left")
		        .attr("font-family", "Source Sans Pro")
		        .attr('font-weight',600)
		        .style("font-size", "14px")
		        .text("Susceptibility(%)")



});
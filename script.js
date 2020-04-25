// using d3 for convenience
var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var step = article.selectAll(".step");

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
	var stepH = Math.floor(window.innerHeight * 0.75);
	step.style("height", stepH + "px");
	var figureHeight = window.innerHeight / 2;
	var figureMarginTop = (window.innerHeight - figureHeight) / 2;
	figure
		.style("height", figureHeight + "px")
		.style("top", figureMarginTop + "px");
	scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
	console.log(response);
	// response = { element, direction, index }

	// add color to current step only
	step.classed("is-active", function (d, i) {
		return i === response.index;
	});

	// update graphic based on step
    if (response.index < 1) {
   	  figure.select("p").text("Scam: A scam is a fraudulent scheme generally involving money and some sort of business transaction.");
    } else if (response.index  < 2) {
      figure.select("p").text("next definition");
    } else {
      figure.select("p").text("next definition");
    }

}


function init() {
	// setupStickyfill();

	// 1. force a resize on load to ensure proper dimensions are sent to scrollama
	handleResize();

	// 2. setup the scroller passing options
	// 		this will also initialize trigger observations
	// 3. bind scrollama event handlers (this can be chained like below)
	scroller
		.setup({
			step: "#scrolly article .step",
			offset: 0.33,
			// debug: true
		})
		.onStepEnter(handleStepEnter);

	// setup resize event
	window.addEventListener("resize", handleResize);
}


// kick things off
init();




//shape on the definition slide
var width = 1440,
    height = 700;
var margin = { top: 200, right: 50, bottom: 200, left: 50 },
    width2 = width - margin.left - margin.right,
    height2 = height - margin.top - margin.bottom;


var svg = d3.select('#graph')
      .append('svg')
      .attr('width', width)
      .attr('height', height);
      
var rect = svg.append ("g")
		      .append("rect")
		      .attr('x', 100)
		      .attr('y', 100) 
		      .attr('width', 100)
		      .attr('height', 100)
		      .attr('fill', '#C373FC')
		      //.style("opacity", 0)
      

//Top 10 Rickest Scams 2009 vs 2019 

var category2009=[];
var percentage2009=[];


d3.csv("./data/top10.csv").then(function(data) {
    for (var i=0; i<data.length; i++){
        category2009.push(data[i].first);
        percentage2009.push(data[i].percentage1);
    }
// console.log (percentage)

		var svg1 = d3.select('#graph1')
			         .append('svg')
			         .attr('width', "100%")
			         .attr('height', 750)
			         
		var xScale1 = d3.scaleLinear()
			           .domain([1, 17])
			           .range([0, width2/2-100])
			           
		var xScale2 = d3.scaleLinear()
			           .domain([1, 155])
			           .range([0, width2/2-100])	           
		
		// var tooltip1 = d3.select("#graph1")
		//             .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		//             .append("div")
		//             .style("opacity", 0)
		//             .style("position", "absolute")
		//             .style("color", "#000000")
		//             .style("background", "#FFFAF0")
		// 			.style("font-family", "Source Sans Pro")
		// 			.style("font-size", "12px")
		//             .style("padding", "8px")
		//             .style("z-index", "1000")
		
		var mouseover = function (d) {
		    d3.select(this)
		      .attr('fill', '#C373FC')
		}
		
		var mouseleave = function (d) {
		    d3.select(this)
		      .attr('fill', '#FFFAF0')
		} 
		
		var background = svg1.append('g')
		            .append('rect')
		            .attr("x", 0) 
		            .attr("width", "100%")
			        .attr('y', 0)
		            .attr("height", "800px")
		            .attr('fill', '#000000')
		
		
		//2009 & 2019 bar charts            
		var barchart1 = svg1.append('g')
				            .attr("transform", "translate(70,0)")
				            .selectAll('rect')
				            .data(data)
				            .enter()
				            .append('rect')
				            .attr("x", "20px") 
				            .attr("width", function (d){
				            	return xScale1(d.percentage1)
				            })
					        .attr('y', function(d,i){
					        	return 150 + i*45
					        })
					        .attr("rx",5)
					        .attr("ry",5)			        
				            .attr("height", "40px")
				            .attr('fill', '#FFFAF0')
				            .on("mouseover",mouseover)
				            .on("mouseleave",mouseleave)
				  
		var barchart2 = svg1.append('g')
				            .attr("transform", "translate(70,0)")
				            .selectAll('rect')
				            .data(data)
				            .enter()
				            .append('rect')
				            .attr("x", "720px") 
				            .attr("width", function (d){
				            	return xScale2(d.percentage2)
				            })
					        .attr('y', function(d,i){
					        	return 150 + i*45
					        })
					        .attr("rx",5)
					        .attr("ry",5)
				            .attr("height", "40px")
				            .attr('fill', '#FFFAF0')
				            .on("mouseover",mouseover)
				            .on("mouseleave",mouseleave)		            
				 
		//both x-axis		            
		var xAxis1 = svg1.append('g')
		                .attr("transform", "translate(70,0)")
		                .selectAll('text')
		                .data(data)
				        .enter()
				        .append("text")
				        .attr("x", "30px")
				        .attr("y", function(d,i){
				        	return 175 + i*45
				        })
				        .attr("text-anchor", "left")
				        .attr("font-family", "sans-serif")
				        .style("font-size", "12px")
				        .attr("fill", "#000000")
				        .text(function (d) {
				            return d.first;
				        })
		var xAxis2 = svg1.append('g')
		                .attr("transform", "translate(70,0)")
		                .selectAll('text')
		                .data(data)
				        .enter()
				        .append("text")
				        .attr("x", "730px")
				        .attr("y", function(d,i){
				        	return 175 + i*45
				        })
				        .attr("text-anchor", "left")
				        .attr("font-family", "sans-serif")
				        .style("font-size", "12px")
				        .attr("fill", "#000000")
				        .text(function (d) {
				            return d.second;
				        })		        
				        
				        
		//number on the left                
		var xAxisNumber1 = svg1.append('g')
		                .attr("transform", "translate(70,0)")
		                .selectAll('text')
		                .data(data)
				        .enter()
				        .append("text")
				        .attr("x", "0px")
				        .attr("y", function(d,i){
				        	return 175 + i*45
				        })
				        .attr("text-anchor", "right")
				        .attr("font-family", "sans-serif")
				        .style("font-size", "12px")
				        .attr("fill", "#FFFAF0")
				        .text(function (d,i) {
				            return i+1;
				        })  
		var xAxisNumber2 = svg1.append('g')
		                .attr("transform", "translate(70,0)")
		                .selectAll('text')
		                .data(data)
				        .enter()
				        .append("text")
				        .attr("x", "700px")
				        .attr("y", function(d,i){
				        	return 175 + i*45
				        })
				        .attr("text-anchor", "right")
				        .attr("font-family", "sans-serif")
				        .style("font-size", "12px")
				        .attr("fill", "#FFFAF0")
				        .text(function (d,i) {
				            return i+1;
				        })  
				        
		var onePercent = svg1
		                .append('g')
  		                .selectAll('text')
		                .data(data)
				        .enter()
				        .append("text")
				        .attr("x", function (d){
				            	return xScale1(d.percentage1)+100
				            })
				        .attr("y", function(d,i){
				        	return 175 + i*45
				        })
				        .attr("text-anchor", "right")
				        .attr("font-family", "sans-serif")
				        .style("font-size", "12px")
				        .attr("fill", "#FFFAF0")
				        .text(function (d,i) {
				            return d.percentage1;
				        }) 				        

		var twoPercent = svg1
		                .append('g')
  		                .selectAll('text')
		                .data(data)
				        .enter()
				        .append("text")
				        .attr("x", function (d){
				            	return xScale2(d.percentage2)+800
				            })
				        .attr("y", function(d,i){
				        	return 175 + i*45
				        })
				        .attr("text-anchor", "right")
				        .attr("font-family", "sans-serif")
				        .style("font-size", "12px")
				        .attr("fill", "#FFFAF0")
				        .text(function (d,i) {
				            return d.percentage2;
				        }) 				        
	         
});	         



//Delivery Method 2009 vs 2019 



d3.csv("./data/test.csv").then(function(data) {
	
    d3.csv("./data/test2.csv").then(function(data2) {

		var svg2 = d3.select('#graph2')
			         .append('svg')
			         .attr('width', "100%")
			         .attr('height', 750)

		var horizontalScale = d3.scaleLinear()
			           .domain([0, 100])
			           .range([10, 1000])
			           
	    var tooltip = d3.select("#graph2")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .append("div")
            .style("opacity", 0)
            .style("position", "absolute")
            .style("color", "#FFFAF0")
            .style("background", "#000000")
			.style("font-family", "Source Sans Pro")
			.style("font-size", "14px")
            .style("padding", "8px")
            .style("z-index", "1000")

        var mouseover = function (d) {
               tooltip
                  .style("opacity", 1)
                  .html(d.type+"<br/>"+ d.percentage + " %") 
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



        //2009 Graph
        svg2.append('g')
            .selectAll('rect')
			.data(data)
			.enter()
			.append('rect')
			.attr('x', function (d,i){
               return 100 + horizontalScale(d.total) + 12*i			
				
			}) 
			.attr('y', "100px")
			.attr("width", function (d){
			     return horizontalScale(d.percentage)
			})
			.attr("height", "100px")
			.attr('fill', '#000000')
			.on("mouseover", mouseover)
			.on("mouseleave", mouseleave)

	   
	    //2009 legend		
	    svg2.append("text")
			.attr("x", "112px")
			.attr("y", "20px")
			.attr("text-anchor", "left")
			.attr("font-family", "EB Garamond")
			.style("font-size", "30px")
			.attr("fill", "#000000")
			.text("Scams Delivery Method (% Total)")

	    //2009 legend		
	    svg2.append("text")
			.attr("x", "112px")
			.attr("y", "80px")
			.attr("text-anchor", "left")
			.attr("font-family", "Source Sans Pro")
			.style("font-size", "22px")
			.attr("fill", "#000000")
			.text("2009")

		svg2.append('g')
		  .selectAll('text')
		  .data(data)
		  .enter()
		  .append('text')
		  .attr("x", "1230px")
		  .attr("y", function (d,i) {
               return i*20+60			
		  })
		  .attr("text-anchor", "left")
		  .attr("font-family", "Source Sans Pro")
		  .style("font-size", "12px")
		  .attr("fill", "#000000")
		  .text(function(d,i) {
			   		return (i+1) + ". "+  d.type + ": " + d.percentage + " %";
			})
			
		svg2.append('g')
		   .selectAll('text')
		   .data(data)
		   .enter()
		   .append('text')
		   .attr("x", function (d,i){
               return 100 + horizontalScale(d.total) + 12*i			
			})
		   .attr("y", "220px")
		   .attr("text-anchor", "left")
		   .attr("font-family", "Source Sans Pro")
		   .style("font-size", "12px")
		   .attr("fill", "#000000")
		   .text(function(d,i) {
			   		return i+1;
			})
			
			
			




//2019    
        svg2.append('g')
            .selectAll('rect')
			.data(data2)
			.enter()
			.append('rect')
			.attr('x', function (d,i){
               return 100 + horizontalScale(d.total) + 12*i			
				
			}) 
			.attr('y', "350px")
			.attr("width", function (d){
			     return horizontalScale(d.percentage)
			})
			.attr("height", "100px")
			.attr('fill', '#000000') 
			.on("mouseover", mouseover)
			.on("mouseleave", mouseleave)			

        //2019 legend
	    svg2.append("text")
			.attr("x", "112px")
			.attr("y", "330px")
			.attr("text-anchor", "left")
			.attr("font-family", "Source Sans Pro")
			.style("font-size", "22px")
			.attr("fill", "#000000")
			.text("2019")


		svg2.append('g')
		  .selectAll('text')
		  .data(data2)
		  .enter()
		  .append('text')
		  .attr("x", "1230px")
		  .attr("y", function (d,i) {
               return i*20+310			
		  })
		  .attr("text-anchor", "left")
		  .attr("font-family", "Source Sans Pro")
		  .style("font-size", "12px")
		  .attr("fill", "#000000")
		  .text(function(d,i) {
			   		return (i+1) + ". "+  d.type + ": " + d.percentage + " %";
			})
			
		svg2.append('g')
		   .selectAll('text')
		   .data(data2)
		   .enter()
		   .append('text')
		   .attr("x", function (d,i){
               return 100 + horizontalScale(d.total) + 12*i			
			})
		   .attr("y", "470px")
		   .attr("text-anchor", "left")
		   .attr("font-family", "Source Sans Pro")
		   .style("font-size", "12px")
		   .attr("fill", "#000000")
		   .text(function(d,i) {
			   		return i+1;
			})

    
    
    })

})
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
      figure.select("p").text("next next definition");
    }

}


// function setupStickyfill() {
// 	d3.selectAll(".sticky").each(function () {
// 		Stickyfill.add(this);
// 	});
// }


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
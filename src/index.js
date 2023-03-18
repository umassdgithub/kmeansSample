import "./styles.css";
import * as d3 from "d3";
import "kmeans-engine";

document.getElementById("app").innerHTML = `
<div>
<div id="chart"></div>
</div>
`;

var colorScale = d3.schemeTableau10; //d3.scaleOrdinal(d3.schemeCategory10);

d3.csv(__dirname + "/cars.csv").then(function (data) {
  // Create an array of objects, each representing a car
  console.log(data);

  const cars = data.map((d) => {
    return {
      Model: d.Model,
      Weight: +d.Weight,
      MPG: +d.MPG,
      Acceleration: +d.Acceleration,
      Cluster: +d.Cylinders,
      Horsepower: +d.Horsepower
    };
  });

  // Create the D3.js visualization
  var svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", 800)
    .attr("height", 600);

  var g = svg.append("g");
  // .attr("transform", "translate(" + 400 + "," + 300 + ")");

  const AccelerationScale = d3
    .scaleLinear()
    .domain(d3.extent(cars, (d) => d.Acceleration))
    .range([550, 50]);

  const WeightScale = d3
    .scaleLinear()
    .domain(d3.extent(cars, (d) => d.Weight))
    .range([50, 750]);

  const HorsePowerScale = d3
    .scaleLinear()
    .domain(d3.extent(cars, (d) => +d.Horsepower))
    .range([2, 10]);
  var circles = g
    .selectAll(".circle")
    .data(cars)
    .enter()
    .append("circle")
    .attr("cx", (d) => WeightScale(d.Weight))
    .attr("cy", (d) => AccelerationScale(d.Acceleration))
    .attr("r", 5) //(d) => HorsePowerScale(d.Horsepower))
    .attr("fill", (d) => {
      return colorScale[d.Cluster - 3];
    })
    .on("mouseover", function (event, d) {
      console.log(d);
      // Display detailed information about the car when it is hovered over
      tooltip
        .html(
          d.Model +
            "<br>" +
            "Weight: " +
            d.Weight +
            "<br>" +
            "MPG: " +
            d.MPG +
            "<br>" +
            "Acceleration: " +
            d.Acceleration
        )
        .style("visibility", "visible");
    })
    .on("mousemove", function (event, d) {
      // Update the position of the tooltip when the mouse moves

      tooltip
        .style("top", event.clientY - 10 + "px")
        .style("left", event.clientX + 10 + "px");
    })
    .on("mouseout", function () {
      // Hide

      // Hide the tooltip when the mouse moves away from the circle
      tooltip.style("visibility", "hidden");
    })

    .on("click", function (d) {
      // Display detailed information about the car when it is clicked
      alert(
        d.Model +
          "\n" +
          "Horsepower: " +
          d.Horsepower +
          "\n" +
          "MPG: " +
          d.MPG +
          "\n" +
          "Acceleration: " +
          d.Acceleration
      );
    });

  // Create a color scale for the clusters

  // Create a tooltip element and hide it initially
  var tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("visibility", "hidden");
});

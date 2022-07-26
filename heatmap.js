import * as d3 from "d3";

const svg = d3.select("svg");

let data = [
  {
    city: "London",
    country: "United Kingdom",
    months: [5, 7, 9, 11, 14, 16, 19, 19, 17, 13, 10, 7]
  },

  {
    city: "New York City",
    country: "United States",
    months: [8, 10, 19, 11, 11, 7, 27, 32, 4, 5, 9, 18]
  },

  {
    city: "Reykjavik",
    country: "Iceland",
    months: [-4, 0, 0, -15, -12, 8, 5, 4, 7, 5, 9, 11]
  }
];

svg.attr("width", 900).attr("height", data.length * 300);

const colorScale = d3
  .scaleLinear()
  .domain([-10, 0, 7, 24])
  .range(["#814ee7", "#3f24ec", "#79e87C", "#fe3b3b"]);

const boxScale = d3.scaleLinear().domain([-30, 45]).range([150, 0]);

const unitScale = d3.scaleLinear().domain([0, 100]).rangeRound([32, 212]);

const lineGenerator = d3
  .line()
  .x((_d, _i) => {
    return 260 + 50 * _i;
  })
  .y((_d, _i) => {
    return boxScale(_d);
  });

const dataPoints = svg
  .selectAll("g.data-point")
  .data(data)
  .enter()
  .append("g")
  .attr("class", "data-point")
  .attr("transform", (_d, _i) => {
    return `translate(0, ${_i * 150})`;
  });

dataPoints
  .append("text")
  .attr("x", 175)
  .attr("y", 70)
  .attr("class", "city")
  .text((_d, _i) => {
    return _d.city;
  });

dataPoints
  .append("text")
  .attr("x", 175)
  .attr("y", 95)
  .attr("class", "country")
  .text((_d, _i) => {
    return _d.country;
  });

const months = dataPoints
  .append("g")
  .attr("class", "months")
  .attr("transform", "translate(200, 0");

const monthGroups = months
  .selectAll("g.month")
  .data((_d, _i) => {
    return _d.months;
  })
  .enter()
  .append("g")
  .attr("class", "month")
  .attr("transform", (_d, _i) => {
    return `translate(${_i * 50}, 0)`;
  });

monthGroups
  .append("rect")
  .attr("x", 235)
  .attr("y", 0)
  .attr("width", 50)
  .attr("height", 150)
  .style("fill", (_d, _i) => {
    return colorScale(_d);
  });

monthGroups
  .append("circle")
  .attr("cx", 260)
  .attr("cy", (_d, _i) => {
    return boxScale(_d);
  })
  .attr("r", 15);

const temperatures = monthGroups
  .append("text")
  .attr("class", "temp")
  .attr("x", 260)
  .attr("y", (_d, _i) => {
    return boxScale(_d) + 1;
  })
  .text((_d, _i) => _d)
  .style("fill", (_d, _i) => {
    return colorScale(_d);
  });

dataPoints
  .append("path")
  .datum((_d, _i) => {
    return _d.months;
  })
  .attr("d", (_d, _i) => {
    return lineGenerator(_d);
  });

const selectTag = document.querySelector("select");
selectTag.addEventListener("input", function () {
  if (this.value === "c") {
    temperatures.text((_d, _i) => {
      return _d;
    });
  } else {
    temperatures.text((_d, _i) => {
      return unitScale(_d);
    });
  }
});

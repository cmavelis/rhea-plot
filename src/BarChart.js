import React, { Component } from 'react'
import './App.css'
import { scaleLinear } from 'd3-scale'
import { max, range } from 'd3-array'
import { select } from 'd3-selection'
import { line } from 'd3-shape'
import { axisBottom, axisLeft } from 'd3-axis'
import parse from 'csv-parse'


const getCSVData = (fileName) => {
    // populate wordList from adjacent file
    let data = '';
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                data = xhr.responseText;
            }
        }
    };
    xhr.open('GET', fileName, false);
    xhr.send(null);

    const stream = parse(data, {
        delimiter: ','
    });
    const output = [];

    stream.on('readable', () => {
        let record;
        while (record = stream.read()) {
            output.push([parseFloat(record[0]), parseFloat(record[1])])
        }
    });

    return output
};

const getJSONData = (fileName) => {
    // populate wordList from adjacent file
    let data = '';
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                data = xhr.responseText;
            }
        }
    };
    xhr.open('GET', fileName, false);
    xhr.send(null);

    return data
};


class BarChart extends Component {
   constructor(props){
       super(props);
       this.createBarChart = this.createBarChart.bind(this)
       this.width = 1000;
       this.height = 500;
   }

   componentDidMount() {
      this.createBarChart()
   }

   componentDidUpdate() {
      this.createBarChart()
   }

   createBarChart() {
      const node = this.node;
      // const data =getCSVData('RHEAtest.csv');
      // const data = [[1825, 31753], [1825, 41753], [1825, 51753], [6825, 61753]];
      //  console.log(getJSONData('RHEAtest.json'));
       const jsonData = JSON.parse(getJSONData('RHEAtest.json'));
       console.log(jsonData);
      const yDataOnly = [1, 2, 3, 4, 5, 4, 3, 4, 5, 5, 6, 4, 3, 5, 3, 6, 6, 7, 8, 7, 8, 9, 10];
      const data = jsonData;
      // console.log(data);
      // const yMax = 70000;
      //  const yMax = max(yDataOnly);
       const yMax = 70000;
       const yMin = 60000;
      // const xMax = 6825;
      //  const xMax = yDataOnly.length;
       const xMin = 1825;
       const xMax = 3000;
      const yScale = scaleLinear()
         .domain([yMin, yMax])
         .range([0, this.height]);
      const xScale = scaleLinear()
         .domain([xMin, xMax])
         .range([0, this.width]);
      const xAxis = axisBottom(1825,5000).ticks(100);

      var lineJSON = line()
            .x(function(d) { console.log(d['x'])
                return xScale(d['x'])})
            .y(function(d) { return yScale(d['y'])});


    var lineGenerator = line()
        .y(function(d) { return yScale(d); })
        .x(function(d, i) { return xScale(i); });
    // var pathString = lineGenerator(data);
        var pathString = lineJSON(data);


    select(node)
        .selectAll('path')
        .data([1])
        .enter()
        .append('path');

    select(node)
        .selectAll('path')
        .data([1])
        .exit()
        .remove();

    select(node)
        .selectAll('path')
        .attr('d', pathString)
        .style("fill", "none")
        .style("stroke", "steelblue")

    // select(node)
    //     .append('g')
    //     .attr("class", "x axis")
    //     .attr("transform", "translate(0," + 10 + ")")
    //     .call(xAxis)
   }

render() {
      return <svg ref={node => this.node = node}
      width={this.width} height={this.height}>
      </svg>
   }
}
export default BarChart

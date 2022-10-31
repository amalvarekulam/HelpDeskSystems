//  Candlestick chart

am5.ready(function() {

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chart-candlestick");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

function generateChartData() {
  var chartData = [];
  var firstDate = new Date();
  firstDate.setDate(firstDate.getDate() - 1000);
  firstDate.setHours(0, 0, 0, 0);
  var value = 1200;
  for (var i = 0; i < 5000; i++) {
    var newDate = new Date(firstDate);
    newDate.setDate(newDate.getDate() + i);

    value += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
    var open = value + Math.round(Math.random() * 16 - 8);
    var low = Math.min(value, open) - Math.round(Math.random() * 5);
    var high = Math.max(value, open) + Math.round(Math.random() * 5);

    chartData.push({
      date: newDate.getTime(),
      value: value,
      open: open,
      low: low,
      high: high
    });
  }
  return chartData;
}

var data = generateChartData();

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    focusable: true,
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX"
  })
);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    groupData: true,
    maxDeviation:0.5,
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {pan:"zoom"}),
    tooltip: am5.Tooltip.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation:1,
    renderer: am5xy.AxisRendererY.new(root, {pan:"zoom"})
  })
);

var color = root.interfaceColors.get("background");

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.CandlestickSeries.new(root, {
    fill: color,
    calculateAggregates: true,
    stroke: color,
    name: "MDXI",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    openValueYField: "open",
    lowValueYField: "low",
    highValueYField: "high",
    valueXField: "date",
    lowValueYGrouped: "low",
    highValueYGrouped: "high",
    openValueYGrouped: "open",
    valueYGrouped: "close",
    legendValueText:
      "open: {openValueY} low: {lowValueY} high: {highValueY} close: {valueY}",
    legendRangeValueText: "{valueYClose}",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal",
      labelText: "open: {openValueY}\nlow: {lowValueY}\nhigh: {highValueY}\nclose: {valueY}"
    })
  })
);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    xAxis: xAxis
  })
);
cursor.lineY.set("visible", false);

// Stack axes vertically
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Stacked_axes
chart.leftAxesContainer.set("layout", root.verticalLayout);

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
var scrollbar = am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal",
  height: 10
});
chart.set("scrollbarX", scrollbar);

var sbxAxis = scrollbar.chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    groupData: true,
    groupIntervals: [{ timeUnit: "week", count: 1 }],
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      opposite: false,
      strokeOpacity: 0
    })
  })
);

var sbyAxis = scrollbar.chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

var sbseries = scrollbar.chart.series.push(
  am5xy.LineSeries.new(root, {
    xAxis: sbxAxis,
    yAxis: sbyAxis,
    valueYField: "value",
    valueXField: "date"
  })
);

// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = yAxis.axisHeader.children.push(am5.Legend.new(root, {}));

legend.data.push(series);

legend.markers.template.setAll({
  width: 10
});

legend.markerRectangles.template.setAll({
  cornerRadiusTR: 0,
  cornerRadiusBR: 0,
  cornerRadiusTL: 0,
  cornerRadiusBL: 0
});

// set data
series.data.setAll(data);
sbseries.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);
root._logo.dispose();
}); // end am5.ready()



            // Variable radius pie chart

am5.ready(function() {

  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("chart-pie");
  
  
  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([
    am5themes_Animated.new(root)
    
  ]);
  
  
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
  var chart = root.container.children.push(am5percent.PieChart.new(root, {
    layout: root.verticalLayout
  }));
  
  
  // Create series
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
  var series = chart.series.push(am5percent.PieSeries.new(root, {
    alignLabels: true,
    calculateAggregates: true,
    valueField: "value",
    categoryField: "category",
   
  }));
  
  series.slices.template.setAll({
    strokeWidth: 1,
    stroke: am5.color(0xffffff)
  });
  series.get("colors").set("colors", [
    am5.color("#975DFE"),
    am5.color("#2987DE"),
    am5.color("#FFEE00"),
    am5.color("#ccc")
  
  ]);
  series.labelsContainer.set("paddingTop", 30)
  
  
  // Set up adapters for variable slice radius
  // https://www.amcharts.com/docs/v5/concepts/settings/adapters/
  series.slices.template.adapters.add("radius", function (radius, target) {
    var dataItem = target.dataItem;
    var high = series.getPrivate("valueHigh");
  
    if (dataItem) {
      var value = target.dataItem.get("valueWorking", 0);
      return radius * value / high
    }
    return radius;
  });

  
  // Set data
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
  series.data.setAll([{
    value: 9,
    category: "Open",
   
  }, {
    value: 15,
    category: "Waiting",
   
  }, {
    value: 10,
    category: "Resolved",
   
  }, {
    value: 7,
    category: "Closed",
   
  }, ]);
  
  series.labels.template.setAll({
    fontSize: 12,
    text: "{value}",
    textType: "adjusted",
    radius: 0
  })

  // Create legend
  // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
  var legend = chart.children.push(am5.Legend.new(root, {
    centerX: am5.p50,
    x: am5.p50,
    // marginTop: 40,
    // marginBottom: 40
  }));
  
  legend.data.setAll(series.dataItems);
  legend.valueLabels.template.disabled = true;
  
  
  // Play initial series animation
  // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
  series.appear(1000, 100);
  root._logo.dispose();
  }); // end am5.ready()



        // chart js library line chart



const ctx = document.getElementById('lineChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['', '', '', '', '', ''],
        datasets: [
          {
            // label: 'My First Dataset',
            data: [65, 59, 30, 81, 56, 55, 40],
            fill: false,
            borderColor: '#FEC111',
            tension: 0.1
          },
                     {
            // label: 'My First Dataset',
            data: [5, 9, 70, 41, 6, 35, 60],
            fill: false,
            borderColor: '#DE3F18',
            tension: 0.1
          },
          {
            // label: 'My First Dataset',
            data: [5,29, 60, 51, 26, 35, 70],
            fill: false,
            borderColor: '#85dde9',
            tension: 0.1
          }
          ]
         },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    },
  options: {
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            // grid: {
            //     display: false
            // },
            ticks: {
                display: true
            }
        }
    },
    plugins: {
      legend: {
          display: false,
              }
  }

},
});




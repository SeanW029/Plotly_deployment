function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var sArray = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sNumber = Array.filter(sampleObj => sampleObj.id == sample);

    //  5. Create a variable that holds the first sample in the array.
    var fSample = Number[0];


    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = fSample["otu_ids"]
    var otu_labels = fSample["otu_labels"]
    var sample_values = fSample["sample_values"]

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otu_ids.slice(0, 10).map(otu => `id ${otu}`).reverse()

    // 8. Create the trace for the bar chart. 
    var barData = [
      {x: sample_values.slice(0, 10).reverse(),
      y: yticks,
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation : "h"
      
      }];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found"

    };
     
    })
    // 10. Use Plotly to plot the data with the layout. 
  Plotly.newPlot("bar", barData, barLayout)

  };

// Bar and Bubble charts
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);

}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}
// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {

    // 3. Create a variable that holds the samples array. 
    var sArray = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sNumber = sArray.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var fSample = sNumber[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = fSample["otu_ids"]
    var otu_labels = fSample["otu_labels"]
    var sample_values = fSample["sample_values"]

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otu_ids.slice(0, 10).map(otu => `id ${otu}`).reverse()

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: sample_values.slice(0, 10).reverse(),
      y: yticks,
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
      marker: {
        colorscale: 'Picnic',
        color: sample_values
      }

    }];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found"

    };

    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout)

    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      type: "bubble",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: 'Picnic'
      }

    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      hovermode: 'closest',
      xaxis: { title: "OTU ID" },


    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
  });
}
console.log("connect")

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);

}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}


// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var sArray = data.samples;
    var mArray = data.metadata
    // Create a variable that filters the samples for the object with the desired sample number.
    var sNumber = sArray.filter(sampleObj => sampleObj.id == sample);
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var sNumber2 = mArray.filter(sampleObj => sampleObj.id == sample);
    // Create a variable that holds the first sample in the array.
    var fSample = sNumber[0];

    // 2. Create a variable that holds the first sample in the metadata array.
    var fSample2 = sNumber2[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = fSample["otu_ids"]
    var otu_labels = fSample["otu_labels"]
    var sample_values = fSample["sample_values"]


    // 3. Create a variable that holds the washing frequency.
    var washFreq = fSample2['wfreq']
    // Create the yticks for the bar chart.
    var yticks = otu_ids.slice(0, 10).map(otu => `id ${otu}`).reverse()

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: sample_values.slice(0, 10).reverse(),
      y: yticks,
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
      marker: {
        colorscale: 'Picnic',
        color: sample_values
      }

    }];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found"

    };

    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot("bar", barData, barLayout);

    var bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      type: "bubble",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: 'Picnic'
      }

    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      hovermode: 'closest',
      xaxis: { title: "OTU ID" },


    };

    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);


    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: washFreq,
        title: { text: "Wash Frequency" },
        type: "indicator",
        mode: "gauge+number",
        delta: { reference: 400 },
        gauge: {
          axis: { range: [null, 10] },
          bar: { color: 'white' },
          steps: [
            {
              range: [0, 2],
              color: 'lightblue'
            },
            {
              range: [2, 4],
              color: 'blue'
            },
            {
              range: [4, 6],
              color: 'purple'
            },
            {
              range: [6, 8],
              color: 'magenta'
            },
            {
              range: [8, 10],
              color: 'lightpink'
            }

          ]
        }
      }

    ];

    // 5. Create the layout for the gauge chart.
    var gaugeLayout = {
      width: 600, height: 400

    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
  });
}
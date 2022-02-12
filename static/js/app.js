
function demographic(sample, data) {
    d3.json("../Data/samples.json").then((data) => {
    var metadata = data.metadata;
    let demoPanel = d3.select('#sample-metadata')
    demoPanel.html('');
    let filteredData = metadata.filter(sampleName => sampleName.id == sample)[0]
    Object.entries(filteredData).forEach(([key, value]) => {
        demoPanel.append("h6").text(`${key}: ${value}`);
    });
});

}

function buildCharts(sample) {


    d3.json("../Data/samples.json").then((data) => {
        var samples = data.samples;
        var resultsarray = samples.filter(sampleobject =>
            sampleobject.id == sample);
        var result = resultsarray[0]

        var ids = result.otu_ids;
        var labels = result.otu_labels;
        var values = result.sample_values;

        var LayoutBubble = {
            margin: { t: 0 },
            xaxis: { title: "OTU ID" },
            hovermode: "closest",
        };

        var DataBubble = [
            {
                x: ids,
                y: values,
                text: labels,
                mode: "markers",
                marker: {
                    color: ids,
                    size: values,
                }
            }
        ];

        Plotly.newPlot("bubble", DataBubble, LayoutBubble);



        var bar_data = [
            {
                y: ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
                x: values.slice(0, 10).reverse(),
                text: labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h"

            }
        ];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", bar_data, barLayout);
    });
}



function init() {
    var selector = d3.select("#selDataset");
    d3.json("../Data/samples.json").then(data => {
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
          selector
            .append("option")
            .text(sample)
            .property("value", sample);
        });
      
        var firstSample =data.metadata[0].id;
        demographic(firstSample, data);
        buildCharts (firstSample, data);
    });
}

function optionChanged(newSample) {
    demographic(newSample);
    buildCharts(newSample);
    }



init();

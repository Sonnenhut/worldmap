import {countryName, countryMap} from './countryname.js';

google.charts.load('current', {
    'packages':['geochart']
    /*,'mapsApiKey': ''*/
});
google.charts.setOnLoadCallback(initialize);
let chart;
let data = [['Country', 'Popularity']];
function initialize() {
    chart = new google.visualization.GeoChart(document.getElementById('regions'));
    google.visualization.events.addListener(chart,'regionClick', onRegionClick);
    draw();
}

function draw() {
    let dataTable = google.visualization.arrayToDataTable(data);
    let options = {
        displayMode: 'regions',
        legend: 'none'
    };
    chart.draw(dataTable, options);

    // initialize download link
    setTimeout(() => document.getElementById('download').href = chart.getImageURI(), 200);

}

function onRegionClick(clicked) {
    console.log(clicked);
    const key = clicked.region;
    const lengthBefore = data.length;
    data = data.filter(d => d[0] !== key);
    // if the region was already present
    if(lengthBefore === data.length) {
        // add region if it was not already present
        data.push([key, 100]);
    }
    draw();
    document.querySelector('#last').innerHTML = countryName(key);
}
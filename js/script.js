// This script demonstrates some simple things one can do with leaflet.js


var map = L.map('map').setView([40.65,-73.93], 12);

// set a tile layer to be CartoDB tiles 
var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
  attribution: 'Map Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors, Map Tiles &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

// add these tiles to our map
map.addLayer(CartoDBTiles);


$.getJSON( "data/acs_data_joined.geojson", function( data ) {
    var dataset = data;
    plotDataset(dataset); 
});


function plotDataset(dataset) {
    var acsGeoJSON = L.geoJson(dataset, {
        style: acsStyle,
        onEachFeature: acsOnEachFeature
    }).addTo(map);    
}


var acsStyle = function (feature, latlng) {

    var numerator = parseFloat(feature.properties.ACS_13_5YR_B07201_HD01_VD14);
    var denominator = parseFloat(feature.properties.ACS_13_5YR_B07201_HD01_VD01);
    var percentage = (numerator/denominator) * 100;


    var style = {
        weight: 1,
        opacity: .25,
        color: 'grey',
        fillOpacity: fillOpacity(percentage),
        fillColor: fillColorPercentage(percentage)
    };

    return style;

}


function fillColor(d) {
    return d > 200 ? '#006d2c' :
           d > 150 ? '#31a354' :
           d > 100 ? '#74c476' :
           d > 50  ? '#a1d99b' :
           d > 25  ? '#c7e9c0' :
                     '#edf8e9';
}

function fillColorPercentage(d) {
    return d > 20 ? '#006d2c' :
           d > 10 ? '#31a354' :
           d > 5 ? '#74c476' :
           d > 3 ? '#a1d99b' :
           d > 2  ? '#c7e9c0' :
                    '#edf8e9';
}

function fillOpacity(d) {
    return d == 0 ? 0.0 :
                    0.75;
}


var acsOnEachFeature = function(feature,layer){ 
    var numerator = parseFloat(feature.properties.ACS_13_5YR_B07201_HD01_VD14);
    var denominator = parseFloat(feature.properties.ACS_13_5YR_B07201_HD01_VD01);
    var percentage = ((numerator/denominator) * 100).toFixed(0);


    // let's bind some feature properties to a pop up
    layer.bindPopup("<strong>Total Population:</strong> " + denominator + "<br /><strong>Population Moved to US in Last Year:</strong> " + numerator + "<br /><strong>Percentage Moved to US in Last Year:</strong> " + percentage + "%");
}



/*
// first we need to define how we would like the layer styled
var checkCashingStyle = function (feature, latlng){
    var checkCashingMarker = L.circleMarker(latlng, {
        stroke: false,
        fillColor: fillColor(feature.properties.amount),
        fillOpacity: 1,
        radius: radius(feature.properties.customers)
    });
    
    return checkCashingMarker;
    
}

var checkCashingInteraction = function(feature,layer){    
    var highlight = {
        stroke: true,
        color: '#ffffff', 
        weight: 3,
        opacity: 1,
    };

    var clickHighlight = {
        stroke: true,
        color: '#f0ff00', 
        weight: 3,
        opacity: 1,
    };

    var noHighlight = {
        stroke: false,
    };
    
    //add on hover -- same on hover and mousemove for each layer
    layer.on('mouseover', function(e) {
        //highlight point
        layer.setStyle(highlight);

        // ensure that the dot is moved to the front
        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }
        
    });
        
    layer.on('mouseout', function(e) {
        // reset style
        layer.setStyle(noHighlight); 
                        
    });
    
    // on click 
    layer.on("click",function(e){
        // bind popup and open on the map
        layer.bindPopup('<div class="popupStyle"><h3>' + feature.properties.name + '</h3><p>'+ feature.properties.address + '<br /><strong>Amount:</strong> $' + feature.properties.amount + '<br /><strong>Customers:</strong> ' + feature.properties.customers + '</p></div>').openPopup();

        // set new style for clicked point
        layer.setStyle(clickHighlight); 
    });
    
    
}

var neighborhoodsGeoJSON = L.geoJson(neighborhoods, {
    style: ,
    onEachFeature: 
}).addTo(map);
*/


// add in layer controls
var baseMaps = {
};

var overlayMaps = {
    //"Pawn Shops": pawnShopsGeoJSON,
};

// add control
L.control.layers(baseMaps, overlayMaps).addTo(map);



// add in a legend to make sense of it all
// create a container for the legend and set the location






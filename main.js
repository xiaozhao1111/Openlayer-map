import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const mapView = new View({
  center: [0, 0],
  zoom: 2,
})

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: mapView,
});


function getGeoData(placeName) {
  let queryURL = 'https://api.opencagedata.com/geocode/v1/json?key=d29f7107b3d343c7b01affdd5a6ed6c4&q='
  queryURL += placeName;
  $.ajax({
    url: queryURL,
    method: 'GET'
  })
  .then(function(response){
    mapTo(response.results[0].annotations.Mercator);
  })
}

function mapTo(Mercator) {
  console.log(Mercator.x);
  let newCenter = [Mercator.x, Mercator.y];
  mapView.animate({
    zoom: 2,
    duration: 2000,
  },
  {
    center: newCenter,
    duration: 2000,
  },
  {
    zoom: 10,
    duration: 2000,
  })
}


$('#search-button').on('click', function (event)  {
  event.preventDefault();
  let inputName =  $('#search-input').val().trim();
  getGeoData(inputName);
})

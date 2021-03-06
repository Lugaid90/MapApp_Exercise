
var pickedX = undefined;
var pickedY = undefined;


// Setting up ARCGis Map
// 
require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",

    "esri/layers/FeatureLayer",
    "dojo/dom", 
    "/widget/coordWidget.js",
    "/widget/weatherWidget.js",
    "dojo/domReady!"
    ],
    function (esriConfig, Map, MapView,  FeatureLayer, dom,  CoordWidget,  WeatherWidget) {
        esriConfig.apiKey = "AAPK9e07baae114644c084259499cb4d40dfPLsifNx65bytHxoBSrRA-dtJO_TN5jhYyvNuj5r8PXLYEhDbcIbJLq368-rwDfZi";


        // Setting up Dijit Widgets
        var coordWidgetContainer = dom.byId("coordWidget");
        var coordWidget = new CoordWidget("").placeAt(coordWidgetContainer);
        
        var weatherWidgetContainer = dom.byId("weatherWidget");
        var weatherWidget = new WeatherWidget("").placeAt(weatherWidgetContainer);
        
        // initializing forecast entries in the weather widget
        weatherWidget.initializeForecast();

        const map = new Map({
            basemap: "dark-gray-vector"
        });

        const view = new MapView({
            map: map,
            center: [7.466413, 51.513822 ], // Longitude, latitude
            zoom: 4, // Zoom level
            container: "viewDiv" // Div element/ Anchor tag in the main html
        });
        
        
        // Setting up listener to update the coordinate- and weather- widget  
        //  with selected coordinates and weather forecast
        view.on("click", function(evt){
            //Get Point Coordinates
            const params = {
                location: evt.mapPoint
            };
            longitude = evt.mapPoint.longitude;
            latitude = evt.mapPoint.latitude;

            // update the coordinate Widget
            coordWidget.updateCoordinates(latitude, longitude);


            //Update Weather Widget with reverse geocode and weather forecast

            // Consume the OpenCageData API for Reverse Geocoding
            // var API_KEY = '1f5aa7d5392b4351aeaa6d83eadf550e'; // Conterra key, doesn't work :(
            var API_KEY = '2c84cd9d031745ccadca366dcc0bd7a6';
            var api_url = 'https://api.opencagedata.com/geocode/v1/json'
            var request_url = api_url
                + '?'
                + 'key=' + API_KEY
                + '&q=' + encodeURIComponent(latitude + ',' + longitude)
                + '&pretty=1'
                + '&no_annotations=1';

            fetch(request_url)
            .then( (response) => response.json())
            .then((data)=> {
                if (typeof data.results[0] !== 'undefined'){
                    weatherWidget.updateAdress(data.results[0].formatted);
                }
                else{
                    weatherWidget.updateAdress("No Adress found");
                }
            } )
            .catch( (error) => console.error(error));


            // Consume the OpenWeatherMap API for Weather Forecast
            var API_KEY_wthr = '6b904086651c872d0e2c58c1529d2dcb';
            var api_url_wthr = 'http://api.openweathermap.org/data/2.5/forecast'
            var request_url_wthr = api_url_wthr
                + '?'
                + 'lat=' +  latitude
                + '&lon=' +  longitude
                + '&appid=' + API_KEY_wthr;
            
            fetch(request_url_wthr)
            .then( (response) => response.json())
            .then((data)=> {
                weatherWidget.updateForecast(data);  
                } )
            .catch( (error) => console.error(error));
            
        });


        // Importing a service layer containing informations about cities
        //

        // visual styling of city markers
        const citiesRenderer = {
            type: "simple",
            symbol: {
                type: "simple-marker",
                size: 5,
                color: [18, 230, 25],
                outline: null
            },

            visualVariables: [
            {
                type: "size",
                field: "POP",
                minDataValue: 0,
                maxDataValue: 5e6,//reasonable range for european cities
                minSize: "3px",
                maxSize: "30px"
            }
            ]
        };
        
        // visual styling of city labels
        const citiesLabels = {
            symbol: {
                type: "text",
                color: "#FFFFFF",
                haloColor: "#5E8D74",
                haloSize: "2px",
                font: {
                    size: "12px",
                    family: "Noto Sans",
                    style: "italic",
                    weight: "normal"
                }
            },
            labelPlacement: "above-center",
            labelExpressionInfo: {
                expression: "$feature.CITY_NAME"
            }
        };

        // creating the feature layer and importing the city data
        const citiesLayer = new FeatureLayer({
            url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Cities/FeatureServer/0",
            renderer: citiesRenderer,
            labelingInfo: [citiesLabels]
        });
        
        // connecting city data to the map
        map.add(citiesLayer, 0);

        

    });

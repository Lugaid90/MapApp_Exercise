
var pickedX = undefined;
var pickedY = undefined;


// Setting up ARCGis Map
// 
require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",

    "esri/layers/GraphicsLayer",
    "esri/layers/FeatureLayer",
    "esri/rest/locator",
    "dojo/dom", 
    "/widget/AuthorWidget.js",
    "dojo/domReady!"
    ],
    function (esriConfig,Map, MapView,  GraphicsLayer, FeatureLayer,locator, dom,  AuthorWidget) {
        esriConfig.apiKey = "AAPK9e07baae114644c084259499cb4d40dfPLsifNx65bytHxoBSrRA-dtJO_TN5jhYyvNuj5r8PXLYEhDbcIbJLq368-rwDfZi";


        // Setting up Dijit Widget
        var authorContainer = dom.byId("coordWidget");
        var coordWidget = new AuthorWidget("").placeAt(authorContainer);
        


        const map = new Map({
            // basemap: "arcgis-topographic" // Basemap layer service
            basemap: "dark-gray-vector" // Basemap layer service
        });

        const view = new MapView({
            map: map,
            center: [7.466413, 51.513822 ], // Longitude, latitude
            //center: [7.464773, 51.514290], // Longitude, latitude
            zoom: 4, // Zoom level
            container: "viewDiv" // Div element
        });
        
        
        view.on("click", function(evt){
            const params = {
                location: evt.mapPoint
            };
            
            longitude = evt.mapPoint.longitude;
            latitude = evt.mapPoint.latitude;
            // var mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
            // console.log(mp)
            coordWidget.updateCoordinates(latitude, longitude);
            
        });

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

        // Reference query layer
        const citiesLayer = new FeatureLayer({
            url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Cities/FeatureServer/0",
            renderer: citiesRenderer,
            labelingInfo: [citiesLabels]
        });
        
        map.add(citiesLayer, 0);

    });

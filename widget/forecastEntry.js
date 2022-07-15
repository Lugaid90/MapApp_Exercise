define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/forecastEntry.html"
], function(declare,  _WidgetBase, _TemplatedMixin, template){
    return declare([_WidgetBase, _TemplatedMixin], {

        // referencing the html-template file
        templateString: template,

        // A class to be applied to the root node in our template
        baseClass: "forecastEntry",


        //overloading postCreate function from WidgetBase which is fired
        // after Widget-Dom is created but before it is appended to the main page
        postCreate: function(){
            // Run any parent postCreate processes 
            this.inherited(arguments);
        
        },

        // costum setter function which is ment to be used
        //  in a callback for a click listener
        updateAdress: function(adress){
            this.adressNode.innerHTML=adress;
        },

        updateForecast: function(forecastObject){
            date = forecastObject.dt_txt,
            temp = (forecastObject.main.temp - 273.15).toFixed(1) + "° C", // from Kelvin to Celsius
            hum = forecastObject.main.humidity  + " %",
            cloud = forecastObject.clouds.all  + " %",
            wind = (forecastObject.wind.speed*3.6).toFixed(1)   + " km/h"; // m/s to km/h

            this.dateNode.innerHTML=date;
            this.tempNode.innerHTML=temp;
            this.humNode.innerHTML=hum;
            this.cloudNode.innerHTML=cloud;
            this.windNode.innerHTML=wind;
        }
    });
    
});
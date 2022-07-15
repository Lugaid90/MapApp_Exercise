define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/weatherWidget.html"
], function(declare,  _WidgetBase, _TemplatedMixin, template){
    return declare([_WidgetBase, _TemplatedMixin], {

        // referencing the html-template file
        templateString: template,

        // A class to be applied to the root node in our template
        baseClass: "weatherWidget",


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

        updateForecast: function(dataObj){

            forecst5d = dataObj.list[dataObj.cnt-1];
            date = forecst5d.dt_txt,
            temp = (forecst5d.main.temp - 273.15).toFixed(1) + "° C", // from Kelvin to Celsius
            hum = forecst5d.main.humidity  + " %",
            cloud = forecst5d.clouds.all  + " %",
            wind = (forecst5d.wind.speed*3.6).toFixed(1)   + " km/h"; // m/s to km/h

            this.dateNode.innerHTML=date;
            this.tempNode.innerHTML=temp;
            this.humNode.innerHTML=hum;
            this.cloudNode.innerHTML=cloud;
            this.windNode.innerHTML=wind;
        }
    });
    
});
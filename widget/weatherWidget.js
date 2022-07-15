define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/dom", 
    "/widget/forecastEntry.js",
    "dojo/text!./templates/weatherWidget.html"
], function(declare,  _WidgetBase, _TemplatedMixin, dom, forecastEntry, template){
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

        // Pre-Creating Container for forecast entries
        entry_array: [],    // stores forecast entry for later update
        initializeForecast: function(){
            entry_array = [];
            for(let i = 0; i < 40; i++){
                var forecastWidgetContainer = dom.byId("nestedEntryHook");
                var forecastWidget = new forecastEntry("").placeAt(forecastWidgetContainer);
                entry_array.push(forecastWidget);
            }
        },

        updateForecast: function(dataObj){
            forecst_list = dataObj.list;

            if (forecst_list.length!== entry_array.length){
                console.error("Error in updateForecast(): array lengths aren't matching");
            }

            for(let i=0; i<forecst_list.length; i++){
                forecastEntry = forecst_list[i];
                entryWidget = entry_array[i];
                entryWidget.updateForecast(forecastEntry);
            }
        }
    });
    
});
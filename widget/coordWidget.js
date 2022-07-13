define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/coordWidget.html"
], function(declare,  _WidgetBase, _TemplatedMixin, template){
    return declare([_WidgetBase, _TemplatedMixin], {

        // referencing the html-template file
        templateString: template,

        // A class to be applied to the root node in our template
        baseClass: "coordWidget",


        //overloading postCreate function from WidgetBase which is fired
        // after Widget-Dom is created but before it is appended to the main page
        postCreate: function(){
            // Run any parent postCreate processes 
            this.inherited(arguments);
        
        },

        // costum setter function which is ment to be used
        //  in a callback for a click listener
        updateCoordinates: function(latitude, Longitude){
            this.latNode.innerHTML=latitude.toFixed(6);
            this.longNode.innerHTML=Longitude.toFixed(6);
        }
    });
    
});
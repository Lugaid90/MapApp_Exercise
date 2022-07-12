define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/AuthorWidget.html"
], function(declare,  _WidgetBase, _TemplatedMixin, template){
    return declare([_WidgetBase, _TemplatedMixin], {

        // referencing the html-template file
        templateString: template,

        // A class to be applied to the root node in our template
        baseClass: "authorWidget",


        //overloading postCreate function from WidgetBase which is fired
        // after Widget-Dom is created but before it is appended to the main page
        postCreate: function(){
            // Run any parent postCreate processes - can be done at any point
            this.inherited(arguments);
        
        },

        testFunction: function(){
            console.log("test successfully YEAH :D");
        },

        updateCoordinates: function(latitude, Longitude){
            this.latNode.innerHTML=latitude.toFixed(2);
            this.longNode.innerHTML=Longitude.toFixed(2);
        }
    });
    
});
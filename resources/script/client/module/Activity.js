define([
	"dojo/_base/declare",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dojo/text!../templates/activity.html",
	"dojo/dom-style"
],function(declare, _WidgetBase, _TemplatedMixin, template, domStyle){
	return declare([_WidgetBase, _TemplatedMixin], {
		imageWidth : 300,
		imageHeight : 200,
		title : "",
		content : "",
		author : "",
		browse : "",
		actTarget : "",
		actImage : "",
		authorImage: "",
		templateString : template,
		baseClass : "act",

		postCreate: function(){
			this.inherited(arguments); // base constructor
			domStyle.set(this.domNode, "width", this.imageWidth+"px");
		},
		
		_setActTargetAttr: function(act){
			if(act != ""){
				this._set("actTarget", act);
				this.actNode.href = act;
			}
		},

		_setActImageAttr : function(actImg){
			if(actImg != ""){
				this._set("actImage", actImg);
				this.schemaNode.src = actImg;
				domStyle.set(this.schemaNode, "width", this.imageWidth+"px");
				domStyle.set(this.schemaNode, "height", this.imageHeight+"px");
			}
		},

		_setAuthorImageAttr : function(authorImg){
			if(authorImg != ""){
				this._set("authorImage", authorImg);
				this.authorNode.src = authorImg;
			}
		}
	});
});
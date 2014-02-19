define([
	"dojo/_base/declare",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dojo/text!../templates/listactivity.html",
	"dojo/dom-style"
],function(declare, _WidgetBase, _TemplatedMixin, template, domStyle){
	return declare([_WidgetBase, _TemplatedMixin], {
		imageWidth : 50,
		imageHeight : 50,
		title : "",
		author : "",
		time : "",
		authorImg : "",
		authorRef : "",
		activityRef : "",
		
		templateString : template,
		baseClass : "list",

		postCreate: function(){
			this.inherited(arguments); // base constructor
		},

		_setAuthorImgAttr : function(authorImg){
			if(authorImg != ""){
				this._set("authorImg", authorImg);
				this.authorImgNode.src = authorImg;
				domStyle.set(this.authorImgNode, "width", this.imageWidth+"px");
				domStyle.set(this.authorImgNode, "height", this.imageHeight+"px");
			}
		},
		
		_setAuthorRefAttr : function(authorRef){
			if(authorRef != ""){
				this._set("authorRef", authorRef);
				this.authorRefNode.href = authorRef;
				this.authorDetailNode.href = authorRef;
			}
		},
	
		_setActivityRefAttr : function(activityRef){
			if(activityRef != ""){
				this._set("activityRef", activityRef);
				this.titleRefNode.href = activityRef;
			}
		}
	});
});
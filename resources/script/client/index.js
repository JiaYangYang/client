require([
    'dojo/dom',
    'dojo/on',
	'dojo/dom-construct',
	'dojo/request',
	'dojo/_base/array',
    'client/module/Slider',
    'client/module/Activity',
    'client/module/ListActivity',
    'dojo/domReady!'],
    function (dom, on, domConstruct, request, array, Slider, Activity, ListActivity) {
        var node = dom.byId('slider');
        node && new Slider({
            layout: [
                {
                    href: 'http://www.google.com',
                    target: '_blank',
                    src: 'resources/images/image-slider-1.jpg',
                    alt: 'Welcome to YouthClub'
                },
                {
                    src: 'resources/images/image-slider-2.jpg',
                    alt: 'Taste of Happniess'
                },
                {
                    src: 'resources/images/image-slider-3.jpg',
                    alt: 'Pure Javascript. No jQuery. No flash.'
                }
            ]
        }, node);

        node = dom.byId('publishButton');
        var signal = on(node, 'click', function() {
            signal.remove();
            location.assign('event/publish.html');
        });
		
		/* hot activity*/
		request("/client/server/rest/data/hot.json", {
			handleAs : "json"
			}).then(function(hot){
				var latest = dom.byId('hot');
				var left = domConstruct.create('div', {className:'listleft'}, latest);
				var right = domConstruct.create('div', {className:'listright'}, latest);
				var firstline = domConstruct.create('ul', {className:'figrueslist'}, right);
				var secondline = domConstruct.create('ul', {className:'figrueslist'}, right);
				
				array.forEach(hot, function(act, idx){
					if(0 == idx){
						act.imageWidth = 300;
						act.imageHeight = 235;
						var actLeft = new Activity(act).placeAt(left);
					}
					else{
						act.imageWidth = 186;
						act.imageHeight = 83;
						var pos = null;
						if(idx>=1 && idx<=2){
							pos = firstline;
						}
						else if(idx>=3 && idx<=4){
							pos = secondline;								
						}

						var li = domConstruct.create('li',{className:'figure'}, pos);
						var actFirst = new Activity(act).placeAt(li);
					}
				});
			});

		/* latest activity*/
		request("/client/server/rest/data/latest.json", {
			handleAs : "json"
			}).then(function(hot){
				var latest = dom.byId('latest');
				var left = domConstruct.create('div', {className:'listleft'}, latest);
				var right = domConstruct.create('div', {className:'listright'}, latest);
				var firstline = domConstruct.create('ul', {className:'figrueslist'}, right);
				var secondline = domConstruct.create('ul', {className:'figrueslist'}, right);
				
				array.forEach(hot, function(act, idx){
					if(0 == idx){
						act.imageWidth = 300;
						act.imageHeight = 235;
						var actLeft = new Activity(act).placeAt(left);
					}
					else{
						act.imageWidth = 186;
						act.imageHeight = 83;
						var pos = null;
						if(idx>=1 && idx<=2){
							pos = firstline;
						}
						else if(idx>=3 && idx<=4){
							pos = secondline;								
						}

						var li = domConstruct.create('li',{className:'figure'}, pos);
						var actFirst = new Activity(act).placeAt(li);
					}
				});
			});

		/*travel*/
		request("/client/server/rest/data/travel.json", {
				handleAs : "json"
			}).then(function(travels){
				var ul = domConstruct.create("ul", null, 'travel');
				array.forEach(travels, function(travel){
					var li = domConstruct.create("li", null, ul);
					domConstruct.create("a", {innerHTML:travel.title, href:travel.target}, li);
				});
			});

		/*right Pane*/
		domConstruct.create("h3",{class:'title', innerHTML:'Recent Activity'}, 'recent');
		domConstruct.create("h3",{class:'title', innerHTML:'Recommendation'}, 'recommendation');
		domConstruct.create("h3",{class:'title', innerHTML:'Advisory Commen Sense'}, 'advisory');

		request("/client/server/rest/data/recent.json", {
				handleAs : "json"
			}).then(function(acts){
				var ul = domConstruct.create("ul", null, 'recent');
				array.forEach(acts, function(act){
					var li = domConstruct.create("li", null, ul);
					var listact = new ListActivity(act).placeAt(li);
				});
			});

		request("/client/server/rest/data/recommendation.json", {
				handleAs : "json"
			}).then(function(routes){
				var ul = domConstruct.create("ul", null, 'recommendation');
				array.forEach(routes, function(route){
					var li = domConstruct.create("li", null, ul);
					var listact = new ListActivity(route).placeAt(li);
				});
			});

		request("/client/server/rest/data/advisory.json", {
			handleAs : "json"
			}).then(function(advisory){
				var ul = domConstruct.create("ul", null, 'advisory');
				array.forEach(advisory, function(adv){
					var li = domConstruct.create("li", null, ul);
					domConstruct.create("a", {innerHTML:adv.title, href:adv.target}, li);
				});
		});
    });
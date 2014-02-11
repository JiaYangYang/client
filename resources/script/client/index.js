require(['dojo/dom',
    'client/module/Slider',
    'dojo/domReady!'],
    function (dom, Slider) {
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
    });
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-12004652-3']);
_gaq.push(['_trackPageview']);

var initGA = function () {

    (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();

};

var initTracking = function () {

    initGA();
    //init xiti



};
/*! grunt-grunticon Stylesheet Loader - v2.1.6 | https://github.com/filamentgroup/grunticon | (c) 2015 Scott Jehl, Filament Group, Inc. | MIT license. */

(function(e){function n(n,t,o,a){"use strict";var r=e.document.createElement("link"),i=t||e.document.getElementsByTagName("script")[0],c=e.document.styleSheets;return r.rel="stylesheet",r.href=n,r.media="only x",a&&(r.onload=a),i.parentNode.insertBefore(r,i),r.onloadcssdefined=function(e){for(var t,o=0;c.length>o;o++)c[o].href&&c[o].href.indexOf(n)>-1&&(t=!0);t?e():setTimeout(function(){r.onloadcssdefined(e)})},r.onloadcssdefined(function(){r.media=o||"all"}),r}function t(e,n){e.onload=function(){e.onload=null,n&&n.call(e)},"isApplicationInstalled"in navigator&&"onloadcssdefined"in e&&e.onloadcssdefined(n)}var o=function(a,r){"use strict";if(a&&3===a.length){var i=e.Image,c=!(!document.createElementNS||!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect||!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")||e.opera&&-1===navigator.userAgent.indexOf("Chrome")||-1!==navigator.userAgent.indexOf("Series40")),d=new i;d.onerror=function(){o.method="png",o.href=a[2],n(a[2])},d.onload=function(){var e=1===d.width&&1===d.height,i=a[e&&c?0:e?1:2];o.method=e&&c?"svg":e?"datapng":"png",o.href=i,t(n(i),r)},d.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",document.documentElement.className+=" grunticon"}};o.loadCSS=n,o.onloadCSS=t,e.grunticon=o})(this);
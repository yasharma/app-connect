'use strict';
angular.module('app.directives')
.directive('navMenu', ['$location', function($location) {
    return function(scope, element, attrs) {
        var links = element.find('a'),
            currentLink,
            urlMap = {},
            activeClass = attrs.navMenu || 'active';

        for (var i = links.length - 1; i >= 0; i--) {
            var link = angular.element(links[i]);
            var url = angular.isUndefined(link.attr('href')) ? link.attr('ng-href'): link.attr('href');
            
            if (url.substring(0,1) === '#') {
                urlMap[url.substring(1)] = link;
            } else {
                urlMap[url] = link;
            }
        }

        scope.$on('$routeChangeStart', function() {
            var path = urlMap[$location.path()];
            links.parent('li').removeClass(activeClass);
            if (path) {
                path.parent('li').addClass(activeClass);
            }
        });
    };
}]);
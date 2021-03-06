var HRSupport = angular.module("HRSupport");


HRSupport.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

HRSupport.filter("JsonToNormalDate", function () {
    return function (x) {
        if (x == null) return null;
        var m = x.match(/\d+/);
        if (m) return new Date(parseInt(m));
        else return null;
    };
});


HRSupport.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
HRSupport.directive(
    'dateInput',
    function (dateFilter) {
        return {
            require: 'ngModel',
            template: '<input type="date"></input>',
            replace: true,
            link: function (scope, elm, attrs, ngModelCtrl) {
                ngModelCtrl.$formatters.unshift(function (modelValue) {
                    return dateFilter(modelValue, 'yyyy-MM-dd');
                });

                ngModelCtrl.$parsers.unshift(function (viewValue) {
                    return new Date(viewValue);
                });
            },
        };
    });

HRSupport.filter('highlight', function ($sce) {
    return function (text, phrase) {
        if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
          '<span class="highlighted">$1</span>')

        return $sce.trustAsHtml(text)
    }
});
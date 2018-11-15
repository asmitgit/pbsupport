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
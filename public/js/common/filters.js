'use strict';

/* Filters */
angular.module('hal.sysnet.filters', [])
    .filter('checkmark', function () {
        return function (input) {
            return input ? '\u2713' : '\u2718';
        }})
    .filter("sum", function(){
        return function(input, params){
            var totalSum = 0;
            for(var x = 0; x < input.length; x++){
                totalSum += input[x][params];
            }
            return totalSum;
        }
    });




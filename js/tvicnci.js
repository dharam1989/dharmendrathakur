/*
ngprogress 1.1.2 - slim, site-wide progressbar for AngularJS 
(C) 2013 - Victor Bjelkholm 
License: MIT 
Source: https://github.com/VictorBjelkholm/ngProgress 
Date Compiled: 2015-07-27 
*/
angular.module('TVINCI', ['ng'])
    .service('callme', function () {
        this.hello = function(test){
              return "Hello "+ test;
        }
        return this;
    }).factory('myfactory', function () {
        var obj= {};
        
        obj.callfac = function(){
            return "my factory callling ";
        }
        
        return obj;
    });

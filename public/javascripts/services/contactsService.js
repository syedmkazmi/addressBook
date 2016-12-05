/**
 * Created by syedkazmi on 04/12/2016.
 */

angular.module('contactService', [])

    .factory('httpService', function($http, $q) {

        var deferred = $q.defer();
        var factory = {};

        factory.getContacts = function(){

            return $http.get('https://randomuser.me/api/?results=100')
                .then(function(response){
                    //promise is fulfilled
                    deferred.resolve(response.data);

                    //promise is returned
                    // return deferred.promise;
                    return response.data;

                }, function(response){
                    deferred.reject(response);

                    //promise is returned
                    return deferred.promise;
                });
        };

        return factory;
    });
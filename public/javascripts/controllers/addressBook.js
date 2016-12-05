/**
 * Created by syedkazmi on 03/12/2016.
 */

angular.module('addressBook',['contactService'])
    .controller('addressBookCtrl', function ($scope, httpService) {

        $scope.getContacts = function() {
            httpService.getContacts()
                .then(function(data) {
                        var unsortedData = data.results;
                        $scope.contacts = unsortedData.sort(function(a, b){
                            if(a.name.first < b.name.first) return -1;
                            if(a.name.first > b.name.first) return 1;
                            return 0;
                        })

                        $scope.contacts = _.groupBy($scope.contacts, function(item) {return item.name.first[0]});
                    },
                    function(error) {
                        console.log(error.statusText);
                    });
        };

        $scope.viewDetail = function (people) {
            $scope.detailViewObj = people;
        };

        $scope.addFav = function (people) {

            var data = {
                name:{
                    first: people.name.first,
                    last: people.name.last
                },
                cell: people.cell,
                email: people.email,
                picture:{
                    large: people.picture.large
                }
            };

            var retrievedObject = localStorage.getItem('myFavs');
            $scope.favAdded = $scope.favAdded = !$scope.favAdded;

            if(retrievedObject){
                var arr = [];
                arr = JSON.parse(localStorage.getItem('myFavs'));

                for(var i=0; i < arr.length; i++){
                    if(arr[i].name.first == data.name.first){
                        console.log("exists!")
                        return;
                    }
                }
                arr.push(data);
                localStorage.setItem('myFavs', JSON.stringify(arr));

            } else if(!retrievedObject){
                var arr = [];
                var data = {

                    name:{
                        first: people.name.first,
                        last: people.name.last
                    },
                    cell: people.cell,
                    email: people.email,
                    picture:{
                        large: people.picture.large
                    }
                };
                arr.push(data);
                localStorage.setItem('myFavs', JSON.stringify(arr));
            }

        };

        $scope.getMyFavs = function () {
            $scope.favs = true;
            var retrievedObject = localStorage.getItem('myFavs');
            $scope.myFavs = JSON.parse(retrievedObject);
        };

    });

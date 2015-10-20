angular.module('categories.bookmarks', [
    'taggly.models.categories',
    'taggly.models.bookmarks',
    'categories.bookmarks.edit',
    'categories.bookmarks.create'
])
    .config(function($stateProvider){
        $stateProvider
            .state('taggly.categories.bookmarks',{
                url: 'categories/:category',
                views: {
                    'bookmarks@': {
                        templateUrl: 'app/categories/bookmarks/bookmarks.tmpl.html',
                        controller:  'BookmarksCtrl'
                    }
                }
            })
    })
    .controller('BookmarksCtrl', function( $scope, $stateParams ){
        $scope.currentCategoryName = $stateParams.category
    })
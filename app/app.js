angular.module ( 'Taggly', [] )
    .controller ( 'MainCtrl', function( $scope ) {
    $scope.categories = [
        { "id": 0, "name": "Development" },
        { "id": 1, "name": "Design" },
        { "id": 2, "name": "Exercise" },
        { "id": 3, "name": "Humor" }
    ];

    $scope.bookmarks       = [
        { "id": 0, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development" },
        { "id": 1, "title": "Egghead.io", "url": "http://egghead.io", "category": "Development" },
        { "id": 2, "title": "A List Apart", "url": "http://alistapart.com/", "category": "Design" },
        { "id": 3, "title": "One Page Love", "url": "http://onepagelove.com/", "category": "Design" },
        { "id": 4, "title": "MobilityWOD", "url": "http://www.mobilitywod.com/", "category": "Exercise" },
        { "id": 5, "title": "Robb Wolf", "url": "http://robbwolf.com/", "category": "Exercise" },
        { "id": 6, "title": "Senor Gif", "url": "http://memebase.cheezburger.com/senorgif", "category": "Humor" },
        { "id": 7, "title": "Wimp", "url": "http://wimp.com", "category": "Humor" },
        { "id": 8, "title": "Dump", "url": "http://dump.com", "category": "Humor" }
    ]

    $scope.currentCategory = null

    function isCurrentCategory ( category ){
        return $scope.CurrentCategory !== null && category.name === $scope.currentCategory.name
    }
    function setCurrentCategory ( category ){
        $scope.currentCategory = category
        cancelCreating()
        cancelEditing()
    }

    $scope.isCurrentCategory = isCurrentCategory
    $scope.setCurrentCategory = setCurrentCategory

    //-------------------------------------------------------------------------------------------------
    // CREATING AND EDITING STATES
    //  we don't want the user to be able to create and edit a bookmart simultaneously, so the following methods and properties are set up to ensure a distinct separation between those two states
    //-------------------------------------------------------------------------------------------------

    //default states
    $scope.isCreating = false;
    $scope.isEditing = false;
    //only show the "create new bookmark" button if the user is inside a category view, and if the edit-bookmark view is not visible.
    function shouldShowCreating() {
        return $scope.currentCategory && !$scope.isEditing;
    }

    //when the user clicks the "new bookmark button" the is creating property is set to true, and the is editing property is set to false
    function startCreating() {
        $scope.isCreating = true;
        $scope.isEditing = false;

        resetCreateForm()
    }

    //if the user cancels the "add new bookmark" action, the isCreating property is set to false opening up the ability to edit a bookmark
    function cancelCreating() {
        $scope.isCreating = false;
    }


    function shouldShowEditing() {
        return $scope.isEditing && !$scope.isCreating;
    }

    //when the user clicks the "edit bookmark" icon the isCreating property is set to false, and the is editing property is set to true
    function startEditing() {
        $scope.isCreating = false;
        $scope.isEditing = true;
    }

    //if a user cancels the edit-bookmark action...
    function cancelEditing() {
        $scope.isEditing = false;
        $scope.editedBookmark = null;
    }

    //make the above properties available to the view
    $scope.shouldShowCreating = shouldShowCreating;
    $scope.startCreating = startCreating;
    $scope.cancelCreating = cancelCreating;
    $scope.shouldShowEditing = shouldShowEditing;
    $scope.startEditing = startEditing;
    $scope.cancelEditing = cancelEditing;

    function resetCreateForm() {
        $scope.newBookmark = {
            title: '',
            url: '',
            category: $scope.currentCategory.name
        };
    }
    //-------------------------------------------------------------------------------------------------
    // CRUD
    //-------------------------------------------------------------------------------------------------
    function createBookmark(bookmark) {
        bookmark.id = $scope.bookmarks.length;
        $scope.bookmarks.push(bookmark);

        resetCreateForm();
    }
    $scope.createBookmark = createBookmark;
} )

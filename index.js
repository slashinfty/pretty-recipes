var recipeApp = angular.module('recipeApp', []);
recipeApp.controller('RecipeCtrl', function ($scope){
    $scope.ingredients = [];
    $scope.addIngredient = function() {
        $scope.ingredients.push($scope.enteredIngredient);
        ingredientList.push($scope.enteredIngredient);
    };
    $scope.removeIngredient = function(name) {
        $scope.ingredients.splice($scope.ingredients.indexOf(name), 1);
        ingredientList.splice(ingredientList.indexOf(name), 1);
    };
    
    $scope.directions = [];
    $scope.addDirection = function() {
        $scope.directions.push($scope.enteredDirection);
        directionList.push($scope.enteredDirection);
    };
    $scope.removeDirection = function(name) {
        $scope.directions.splice($scope.directions.indexOf(name), 1);
        directionList.splice(directionList.indexOf(name), 1);
    };
    
    $scope.change = function() {
        title = $scope.title;
        descript = $scope.descript;
        author = $scope.author;
        prepTime = $scope.prep;
        cookTime = $scope.cook;
    };
});

var ingredientList = [];
var directionList = [];
var title;
var descript;
var author;
var prepTime;
var cookTime;

function submit() {
    let prep = prepTime !== "" ? "Prep: " + latexReplace(prepTime) : "";
    let cook = cookTime !== "" ? "Cook: " + latexReplace(cookTime) : "";
    let ingredientString = "";
    ingredientList.forEach(ingredient => {
        ingredientString = ingredientString + "\\item " + latexReplace(ingredient);
    });
    let directionString = "";
    directionList.forEach(direction => {
        directionString = directionString + "\\item " + latexReplace(direction);
    });
    let document = one + latexReplace(title) + two + latexReplace(descript) + three + prep + four + latexReplace(author) + five + cook + six + ingredientString + seven + directionString + eight;
    saveAs(new Blob([document], {type: 'text/plain;charset=utf-8'}), title.trim().replace(/\s/g, "-") + ".tex");
}
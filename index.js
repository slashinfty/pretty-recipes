var recipeApp = angular.module('recipeApp', []);
recipeApp.controller('RecipeCtrl', function ($scope){
    $scope.ingredients = [];
    $scope.addIngredient = function() {
        $scope.ingredients.push($scope.enteredIngredient);
        ingredientList.push($scope.enteredIngredient);
    };                                       
    
    $scope.directions = [];
    $scope.addDirection = function() {
        $scope.directions.push($scope.enteredDirection);
        directionList.push($scope.enteredDirection);
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

async function submit() {
    let prep = prepTime !== "" ? "Prep: " + latexReplace(prepTime) : "";
    let cook = cookTime !== "" ? "Cook: " + latexReplace(cookTime) : "";
    let ingredientString = "";
    ingredientList.forEach(ingredient => {
        ingredientString = ingredientString + "\item " + latexReplace(ingredient);
    });
    let directionString = "";
    directionList.forEach(direction => {
        directionString = directionString + "\item " + latexReplace(direction);
    });
    let document = one + latexReplace(title) + two + latexReplace(descript) + three + prep + four + latexReplace(author) + five + cook + six + ingredientString + seven + directionString + eight;
    let submission = encodeURIComponent(document.trim());
    let response = await fetch("https://cors-anywhere.herokuapp.com/" + "https://latexonline.cc/compile?text=" + submission);
    await saveAs(new Blob([response], {type: 'application/pdf'}), title.trim().replace(/\s/g, "-") + ".pdf");
}
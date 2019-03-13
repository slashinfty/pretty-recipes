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
});

var ingredientList = [];
var directionList = [];

async function submit() {
    let prep = document.getElementById("prep").value !== "" ? "Prep: " + latexReplace(document.getElementById("prep").value) : "";
    let cook = document.getElementById("cook").value !== "" ? "Cook: " + latexReplace(document.getElementById("cook").value) : "";
    let ingredientString = "";
    ingredientList.forEach(ingredient => {
        ingredientString = ingredientString + "\item " + latexReplace(ingredient);
    });
    let directionString = "";
    directionList.forEach(direction => {
        directionString = directionString + "\item " + latexReplace(direction);
    });
    let dlName = "&dowload=" + document.getElementById("title").value.replace(/\s/g, "-") + ".pdf";
    let document = one + latexReplace(document.getElementById("title").value) + two + latexReplace(document.getElementById("descript").value) + three + prep + four + latexReplace(document.getElementById("author").value) + five + cook + six + ingredientString + seven + directionString + eight + dlName;
    let submission = encodeURIComponent(document.trim());
    let response = await fetch("latexonline.cc/compile?text=" + submission);
    await saveAs(new Blob([reponse], {type: 'application/pdf'}), document.getElementById("title").value.replace(/\s/g, "-") + ".pdf");
}
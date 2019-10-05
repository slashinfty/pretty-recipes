var recipeApp = angular.module('recipeApp', []);
recipeApp.controller('RecipeCtrl', function ($scope){
    $scope.ingredients = [];
    $scope.addIngredient = function() {
        $scope.ingredients.push($scope.enteredIngredient);
        ingredientList.push($scope.enteredIngredient);
        $scope.enteredIngredient = '';
    };
    $scope.removeIngredient = function(name) {
        $scope.ingredients.splice($scope.ingredients.indexOf(name), 1);
        ingredientList.splice(ingredientList.indexOf(name), 1);
    };
    
    $scope.directions = [];
    $scope.addDirection = function() {
        $scope.directions.push($scope.enteredDirection);
        directionList.push($scope.enteredDirection);
        $scope.enteredDirection = '';
    };
    $scope.removeDirection = function(name) {
        $scope.directions.splice($scope.directions.indexOf(name), 1);
        directionList.splice(directionList.indexOf(name), 1);
    };
    
    $scope.change = function() {
        title = $scope.title;
        descript = $scope.descript;
        author = $scope.author;
        picture = $scope.picture;
        prepTime = $scope.prep;
        cookTime = $scope.cook;
    };
});

var ingredientList = [];
var directionList = [];
var title;
var descript;
var author;
var picture;
var prepTime;
var cookTime;

function submit() {
    let filename = title.trim().replace(/\s/g, "-").replace(/\/\\:\*\?\"<\>\|/, "").toLowerCase();
    let prep = prepTime !== ("" || undefined) ? "Prep: " + latexReplace(prepTime) : "";
    let cook = cookTime !== ("" || undefined) ? "Cook: " + latexReplace(cookTime) : "";
    let ingredientString = "";
    ingredientList.forEach(ingredient => {
        ingredientString = ingredientString + "\\item " + latexReplace(ingredient);
    });
    let directionString = "";
    directionList.forEach(direction => {
        directionString = directionString + "\\item " + latexReplace(direction);
    });
    let pictureInput = "";
    let document;
    if (picture) {
        pictureInput = `\\begin{floatingfigure}{0.15\\textwidth}\\raisebox{0pt}[0pt][0pt]{\\raisebox{-2.5cm}{\\includegraphics[width=0.15\\textwidth]{` + filename + `}}}\\end{floatingfigure}`;
        prep = prep === "" ? "" : `\\\\` + prep;
        cook = cook === "" ? "" : `\\\\` + cook;
        document = one + pictureInput + oneHalf + latexReplace(title) + two + latexReplace(descript) + four + latexReplace(author) + prep + cook + six + ingredientString + seven + directionString + eight;
    } else {
        document = one + oneHalf + latexReplace(title) + two + latexReplace(descript) + three + prep + four + latexReplace(author) + five + cook + six + ingredientString + seven + directionString + eight;
    }
    saveAs(new Blob([document], {type: 'text/plain;charset=utf-8'}), filename + ".tex");
}
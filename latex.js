var one = `\\documentclass[12pt]{letter}\\usepackage[letterpaper,margin=0.65in]{geometry}\\usepackage{textcomp}\\pagenumbering{gobble}\\begin{document}\\begin{huge}`;//then title
var two = `\\end{huge}\\newline\\vspace{-2.5mm}\\newline\\renewcommand{\\arraystretch}{1.1}\\begin{tabular*}{\\textwidth}{@{\\extracolsep{\\fill}}lr}`;//then description
var three = `&`;//then prep time
var four = `\\\\`;//then author
var five = `&`;//then cook time
var six = `\\end{tabular*}\\newline\\vspace{10mm}\\newline\\begin{huge}Ingredients\\end{huge}\\\\\\rule[2.8mm]{\\textwidth}{.1pt}\\vspace{-3mm}\\begin{itemize}`;//then start ingredient list
var seven = `\\end{itemize}\\vspace{7mm}\\begin{huge}Directions\\end{huge}\\\\\\rule[2.8mm]{\\textwidth}{.1pt}\\vspace{-3mm}\\begin{enumerate}`;//then start directions list
var eight = `\\end{enumerate}\\end{document}`;

function latexReplace (str) {
    if (str === "") return;
    const latexSymbols = {
        "$": "\\$",
        "%": "\\%",
        "_": "\\_",
        "{": "\\{",
        "}": "\\}",
        "&": "\\&",
        "#": "\\#",
        "<": "\\textless",
        ">": "\\textgreater"
    }
    return str.replace(/[$%_{}&#<>]/g, symbol => {
        return latexSymbols[symbol];
    }).replace(/\d+\/\d+/g, fraction => {
        let parts = fraction.split('/');
        return "$\\frac{" + parts[0] + "}{" + parts[1] + "}$";
    }).replace(/\*\s?(c|f)/gi, degree => {
        return "\\textdegree " + degree.substr(-1).toUpperCase();
    });
}
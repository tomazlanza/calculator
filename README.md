# Calculator

Basic calculator app developed with HTML5, plain CSS, and vanilla JavaScript: https://tomazlanza.github.io/calculator/

It was made for studying purposes on general ES5 and ES6 JavaScript features, including built-in data structures and methods.

## Usage

Its usage is based on straightforward [Infix](https://en.wikipedia.org/wiki/Infix_notation) notation - i. e. the ‘normal’ way one would write an expression on a piece of paper. Simply type the expression and press the '=' button to see the result.

For example, to calculate the sum of **2 and 3**, input **"2 + 3"** and press **'='**.

For non-integer numbers, the app uses the comma ',' as decimal separator.

### Special operators

Particular attention to how special operators (_square root_ and _natural logarithm_) behave:

When their keys are pressed, the calculator already includes an opening brackets ‘[‘ that goes after the operator name. 

After finishing writing the expression to be evaluated, the user has to delimit it with a closing bracket ‘]’ to match the opening one.

For instance:

``` sqr root [ 4 + 5 ] + ln [ 2,71 ] ```

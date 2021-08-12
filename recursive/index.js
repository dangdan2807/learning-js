// Count down
function countDown(number) {
    console.log(number);
    if (number <= 0) {
        return 0;
    }
    countDown(--number);
}

console.log("Run Count down");
countDown(3);

// loop
console.log("loop");
function loop(start, end, callback) {
    if (start <= end) {
        callback(start);
        return loop(++start, end, callback);
    }
}

var arr = [1, 2, 3, 4, 5];
loop(0, arr.length - 1, function (index) {
    console.log(index);
});

// factorial
console.log('factorial')
function factorial(number) {
    if (number <= 1) {
        return 1;
    }
    return number *= factorial(number - 1);
}

console.log(factorial(3))
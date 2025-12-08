// this does NOT work over 20!
export function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
        if (result === Infinity) return Infinity; 
    }
    return result;
}

export function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}
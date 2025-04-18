
let hex_dec = new Map([
    ['0', 0],
    ['1', 1],
    ['2', 2],
    ['3', 3],
    ['4', 4],
    ['5', 5],
    ['6', 6],
    ['7', 7],
    ['8', 8],
    ['9', 9],
    ['a', 10],
    ['A', 10],
    ['b', 11],
    ['B', 11],
    ['c', 12],
    ['C', 12],
    ['d', 13],
    ['D', 13],
    ['e', 14],
    ['E', 14],
    ['f', 15],
    ['F', 15]
]);

let dec_hex = new Map([
    [0, '0'],
    [1, '1'],
    [2, '2'],
    [3, '3'],
    [4, '4'],
    [5, '5'],
    [6, '6'],
    [7, '7'],
    [8, '8'],
    [9, '9'],
    [10, 'a'],
    [11, 'b'],
    [12, 'c'],
    [13, 'd'],
    [14, 'e'],
    [15, 'f']
]);

class Hex {
    constructor(v) {
        this.value = this.str_to_vec(v);
    }

    // Getter for value
    get val() {
        return this.value;
    }

    // Convert string to vector (array of characters)
    str_to_vec(s) {
        if (typeof s !== "string") {
            console.log("str_to_vec(s) needs a string input");
            return;
        }
        var v = [];
        for (var i = 0; i < s.length; i++) {
            v.push(s[i]);
        }
        return v;
    }

    // Convert vector back to string
    vec_to_str(v) {
        if (!Array.isArray(v)) {
            console.log("vec_to_str(v) needs an array input");
            return;
        }
        var s = '';
        for (var i = 0; i < v.length; i++) {
            s += v[i];
        }
        return s;
    }

    // Convert a single hex digit to decimal
    hex_to_dec(v) {
        return hex_dec.get(v.toString());
    }

    // Convert a decimal value to hex
    dec_to_hex(d) {
        d = parseInt(d);
        return dec_hex.get(d);
    }

    // Add two hex values
    add(other) {
        let a = other.value.reverse();
        let b = this.value.reverse();
        let carry = 0;
        let newv = [];

        let m = Math.max(a.length, b.length);

        // Loop over the maximum length of the two arrays
        for (let i = 0; i < m; i++) {
            let a_dec = a[i] ? this.hex_to_dec(a[i]) : 0;
            let b_dec = b[i] ? this.hex_to_dec(b[i]) : 0;

            let sum = a_dec + b_dec + carry;

            if (sum >= 16) {
                carry = 1;
                sum -= 16; // Adjust sum to be within hex range (0-15)
            } else {
                carry = 0;
            }

            newv.push(this.dec_to_hex(sum));
        }

        if (carry) {
            newv.push(this.dec_to_hex(carry));
        }

        // Reverse the result to put it back in proper order
        this.value = newv.reverse();
    }
}

function testHexAddition() {
    let tests = [
        ["1a", "f", "29"],
        ["ff", "1", "100"],
        ["abc", "123", "bdf"],
        ["0", "0", "0"],
        ["f", "1", "10"],
        ["a", "5", "f"],
        ["a", "6", "10"],
        ["dead", "beef", "19d9c"],
        ["ffff", "1", "10000"],
        ["1234", "4321", "5555"],
        ["abcd", "1234", "be01"],
        ["1000", "1000", "2000"],
        ["f0f0", "0f0f", "ffff"],
        ["5a5a", "a5a5", "ffff"],
    ];

    for (let [a, b, expected] of tests) {
        let h1 = new Hex(a);
        let h2 = new Hex(b);
        h1.add(h2);
        let result = h1.vec_to_str(h1.val);
        console.log(`${a} + ${b} = ${result} (expected: ${expected})`);
    }
}


testHexAddition();
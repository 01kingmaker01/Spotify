/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (A) {
  let l = [],
    r,
    arr_size = A.length;

  function areEqual(arr1, arr2) {
    let n = arr1.length;
    let m = arr2.length;

    if (n != m) return false;

    arr1.sort();
    arr2.sort();
    for (let i = 0; i < n; i++) if (arr1[i] != arr2[i]) return false;

    return true;
  }

  for (let i = 0; i < arr_size - 2; i++) {
    for (let j = i + 1; j < arr_size - 1; j++) {
      for (let k = j + 1; k < arr_size; k++) {
        if (A[i] + A[j] + A[k] == 0) {
        }

        // l.push([A[i] , A[j] , A[k]])
      }
    }
  }
  ff;
  return l;
};

threeSum([-1, 0, 1, 2, -1, -4]);

("use strict");

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'deviceNamesSystem' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts STRING_ARRAY devicenames as parameter.
 */

function deviceNamesSystem(devicenames) {
  let UniArr = [];

  const incrementString = (str) => {
    var count = str.match(/\d+/g);
    var countX = str.match(/\d*$/);
    var numAdd = "";

    for (let i = 0; i < UniArr.length; i++) {
      let str = UniArr[i];
      for (let j = 0; j < str.length; j++) {
        if (!isNaN(String(str[j]) * 1)) {
          console.log(str[j]);
          numAdd += str[j];
        }
      }
    }
    console.log(numAdd);
    if (numAdd === "") {
      return str.substr(0, countX.index) + 1;
    } else {
      return str.substr(0, countX.index) + (Number(numAdd) + 1);
    }
  };

  devicenames.filter((ele, i) => {
    if (devicenames.indexOf(ele) === i) {
      UniArr.push(ele);
    } else {
      const string = incrementString(ele);
      UniArr.push(string);
    }
  });
  return UniArr;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const devicenamesCount = parseInt(readLine().trim(), 10);

  let devicenames = [];

  for (let i = 0; i < devicenamesCount; i++) {
    const devicenamesItem = readLine();
    devicenames.push(devicenamesItem);
  }

  const result = deviceNamesSystem(devicenames);

  ws.write(result.join("\n") + "\n");

  ws.end();
}

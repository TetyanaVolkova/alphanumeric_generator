const express = require( 'express' );
const router = express.Router();

// Routes:

router.get("/phone", (req, res) => {
  console.log(req.query);
  const phone_number = req.query.validPhone;
  num_mapping = {
    1: ['1'],
    2: ['2', 'a', 'b', 'c'],
    3: ['3', 'd', 'e', 'f'],
    4: ['4', 'g', 'h', 'i'],
    5: ['5', 'j', 'k', 'l'],
    6: ['6', 'm', 'n', 'o'],
    7: ['7', 'p', 'q', 'r', 's'],
    8: ['8', 't', 'u', 'v'],
    9: ['9', 'w', 'x', 'y', 'z'],
    0: ['0', '+']
};

let tempArray = [];

// for as many times as there are digits (eg. '3721' => 4 times)
for (var i = 0; i < phone_number.length; i++) {
    var digit = phone_number[i];
    var letters = num_mapping[digit];
    tempArray.push(letters);
};

function allPossibleCases(tempArray, result, index) {
  if (!result) {
      result = [];
      index = 0;
      tempArray = tempArray.map(function(element) {
          return element.push ? element : [element];
      });
  }
  if (index < tempArray.length) {
    tempArray[index].forEach(function(element) {
          var a = tempArray.slice(0);
          a.splice(index, 1, [element]);
          allPossibleCases(a, result, index + 1);
      });
  } else {
      result.push(tempArray.join(' '));
  }
  return result;
}
let finalArr = allPossibleCases(tempArray);
finalArr = finalArr.map((str, index) => ({ value: str, id: index + 1 }));
console.log(finalArr);
const totalCombinations = finalArr.length;
const offset = req.query.pageIndex*req.query.limit;
const concatFinalArr = finalArr.splice(offset, req.query.limit)
  res.status(200).json([concatFinalArr, totalCombinations]);
});

module.exports = router;

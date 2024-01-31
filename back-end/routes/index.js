var express = require("express");
var router = express.Router();
const tolerance = 20;
const asyncHandler = require("express-async-handler");

const characterNames = ["Waldo", "Wilma", "Wizard", "Woof", "Odlaw"];

router.get(
  "/guess/:characterName/:x/:y",
  asyncHandler(async (req, res, next) => {
    if (
      req.params.characterName &&
      req.params.x &&
      req.params.y &&
      req.params.characterName.length > 3
    ) {
      const characterName =
        req.params.characterName.charAt(0).toUpperCase() +
        req.params.characterName.slice(1);
      const characterNameUpperCase = characterName.toUpperCase();
      if (characterNames.includes(characterName)) {
        const correctX = process.env[characterNameUpperCase + "_X"];
        const correctY = process.env[characterNameUpperCase + "_Y"];

        const result = checkWithinTolerance(
          correctX,
          correctY,
          Number(req.params.x),
          Number(req.params.y)
        );

        res.json({ correct: result });
        return;
      }
    }
    res.json({ correct: false });
  })
);

function checkWithinTolerance(characterX, characterY, x, y) {
  if (
    characterX >= x - tolerance &&
    characterX <= x + tolerance &&
    characterY >= y - tolerance &&
    characterY <= y + tolerance
  ) {
    return true;
  }
  return false;
}

module.exports = router;

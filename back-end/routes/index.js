var express = require("express");
var router = express.Router();
const tolerance = 20;
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Score = require("./../models/score");
const mongoose = require("mongoose");

const characterNames = ["Waldo", "Wilma", "Wizard", "Woof", "Odlaw"];

router.get("/login", (req, res) => {
  jwt.sign(
    { start_time: new Date(), foundCharacters: [] },
    process.env.JWT_SECRET_KEY,
    (err, token) => {
      res.json({ token: token });
    }
  );
});

router.get(
  "/score/:name",
  verifyToken,
  asyncHandler(async (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, async (err, token) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const name = req.params.name;

        const time = Number(token.end_time);

        if (name.length > 0 && name.length <= 100) {
          const score = new Score({
            player_name: name,
            jwt: req.token,
            time: time,
          });

          //check if score exsists using this jwt
          const scoreWithReusedToken = await Score.findOne({
            jwt: req.token,
          }).exec();
          if (scoreWithReusedToken === null) {
            score.save();
          } else {
            console.log("This token has been submitted before!");
          }
        }
      }
    });
  })
);

router.get(
  "/highscores",
  asyncHandler(async (req, res) => {
    const highscores = await Score.find().sort({ time: 1 }).limit(10).exec();
    console.log(highscores);
    const highscoresMaped = highscores.map((score) => ({
      time: score.display_time,
      name: score.player_name,
    }));
    res.json({ scores: highscoresMaped });
  })
);

router.get("/tester", verifyToken, (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
    }
  });
});

router.get(
  "/guess/:characterName/:x/:y",
  verifyToken,
  asyncHandler(async (req, res, next) => {
    const rat = jwt.verify(
      req.token,
      process.env.JWT_SECRET_KEY,
      (err, token) => {
        if (err) {
          res.sendStatus(403);
        } else {
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
              if (
                checkWithinTolerance(
                  correctX,
                  correctY,
                  Number(req.params.x),
                  Number(req.params.y)
                )
              ) {
                const newFoundCharacters = token.foundCharacters;
                if (!token.foundCharacters.includes(characterName)) {
                  newFoundCharacters.push(characterName);
                }

                let end_time = undefined;

                //Win condition
                if (newFoundCharacters.length === 5) {
                  end_time = new Date() - new Date(token.start_time);
                  console.log("Winner! " + end_time);
                }

                jwt.sign(
                  {
                    start_time: token.start_time,
                    foundCharacters: newFoundCharacters,
                    end_time: end_time,
                  },
                  process.env.JWT_SECRET_KEY,
                  (err, token) => {
                    res.json({
                      correct: true,
                      token: token,
                      start_time: token.start_time,
                      end_time: end_time,
                    });
                  }
                );
                return;
              }
            }
          }
          res.json({ correct: false });
        }
      }
    );
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

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

function verifyToken(req, res, next) {
  //Get auth header value
  const bearerHeader = req.headers["authorization"];
  //check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    //Split at space
    const bearer = bearerHeader.split(" ");
    //Get token from array
    const bearerToken = bearer[1];
    //Set the token
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = router;

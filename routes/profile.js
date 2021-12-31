const express = require("express");
const router = express.Router();
const axios = require("axios");
const { User, validate } = require("../models/user");
const { Project } = require("../models/project");

router.get("/:username", async (req, res) => {
  let user = await User.findOne({ username: req.params.username }).select(
    "-password"
  );
  let ownProjects = await Project.find({
    user: user._id,
  });
  let allProjects = await Project.find();
  let colabProjects = [];
  allProjects.map((project) => {
    let flag = 0;
    project.colaborators.map((uid) => {
      if (uid.toString() === user._id.toString()) {
        flag = 1;
      }
    });
    if (flag) colabProjects.push(project);
  });

  // Codforces and Codechef
  let codeforces = {},
    codechef = {};
  if (user.cfUsername) {
    const cfUsername = user.cfUsername;
    let info, problems;
    await axios
      .get(`https://codeforces.com/api/user.info?handles=${cfUsername}`)
      .then((data) => {
        info = data;
      });

    await axios
      .get(`https://codeforces.com/api/user.status?handle=${cfUsername}&from=1`)
      .then((data) => {
        problems = data;
      });

    let cnt = 0;
    problems.data.result.map((sub) => {
      if (sub.verdict === "OK") cnt++;
    });
    codeforces = {
      username: cfUsername,
      curRating: info.data.result[0].rating,
      maxRating: info.data.result[0].maxRating,
      rank: info.data.result[0].maxRank,
      submissions: cnt,
    };
  }
  if (user.ccUsername) {
    const ccUsername = user.ccUsername;
    let info;
    await axios
      .get(
        `https://competitive-coding-api.herokuapp.com/api/codechef/${ccUsername}`
      )
      .then((data) => {
        info = data;
      });
    codechef = {
      username: ccUsername,
      curRating: info.data.rating,
      stars: info.data.stars,
      maxRating: info.data.highest_rating,
      globalRank: info.data.global_rank,
      countryRank: info.data.country_rank,
      solved: info.data.fully_solved.count,
    };
  }
  const ret = {
    user: user,
    colabProjects: colabProjects,
    ownProjects: ownProjects,
    codechef: codechef,
    codeforces: codeforces,
  };
  res.send(ret);
});

module.exports = router;

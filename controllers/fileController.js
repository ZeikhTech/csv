const fs = require("fs");
const fastcsv = require("fast-csv");
const express = require("express");
const router = express.Router();
const { upload } = require("../middlerwares/upload");
const Patient = require("../models/Patient");
const csv = require("csvtojson");
const _ = require("lodash");
const ejs = require("ejs");

router.post("/csv", upload.single("myFile"), async (req, res, next) => {
  var file = req.file;

  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }

  const filePath = "./public/uploads/" + file.originalname;
  var stream = fs.createReadStream(filePath);
  setTimeout(() => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }, 5000);

  const arrayToPush = [];

  const jsonArray = await csv().fromFile(filePath);

  for (let i = 0; i < jsonArray.length; i++) {
    const finalObject = _.pick(jsonArray[i], [
      "First",
      "Last",
      "Patient#",
      "Phone 1",
      "Address",
      "Location",
    ]);

    const collectionBuilder = {
      firstName: finalObject.First,
      lastName: finalObject.Last,
      patient: finalObject["Patient#"],
      phone: finalObject["Phone 1"],
      address: finalObject.Address,
      location: finalObject.Location,
    };

    arrayToPush.push(collectionBuilder);
  }

  const result = await Patient.insertMany(arrayToPush);

  res.render("../views/csv.ejs", { result });

  // fastcsv
  //   .parseStream(stream, { headers: false })
  //   .on("data", function (data) {
  //     // console.log("I am one line of data", data);
  //   })
  //   .on("end", function () {
  //     // console.log("done");
  //   });
});

module.exports = router;

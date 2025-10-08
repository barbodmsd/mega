import fs from "fs";
import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid";
import { HandleERROR } from "vanta-api";
import { __dirname } from "../app.js";
import Folder from "../models/folder.model.js";

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    // if the folder name is not provided
    const { folderId } = req.body;
    if (!folderId)
      return cb(new HandleERROR("Please provide a folder ID.", 400), null);
    Folder.findById(folderId)
      .then((targetFolder) => {
        if (!targetFolder)
          return cb(new HandleERROR("Folder does not exist in DB.", 400));

        // folder path
        const folderPath = `${__dirname}/public/${req.username}/${targetFolder?.folderName}`;

        // if the folder didn't exist then create it
        if (!fs.existsSync(folderPath))
          return cb(new HandleERROR("Folder does not exist.", 400), null);

        cb(null, folderPath);
      })
      .catch((err) => cb(new HandleERROR(err, 500)));
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}_${uuid()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

export default upload;

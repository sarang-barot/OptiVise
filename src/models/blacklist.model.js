const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required."],
    },
  },
  {
    timestamps: true,
  },
);

const blacklistTokenModel = new mongoose.model(
  "blacklistTokens",
  blacklistTokenSchema,
);

module.exports = blacklistTokenModel;

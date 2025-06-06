const mongoose = require("mongoose");

const proSchema = mongoose.Schema(
  {
    project_name: {
      type: String,
      required: [true, "Project Name is Required"],
      trim: true,
    },
    total_task: {
  type: Number,
  default: 0,
},
    pro_ref: {
      type: String,
      trim: true
      // ref: "signup",
      // required: [true, "Password is Required"],
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "signup"
      }
    ]
  },
  { timestamps: true }
);

const project_tbl = mongoose.model("project", proSchema);

module.exports = project_tbl;

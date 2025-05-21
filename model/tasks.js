const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    pro_ref: {
      // type:mongoose.Schema.Types.ObjectId,
      // ref:"project"
      type: mongoose.Schema.Types.ObjectId,
      ref: "project"
    },
    label: {
      type: String,
      required: [true, "Enter Title of Task"],
    },
    assign_to: {
      // type: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: "signup"
    },
    summary: {
      type: String,
    },
    image: {
      type: String,
      // data: Buffer,
      // contentType: String,
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Done"],
      default: "To Do"
    }
  },
  { timestamps: true }
);

const task_tbl = mongoose.model("task", taskSchema);

module.exports = task_tbl;

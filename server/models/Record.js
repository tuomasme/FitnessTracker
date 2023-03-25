import mongoose from "mongoose";

const RecordSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  recordName: {
    type: String,
    required: true,
  },
  recordWeight: {
    type: Number,
    required: true,
  },
});

const Record = mongoose.model("Record", RecordSchema);
export default Record;

import User from "../models/User.js";
import Record from "../models/Record.js";

// Fetch all records of the user
export const getRecords = async (req, res) => {
  try {
    const { userId } = req.params;
    const records = await Record.find({ userId });
    res.status(200).json(records);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Fetch one record of the user
export const getRecord = async (req, res) => {
  try {
    const record = await Record.findOne({ _id: req.params.id });
    res.status(200).json(record);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Create a new record
export const addRecord = async (req, res) => {
  try {
    const { userId, recordName, recordWeight } = req.body;
    const user = await User.findById(userId);
    const newRecord = new Record({
      userId,
      recordName,
      recordWeight,
    });
    await newRecord.save();
    const records = await Record.find();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// Delete the selected record
export const deleteRecord = async (req, res) => {
  try {
    const deleteRecord = await Record.findByIdAndDelete(req.params.id);
    res.status(200).json("Record deleted");
  } catch (error) {
    res.json(400).json({ message: err.message });
  }
};

// Update the selected record
export const editRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { recordName, recordWeight } = req.body;
    const editRecord = await Record.findByIdAndUpdate(
      { _id: id },
      {
        recordName,
        recordWeight,
      }
    );
    res.status(200).json(editRecord);
  } catch (error) {
    res.json(500).json({ message: err.message });
  }
};

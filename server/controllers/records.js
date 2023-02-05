import User from "../models/User.js";
import Record from "../models/Record.js";

export const getRecords = async (req, res) => {
  try {
    const records = await Record.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserRecords = async (req, res) => {
  try {
    const { userId } = req.params;
    const records = await Record.find({ userId });
    res.status(200).json(records);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

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

export const deleteRecord = async (req, res) => {
  try {
    const deleteRecord = await Record.findByIdAndDelete(req.params.id);
    res.status(200).json("Record deleted");
  } catch (error) {
    res.json(400).json({ message: err.message });
  }
};

export const editRecord = async (req, res) => {
  try {
    const editRecord = await Record.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Record updated");
  } catch (error) {
    res.json(404).json({ message: err.message });
  }
};

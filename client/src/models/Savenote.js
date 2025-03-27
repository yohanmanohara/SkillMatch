import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  date: { type: String, required: true }, // Store date as a string (or use Date type)
  text: { type: String, required: true }, // Note text is required
});

// Check if model exists before defining it (to prevent overwrite issues)
export default mongoose.models.Note || mongoose.model("Note", NoteSchema);

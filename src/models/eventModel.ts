import mongoose from "mongoose";

export interface EventSchema {
  _id: string;
  title: string;
  description: string;
  image_path: string;
  fac: string;
  prog: string;
  date: string;
  time: string;
  created_at: string;
  image?: string;
}

export const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  image_path: String,
  fac: String,
  prog: String,
  date: String,
  created_at: String,
  time: String,
});

eventSchema.index({ title: "text", description: "text" });

export const Event = mongoose.model("Event", eventSchema, "events");


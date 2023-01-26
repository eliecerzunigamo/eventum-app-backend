import mongoose from "mongoose";

export interface DeleteEvent {
  event_id: string;
}

export interface EventSchema {
  _id: string;
  event_type: string;
  title: string;
  description: string;
  init_date?: string;
  init_time?: string;
  end_time?: string;
  end_date?: string;
  place?: string;
  image_path: string;
  fac?: string;
  prog?: string;
  image: string;
  created_at: string;
  creator_id: string;
}

export const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  image_path: String,
  fac: String,
  prog: String,
  init_date: String,
  end_date: String,
  end_time: String,
  place: String,
  created_at: String,
  init_time: String,
  creator_id: String,
  event_type: String,
});

eventSchema.index({ title: "text", description: "text" });

export const Event = mongoose.model("Event", eventSchema, "events");

import mongoose from "mongoose";

export interface FavEventSchema {
  event_id: string;
  user_id: string;
}

export const favEventSchema = new mongoose.Schema({
  event_id: String,
  user_id: String,
});

export const FavEvent = mongoose.model(
  "FavEvent",
  favEventSchema,
  "favorite_events_by_user"
);

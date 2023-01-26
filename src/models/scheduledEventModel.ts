import mongoose from "mongoose";

export interface ScheduledEvent {
  event_id: string;
  user_id: string;
}

export const ScheduledEventSchema = new mongoose.Schema({
  event_id: String,
  user_id: String,
});

export const ScheduledEvent = mongoose.model(
  "ScheduledEvent",
  ScheduledEventSchema,
  "scheduled_event_by_user"
);

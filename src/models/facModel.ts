import mongoose from "mongoose";

export interface FacultySchema {
  name: string;
  programs: {
    id: string;
    name: string;
  }[];
}

export const facultySchema = new mongoose.Schema({
  name: String,
  programs: [
    {
      id: String,
      name: String,
    },
  ],
});

export const Faculty = mongoose.model("Faculty", facultySchema, "faculties");

import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, // NOTE: 공백 제거
    maxLength: 80,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minLength: 20,
  },
  hashtags: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  meta: {
    views: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const Video = mongoose.model("Video", videoSchema);

export default Video;

import mongoose, { mongo } from "mongoose";

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
    minLength: 1,
  },
  hashtags: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  fileUrl: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
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

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Comment",
    },
  ],
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);

export default Video;

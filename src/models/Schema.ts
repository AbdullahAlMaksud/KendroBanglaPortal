import mongoose, { Model } from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email for this user.'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password for this user.'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Please provide a name for this user.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this post.'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug for this post.'],
    unique: true,
  },
  content: {
    type: String,
    required: [true, 'Please provide content for this post.'],
  },
  description: {
      type: String,
      required: [true, 'Please provide a description.'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category for this post.'],
  },
  author: {
    type: String,
    required: [true, 'Please provide an author for this post.'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
      type: String,
      required: false
  }
});

// Avoid OverwriteModelError
const User = (mongoose.models.User || mongoose.model('User', UserSchema)) as Model<any>;
const Post = (mongoose.models.Post || mongoose.model('Post', PostSchema)) as Model<any>;

export { User, Post };

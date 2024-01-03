const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        // For uniquely identifying the user MongoDB uses a unique identifier called ObjectId for each document in a collection.
        type: mongoose.Schema.Types.ObjectId,
        // Establishing a reference between documents in different collections.
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    }
  });

  module.exports = mongoose.model('note', NotesSchema);
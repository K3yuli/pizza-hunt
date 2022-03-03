const { Schema, model, Types } = require('mongoose');
// import dateFormat() function
const dateFormat = require('../utils/dateFormat');


const ReplySchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment_id
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String
        },
        writtenBy: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // getter for timestamp
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const CommentSchema = new Schema({
    writtenBy: {
        type: String
    },
    commentBody: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // add getter for timestamp
        get: createdAtVal => dataFormat(createdAtVal)
    },
    // associate replies
    replies: [ReplySchema]
},
{
    toJSON: {
        // must be true for virtuals to work
        virtuals: true,
        getters: true
    },
    // set id to false because this is a virtual that Mongoose returns, it's needed
    id: false
}
);

// virtual to get total reply count
CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
})

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
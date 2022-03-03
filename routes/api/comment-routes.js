const router = require('express').Router();
const {
    addComment,
    removeComment,
    addReply,
    removeReply

} = require('../../controllers/comment-controller');

// POST at /api/comments/:pizzaId
router
.route('/:pizzaId')
.post(addComment);


// DELETE /api/comments/:pizzaId/:commentId
router
.route('/:pizzaId/:commentId')
.put(addReply)
.delete(removeComment);

// DELETE route to handle removeReply
router
.route('/:pizzaId/:commentId/:replyId')
.delete(removeReply);


module.exports = router;
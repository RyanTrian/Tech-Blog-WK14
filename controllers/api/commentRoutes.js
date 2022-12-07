const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    })
    res.json(newComment)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const updateComment = await Comment.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    res.status(200).json(updateComment);
  } catch (err) {
    res.status(400).json(err);
  }
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deleteComment = await Comment.destroy({
      where: {
          id: req.params.id
      }
    })
    res.status(200).json(deleteComment);
  } catch (err) {
    res.status(400).json(err);
  }
})

module.exports = router;

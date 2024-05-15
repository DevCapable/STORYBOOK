const express = require('express')
const storiesController = require('../controllers/storiesController')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')

// @desc   Router to Show add page
// @route   GET /stories/add
router.get('/add', ensureAuth, storiesController.show_add_stories_page )

// @desc   Router to Process the add form
// @route   GET /stories/dashboard
router.post('/', ensureAuth, storiesController.process_add_form)

// @desc   Router to Show all stories
// @route   GET /stories
router.get('/', ensureAuth, storiesController.show_all_stories)

// @desc   Router to Show single story
// @route   GET /stories/:id
router.get('/:id', ensureAuth, storiesController.show_single_story)


// @desc   Router to Show single story
// @route   GET /stories/public/:id
router.get('/public/:id', ensureGuest, storiesController.show_single_public_story)

// @desc   Router to Show edit page
// @route   GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, storiesController.show_edit_page)

// @desc   Router to Update story
// @route   PUT /stories/:id
router.put('/:id', ensureAuth, storiesController.update_story)

// @desc   Router to Delete Story
// @route   DELETE /stories/:id
router.delete('/:id', ensureAuth, storiesController.delete_story)

// @desc   Router to User stories
// @route   GET /stories/user/:userId
router.get('/user/:userId', ensureAuth,storiesController.user_story)

// exporting router
module.exports = router


const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')
const Story = require('../models/story')

// @desc    Show add page
// @route   GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add')
})

// @desc    Process the add form
// @route   GET /stories/dashboard
router.post('/', ensureAuth, async(req, res) => {
    try{
        req.body.user = req.user.id;
        await Story.create(req.body)
        res.redirect('/dashboard')
    }catch(err){
        console.log(err)
        res.render('error/500')
    }
    res.render('stories/add')
})

// @desc    Show all stories
// @route   GET /stories
router.get('/', ensureAuth, async (req, res) =>{
    try{
        const stories = await Story.find({status: 'public'})
            .populate('user')
            .sort({createdAt: 'desc'})
            .lean()
        res.render('stories/index',{
            name: req.user.displayName,
            image: req.user.image,
            stories,
        })
    }catch(err){
        console.log(err)
        res.render('error/500')
    }
})

// @desc    Show single story
// @route   GET /stories/:id
router.get('/:id', ensureAuth, async(req, res) => {
    try {
        const  story = await Story.findById(req.params.id)
            .populate('user').lean()
        if (!story)
        {
            res.render('error/404')
        }
        res.render('stories/show',{
            name: req.user.displayName,
            image: req.user.image,
            story
        })
    }catch(err)
    {
        console.log(err)
        res.render('error/404')
    }

})

// @desc    Show edit page
// @route   GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
        const story = await Story.findOne({
            _id: req.params.id,
        }).lean()

        if (!story) {
            return res.render('error/404')
        }

        if (story.user != req.user.id) {
            res.redirect('/stories')
        } else {
            res.render('stories/edit', {
                name: req.user.displayName,
                image: req.user.image,
                story,
            })
        }
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})

// @desc    Update story
// @route   PUT /stories/:id
router.put('/:id', ensureAuth, async (req, res) => {
    try {
        let story = await Story.findById(req.params.id).lean()

        if (!story) {
            return res.render('error/404')
        }

        if (story.user != req.user.id) {
            res.redirect('/stories')
        } else {
            story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true,
            })

            res.redirect('/dashboard')
        }
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})

// @desc    Delete Story
// @route   DELETE /stories/:id
router.delete('/', ensureAuth, async (req, res) => {
    try{
        await Story.remove({_id: req.params.id})
        res.redirect('/dashboard')
    }catch(error){
        console.error(err)
        return res.render('error/500')
    }
})
// @desc    User stories
// @route   GET /stories/user/:userId
router.get('/user/:userId', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({
            user: req.params.userId,
            status: 'public',
        })
            .populate('user')
            .lean()
        res.render('stories/index',{
            name: req.user.displayName,
            image: req.user.image,
            stories
        })
    }catch(err)
    {
        console.error(err);
        res.render('error/500')
    }

})
module.exports = router


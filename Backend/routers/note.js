const express = require('express')
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
const fetchuser = require('../middlewares/fetchuser')
var jwt = require('jsonwebtoken');

const Note = require('../models/Note')
const router = express.Router();

router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {

        const notes = await Note.find({ user: req.user.id })
        res.send(notes)


    } catch (error) {
        res.status(400).json({ error: "error is happened", message: error.message })
    }
})

router.post('/addnote', fetchuser, [

    body('title').isLength({ min: 5 }),
    body('description').isLength({ min: 3 }),

], async (req, res) => {

    try {

        const { title, description, tag } = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const saveNote = await note.save()
        res.json(saveNote)

    } catch (error) {
        res.status(400).json({ error: "error is happened", message: error.message })
    }
})

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {

        const { title, description, tag } = req.body

        const newNote={};

        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};

        let note=await Note.findById(req.params.id);

        if(!note){
            res.status(400).json({error:"this note doesnot exist"})
        }

        if(note.user.toString()!==req.user.id){
            res.status(400).json({error:"not allowed"})
        }

        note=await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})

        res.json(newNote)


    } catch (error) {
        res.status(400).json({ error: "error is happened", message: error.message })
    }
})
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {

        let note=await Note.findById(req.params.id);

        if(!note){
            res.status(400).json({error:"this note doesnot exist"})
        }

        if(note.user.toString()!==req.user.id){
            res.status(400).json({error:"not allowed"})
        }

        note=await Note.findByIdAndDelete(req.params.id)

        res.json("Note has been Deleted")


    } catch (error) {
        res.status(400).json({ error: "error is happened", message: error.message })
    }
})




module.exports = router;
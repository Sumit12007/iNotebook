const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//  Route 1: Get All The Notes using: GET "/api/notes/fetchallnotes". LogIn required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try{
        // Finding all the notes form the user's id and fetching all of them.
        const notes = await Note.find({user: req.user.id});
        res.json(notes)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//  Route 2: Add a new Note using: POST "/api/notes/addnote". LogIn required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title.').isLength({min: 3}),
    body('description', 'Description must have atleast 5 characters.').isLength({min: 5}),
], async (req, res)=>{

    try{
        // There are 3 fields inside the body of the incoming HTTP request(req.body) using destructring method.
        const {title, description, tag} = req.body;

        // If there are errors then return bad request and the errors.
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        // Creating a new instance of the 'Note' setting it's properties (title, description, tag and user),saving it to the database, and then sending the saved note as a JSON response.
        const note = new Note({
            // The req.user.id expression typically comes from a middleware that is responsible for extracting user information from the request.
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//  Route 3: Update an existing Note using: PUT "/api/notes/updatenote". LogIn required
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    try{
        const {title, description, tag} = req.body;
        // Create a newNote object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};


        // Find the note to be updated and update it.
        // (req.params.id) is used to access the value of the id parameter from the route URL.
        let note = await Note.findById(req.params.id);
        if(!note){
        return res.status(404).send("Not Found!!");
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed!!");
        }

        // req.params.id = The ID of the note to update.
        // {$set: newNote} = The update operation, setting fields with new values.
        // {new: true} = Option to return the modified document.
        const updatedNote = await Note.updateOne({ _id: req.params.id, user: req.user.id },{ $set: newNote }, {new: true});
        if (updatedNote.nModified === 0) {
            return res.status(400).json({ error: "Note not updated!" });
          }
      
          res.json({updatedNote });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//  Route 4: Delete an existing Note using: DELETE "/api/notes/deletenote". LogIn required
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    try{
        // Find the note to be deleted and delete it.
        let note = await Note.findById(req.params.id);
        if(!note){
        return res.status(404).send("Not Found!!");
        }
        // Allow deletion only if user owns the note.
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed!!");
        }
        
        // req.params.id = The ID of the note to delete.
        const deletedNote = await Note.deleteOne({ _id: req.params.id, user: req.user.id });

        if (deletedNote.deletedCount === 0) {
            return res.status(400).json({ error: "Note not deleted!" });
          }

        res.json({"Success": "Note has been deleted successfully!", note:deletedNote});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const mongoose= require("mongoose");

//@desc get all contacts
//@route  GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user._id});
    res.status(200).json(contacts);
});

//@desc create contacts
//@route  POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    console.log("request body is ", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("Please enter all fields");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user._id
    });
    res.status(201).json(contact);
});

// Your route
//@desc get contact
//@route  GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(404);
        throw new Error('Invalid contact ID');
    }
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    if(contact.user_id.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You are not authorized to view this contact");
    }
    res.status(200).json(contact);
});

//@desc update contacts
//@route  PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(404);
        throw new Error('Invalid contact ID');
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You are not authorized to update this contact");
    }
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );
    res.status(200).json(updateContact);
});

//@desc delete contacts
//@route  DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        throw new Error('Invalid contact ID');
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You are not authorized to delete this contact");
    }
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
});

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };
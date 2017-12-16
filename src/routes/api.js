// Import packages.
import express from 'express';

// Import models.
import Tutor from 'models/tutor';
import Student from 'models/student';
import Course from 'models/course';
import Company from 'models/company';

// Create a router object and export it at the bottom when all routes are added.
const router = express.Router();

// types[req.params.type] will match the correct model type.
// E.g GET /api/students will result in types['students'] which will return the Student model.
const types = {
    tutors: Tutor,
    students: Student,
    courses: Course,
    companies: Company
};

// Find all.
router.get('/:type', async(req, res) => {
    try {
        const result = await types[req.params.type].find();

        res.json(result);
    } catch (err) {
        res.status(500).send({ description: `Could not find ${req.params.type}.`, message: err.message, stack: err.stack });
    }
});

// Find by id.
router.get('/:type/:id', async(req, res) => {
    try {
        const result = await types[req.params.type].findById(req.params.id);

        res.json(result);
    } catch (err) {
        res.status(500).send({ description: `Could not find a document with id ${req.params.id} in ${req.params.type}.`, message: err.message, stack: err.stack });
    }
});

// Create.
router.post('/:type', async(req, res) => {
    try {
        const item = new types[req.params.type](req.body);
        const result = await item.save();

        res.json(result);
    } catch (err) {
        res.status(500).send({ description: `Could not create a document in ${req.params.type}.`, message: err.message, stack: err.stack });
    }
});

// Update.
router.put('/:type/:id', async(req, res) => {
    try {
        req.body.updated = Date.now();
        const result = await types[req.params.type].findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });

        res.json(result);
    } catch (err) {
        res.status(500).send({ description: `Could not update a document with id ${req.params.id} in ${req.params.type}.`, message: err.message, stack: err.stack });
    }
});

// Delete.
router.delete('/:type/:id', async(req, res) => {
    try {
        const doc = await types[req.params.type].findById(req.params.id);

        if (doc) {
            const result = await doc.remove();
            res.json(result);
        } else {
            throw new Error(`No document with id ${req.params.id} found.`);
        }
    } catch (err) {
        res.status(500).send({ description: `Could not remove a document with id ${req.params.id} in ${req.params.type}.`, message: err.message, stack: err.stack });
    }
});

// Search.
router.get('/:type/search', async(req, res) => {
    try {
        // Create a regex so partial words matches. E.g. "foob" matches "foobar".
        const regex = new RegExp(req.query.text, 'i');

        // Search for regex in the indexed "search"-field.
        const result = await types[req.params.type].find({ search: regex }, { search: 1 });

        res.json(result);
    } catch (err) {
        res.status(500).send({ description: `Could not search for ${req.params.type}.`, message: err.message, stack: err.stack });
    }
});

// Export the router object.
export default router;
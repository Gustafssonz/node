// Import packages.
import mongoose from 'mongoose';

// Import models.
import Student from 'models/student';
import Tutor from 'models/tutor';

// Create a new instance of mongoose schema.
const schema = new mongoose.Schema({
	name: String,
	startDate: Date,
	endDate: Date,
	search: String, // Extra field to store the full search term in.
	created: { type: Date, default: Date.now }, // Automatically set once upon creation of a document.
	updated: { type: Date, default: Date.now } // Automatically set once upon creation of a document and everytime a document is updated.
});

schema.index({ search: 1 });

// Set the search term before saving the document.
schema.pre('save', function(next) {
	this.search = this.name;

	next();
});

// Update the search term before updating the document.
schema.post('findOneAndUpdate', async function(doc) {
	if (this._update.name) {
		doc.search = doc.name;
	}

	await doc.save();
});

// Clear the removed document from documents in other collections.
schema.post('remove', function(doc) {
	Student.update({ courses: doc._id }, { $pull: { courses: doc._id } }, { multi: true }, function() {});
	Tutor.update({ courses: doc._id }, { $pull: { courses: doc._id } }, { multi: true }, function() {});
});

// Export the model as "courses" which also represents the name in the database.
export default mongoose.model('courses', schema);
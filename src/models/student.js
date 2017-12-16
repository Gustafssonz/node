// Import packages.
import mongoose from 'mongoose';

// Import models.
import Tutor from 'models/tutor';

// Create a new instance of mongoose schema.
const schema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	mobile: String,
	address: String,
	zip: String,
	city: String,
	courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'courses' }], // Save the id of a course in an array, referring to the Course model.
	companies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'companies' }], // Save the id of a company in an array, referring to the Company model.
	search: String, // Extra field to store the full search term in.
	created: { type: Date, default: Date.now }, // Automatically set once upon creation of a document.
	updated: { type: Date, default: Date.now } // Automatically set once upon creation of a document and everytime a document is updated.
});

schema.index({ search: 1 });

// Set the search term before saving the document.
schema.pre('save', function(next) {
	this.search = `${this.firstName} ${this.lastName}`;

	next();
});

// Update the search term before updating the document.
schema.post('findOneAndUpdate', async function(doc) {
	if (this._update.firstName || this._update.lastName) {
		doc.search = `${doc.firstName} ${doc.lastName}`;
	}

	await doc.save();
});

// Clear the removed document from documents in other collections.
schema.post('remove', function(doc) {
	Tutor.update({ students: doc._id }, { $pull: { students: doc._id } }, { multi: true }, function() {});
});

// Export the model as "students" which also represents the name in the database.
export default mongoose.model('students', schema);
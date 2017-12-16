// Import packages.
import mongoose from 'mongoose';

// Create a new instance of mongoose schema.
const schema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	mobile: String,
	students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'students' }], // Save the id of a student in an array, referring to the Student model.
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

// Export the model as "tutors" which also represents the name in the database.
export default mongoose.model('tutors', schema);
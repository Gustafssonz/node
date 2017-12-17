import rp from 'request-promise';
import expect from 'expect.js';
import assert from 'assert';
import should from 'should';

const url = 'http://localhost:3000';
const data = {
	companies: [],
	courses: [],
	students: [],
	tutors: []
};

/* CREATE OBJECTS */

describe('POST /api/companies', () => {
	it('should create an object.', async() => {
		const company = {
			name: 'Apple Inc.',
			slots: 10,
			email: 'contact@apple.com',
			mobile: '0701234567',
			address: 'Main street 1',
			zip: '123 45',
			city: 'Göteborg'
		};

		const response = await rp({ uri: url + '/api/companies', method: 'POST', form: company });
		const parsed = JSON.parse(response);

		expect(parsed).to.be.an('object');

		for (let key in company) {
			assert.equal(parsed[key], company[key]);
		}

		data.companies.push(parsed);
	});
});

describe('POST /api/courses', () => {
	it('should create an object.', async() => {
		const course = {
			name: 'Webserverprogrammering',
			startDate: '2017-01-01',
			endDate: '2017-06-30'
		};

		const response = await rp({ uri: url + '/api/courses', method: 'POST', form: course });
		const parsed = JSON.parse(response);

		expect(parsed).to.be.an('object');

		for (let key in course) {
			if (['endDate', 'startDate'].includes(key)) {
				assert.equal(new Date(parsed[key]).getTime(), new Date(course[key]).getTime());
			} else {
				assert.equal(parsed[key], course[key]);
			}
		}

		data.courses.push(parsed);
	});
});

describe('POST /api/students', () => {
	it('should create an object.', async() => {
		const student = {
			firstName: 'Jonathan',
			lastName: 'Nielsen',
			email: 'jonathan.nielsen93@gmail.com',
			mobile: '0701234567',
			address: 'Main street 1',
			zip: '123 45',
			city: 'Göteborg',
			courses: data.courses[0]._id,
			companies: data.companies[0]._id
		};

		const response = await rp({ uri: url + '/api/students', method: 'POST', form: student });
		const parsed = JSON.parse(response);

		expect(parsed).to.be.an('object');
		expect(parsed.courses).to.be.an('array');
		expect(parsed.companies).to.be.an('array');

		for (let key in student) {
			if (['courses', 'companies'].includes(key)) {
				parsed[key].should.containEql(student[key]);
			} else {
				assert.equal(parsed[key], student[key]);
			}
		}

		data.students.push(parsed);
	});
});

describe('POST /api/tutors', () => {
	it('should create an object.', async() => {
		const tutor = {
			firstName: 'Anders',
			lastName: 'Timell',
			email: 'anders.timell@gmail.com',
			mobile: '0701234567',
			students: data.students[0]._id,
			courses: data.courses[0]._id,
			companies: data.companies[0]._id
		};

		const response = await rp({ uri: url + '/api/tutors', method: 'POST', form: tutor });
		const parsed = JSON.parse(response);

		expect(parsed).to.be.an('object');
		expect(parsed.students).to.be.an('array');
		expect(parsed.courses).to.be.an('array');
		expect(parsed.companies).to.be.an('array');

		for (let key in tutor) {
			if (['students', 'courses', 'companies'].includes(key)) {
				parsed[key].should.containEql(tutor[key]);
			} else {
				assert.equal(parsed[key], tutor[key]);
			}
		}

		data.tutors.push(parsed);
	});
});

/* GET ALL OBJECTS */

describe('GET /api/companies', () => {
	it('should respond with an array of objects.', async() => {
		const response = await rp(url + '/api/companies');
		const parsed = JSON.parse(response);

		expect(parsed).to.be.an('array');
	});
});

describe('GET /api/courses', () => {
	it('should respond with an array of objects.', async() => {
		const response = await rp(url + '/api/courses');
		const parsed = JSON.parse(response);

		expect(parsed).to.be.an('array');
	});
});

describe('GET /api/students', () => {
	it('should respond with an array of objects.', async() => {
		const response = await rp(url + '/api/students');
		const parsed = JSON.parse(response);

		expect(parsed).to.be.an('array');
	});
});

describe('GET /api/tutors', () => {
	it('should respond with an array of objects.', async() => {
		const response = await rp(url + '/api/tutors');
		const parsed = JSON.parse(response);

		expect(parsed).to.be.an('array');
	});
});

/* GET SINGLE OBJECT */

describe('GET /api/companies/:id', () => {
	it(`should respond with an object.`, async() => {
		const id = data.companies[0]._id;
		const name = data.companies[0].name;

		const response = await rp(url + `/api/companies/${id}`);
		const parsed = JSON.parse(response);

		assert.equal(parsed.name, name);
	});
});

describe('GET /api/courses/:id', () => {
	it(`should respond with an object.`, async() => {
		const id = data.courses[0]._id;
		const name = data.courses[0].name;

		const response = await rp(url + `/api/courses/${id}`);
		const parsed = JSON.parse(response);

		assert.equal(parsed.name, name);
	});
});

describe('GET /api/students/:id', () => {
	it(`should respond with an object.`, async() => {
		const id = data.students[0]._id;
		const firstName = data.students[0].firstName;

		const response = await rp(url + `/api/students/${id}`);
		const parsed = JSON.parse(response);

		assert.equal(parsed.firstName, firstName);
	});
});

describe('GET /api/tutors/:id', () => {
	it(`should respond with an object.`, async() => {
		const id = data.tutors[0]._id;
		const firstName = data.tutors[0].firstName;

		const response = await rp(url + `/api/tutors/${id}`);
		const parsed = JSON.parse(response);

		assert.equal(parsed.firstName, firstName);
	});
});

/* UPDATE SINGLE OBJECT */

describe('PUT /api/companies/:id', () => {
	it(`should update an object and assert all updated properties.`, async() => {
		const id = data.companies[0]._id;
		const company = {
			slots: 24
		};

		const response = await rp({ uri: url + `/api/companies/${id}`, method: 'PUT', form: company });
		const parsed = JSON.parse(response);

		for (let key in company) {
			assert.equal(parsed[key], company[key]);
		}

		data.companies[0] = parsed;
	});
});

describe('PUT /api/courses/:id', () => {
	it(`should update an object and assert all updated properties.`, async() => {
		const id = data.courses[0]._id;
		const course = {
			name: 'Test',
			endDate: '2017-07-31'
		};

		const response = await rp({ uri: url + `/api/courses/${id}`, method: 'PUT', form: course });
		const parsed = JSON.parse(response);

		for (let key in course) {
			if (['endDate', 'startDate'].includes(key)) {
				assert.equal(new Date(parsed[key]).getTime(), new Date(course[key]).getTime());
			} else {
				assert.equal(parsed[key], course[key]);
			}
		}

		data.courses[0] = parsed;
	});
});

describe('PUT /api/students/:id', () => {
	it(`should update an object and assert all updated properties.`, async() => {
		const id = data.students[0]._id;
		const student = {
			firstName: 'Jonte',
			address: 'Main street 5'
		};

		const response = await rp({ uri: url + `/api/students/${id}`, method: 'PUT', form: student });
		const parsed = JSON.parse(response);

		for (let key in student) {
			if (['courses', 'companies'].includes(key)) {
				parsed[key].should.containEql(student[key]);
			} else {
				assert.equal(parsed[key], student[key]);
			}
		}

		data.students[0] = parsed;
	});
});

describe('PUT /api/tutors/:id', () => {
	it(`should update an object and assert all updated properties.`, async() => {
		const id = data.tutors[0]._id;
		const tutor = {
			firstName: 'Anders',
			email: 'anders.bagge@gmail.com'
		};

		const response = await rp({ uri: url + `/api/tutors/${id}`, method: 'PUT', form: tutor });
		const parsed = JSON.parse(response);

		for (let key in tutor) {
			if (['students', 'courses', 'companies'].includes(key)) {
				parsed[key].should.containEql(tutor[key]);
			} else {
				assert.equal(parsed[key], tutor[key]);
			}
		}

		data.tutors[0] = parsed;
	});
});

/* REMOVE OBJECTS */

describe('DELETE /api/companies/:id', () => {
	it(`should respond with the removed object.`, async() => {
		const id = data.companies[0]._id;
		const name = data.companies[0].name;

		const response = await rp({ uri: url + `/api/companies/${id}`, method: 'DELETE' });
		const parsed = JSON.parse(response);

		assert.equal(parsed.name, name);
	});
});

describe('DELETE /api/courses/:id', () => {
	it(`should respond with the removed object.`, async() => {
		const id = data.courses[0]._id;
		const name = data.courses[0].name;

		const response = await rp({ uri: url + `/api/courses/${id}`, method: 'DELETE' });
		const parsed = JSON.parse(response);

		assert.equal(parsed.name, name);
	});
});

describe('DELETE /api/students/:id', () => {
	it(`should respond with the removed object.`, async() => {
		const id = data.students[0]._id;
		const firstName = data.students[0].firstName;

		const response = await rp({ uri: url + `/api/students/${id}`, method: 'DELETE' });
		const parsed = JSON.parse(response);

		assert.equal(parsed.firstName, firstName);
	});
});

describe('DELETE /api/tutors/:id', () => {
	it(`should respond with the removed object.`, async() => {
		const id = data.tutors[0]._id;
		const firstName = data.tutors[0].firstName;

		const response = await rp({ uri: url + `/api/tutors/${id}`, method: 'DELETE' });
		const parsed = JSON.parse(response);

		assert.equal(parsed.firstName, firstName);
	});
});
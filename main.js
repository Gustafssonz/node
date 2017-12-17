const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const rp = require('request-promise');

const baseURI = 'http://localhost:3000/api';
const URIs = {
	companies: {
		find: { method: 'GET', uri: baseURI + '/companies' },
		findById: { method: 'GET', uri: baseURI + '/companies/:id' },
		create: { method: 'POST', uri: baseURI + '/companies' },
		update: { method: 'PUT', uri: baseURI + '/companies/:id' },
		remove: { method: 'DELETE', uri: baseURI + '/companies/:id' },
	},
	courses: {
		find: { method: 'GET', uri: baseURI + '/courses' },
		findById: { method: 'GET', uri: baseURI + '/courses/:id' },
		create: { method: 'POST', uri: baseURI + '/courses' },
		update: { method: 'PUT', uri: baseURI + '/courses/:id' },
		remove: { method: 'DELETE', uri: baseURI + '/courses/:id' },
	},
	students: {
		find: { method: 'GET', uri: baseURI + '/students' },
		findById: { method: 'GET', uri: baseURI + '/students/:id' },
		create: { method: 'POST', uri: baseURI + '/students' },
		update: { method: 'PUT', uri: baseURI + '/students/:id' },
		remove: { method: 'DELETE', uri: baseURI + '/students/:id' },
	},
	tutors: {
		find: { method: 'GET', uri: baseURI + '/tutors' },
		findById: { method: 'GET', uri: baseURI + '/tutors/:id' },
		create: { method: 'POST', uri: baseURI + '/tutors' },
		update: { method: 'PUT', uri: baseURI + '/tutors/:id' },
		remove: { method: 'DELETE', uri: baseURI + '/tutors/:id' },
	}
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
	// Create the browser window.
	win = new BrowserWindow({ show: false });
	win.maximize();
	win.show();

	// and load the index.html of the app.
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));

	// Open the DevTools.
	win.webContents.openDevTools();

	// Emitted when the window is closed.
	win.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null;
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('api', (event, arg) => {
	const options = URIs[arg.type][arg.req];

	if (arg.data) {
		options.data = arg.data;
	}

	if (options.uri.indexOf(':id')) {
		options.uri.replace(':id', arg.id);
	}

	rp(options).then(response => {
		event.returnValue = response;
	}).catch(err => {
		event.returnValue = err;
	});
});
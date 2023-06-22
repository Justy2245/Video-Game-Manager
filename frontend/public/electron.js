const { app, BrowserWindow } = require('electron');

//For building electron app
const path = require('path');
const isDev = require('electron-is-dev');

require('@electron/remote/main').initialize();

//create a window for app
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      enableRemoteModule: true
    }
  });

  win.loadURL(
    isDev
     ? 'http://localhost:3000'
     : `file://${path.join(__dirname, '../build/index/html')}`);
};

app.on('ready', createWindow);
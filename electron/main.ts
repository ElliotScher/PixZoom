import { app, BrowserWindow, dialog, Menu, MenuItemConstructorOptions } from 'electron'
import path from 'node:path'
import fs from 'fs'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')

let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    fullscreen: false,
    minWidth: 800,
    minHeight: 600
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }

  // Create a new menu for the "Canvas" options
  const file: MenuItemConstructorOptions = {
    label: 'File',
    submenu: [
      {
        label: 'Upload Image',
        click: async () => {
          if (win) {
            const result = dialog.showOpenDialog(win, {
              properties: ['openFile'],
              filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'gif'] }]
            })

            if (!(await result).canceled && (await result).filePaths.length > 0) {
              const filePath = (await result).filePaths[0]

              fs.readFile(filePath, (err, data) => {
                if (err) {
                  console.error('Error reading file:', err)
                  return
                }

                const content = data.toString('base64') // Convert buffer to base64
                win?.webContents.send('upload-image', { filePath, content })
              })
            }
          }
        }
      },
      {
        label: 'Clear Gallery',
        click: () => {
          win?.webContents.send('clear-gallery')
        }
      },
      { type: 'separator' },
      {
        label: 'Save Image',
        click: () => {
          win?.webContents.send('save-image')
        }
      },
      {
        label: 'Clear Canvas',
        click: () => {
          win?.webContents.send('clear-canvas')
        }
      },
      { type: 'separator' },
      {
        label: 'Toggle Developer Tools',
        click: () => {
          win?.webContents.toggleDevTools()
        }
      }
    ]
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate([file]))
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)

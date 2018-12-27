### [Electron Starter App](https://github.com/warren-bank/electron-starter-app)

Electron project template that lays all the necessary foundations

#### Installation:

```bash
wget --content-disposition 'https://github.com/warren-bank/electron-starter-app/archive/master.zip'
unzip 'electron-starter-app-master.zip'
rm -f 'electron-starter-app-master.zip'
mv 'electron-starter-app-master' 'my-electron-app'
cd 'my-electron-app'

npm install

npm run dev
# ---------------------- 'dev' is an alias for the following:
# npm run 'clean:out'
# npm run 'bundle:main' # statically bundles scripts in 'main' process
# npm run 'dev:server'  # starts `webpack-dev-server` to dynamically bundle scripts in 'renderer' process
# npm run 'dev:start'   # starts `electron`: static 'main' process, dynamic 'renderer' process w/ hot reload
# ----------------------

npm start
# ---------------------- 'start' is an alias for the following:
# npm run 'clean:out'
# npm run 'bundle:all'
# npm run 'build:all'   # starts `electron-builder` to generate executables for all targets
# ----------------------
```

#### Legal:

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)

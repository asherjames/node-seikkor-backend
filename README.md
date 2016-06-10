# node-seikkor-backend
Back-end API for personal photo website re-written in Node.js

Same functionality as [seikkor-backend](https://github.com/asherjames/seikkor-backend) but with less code!  Configuration settings are found in `conf/config.json`.

**Note:** GraphicsMagick must be installed with the `gm` command available for the API to resize images properly.

###Install
```
npm install
```

###Test
```
npm test
```

###Run
```
node index.js
```

#####TODO

- Record all image info and return json
- Automatically create thumbnails
- Write unit tests

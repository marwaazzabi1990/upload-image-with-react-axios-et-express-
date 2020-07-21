/*const express = require("express");
const app = express();
const multer = require("multer");
const uuid = require("uuid");
const morgan = require("morgan");
const path = "../client/client/public";
const bodyparser = require("body-parser")
const cors = require('cors')
/* laison de l'emplacement */
/*app.use(bodyparser.json())
app.use(cors())
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, uuid.v4().toString() + "_" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb("Type file is not access", false);
    }
};
var upload = multer({
    storage,
    // fileFilter,
    //limits: 1024 * 1024 * 5
}).array('file')

app.post("/api/post", function (req, res) {
    console.log(req.file)
    const bo = req.file
    res.send({ bo })
    upload(req, res, function (err) {
        if (err)
            throw err
        return res.status(200).send(req.file)

    })

})

app.use(morgan("dev"));
app.use(express.json({ extented: false }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));*/
const express = require('express');
const multer = require('multer');
const bodyparser = require("body-parser")
const cors = require('cors')
const path = require('path');

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: '../client/client/public',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 3000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('file');

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Init app
const app = express();

// Public Folder
app.use(express.static('./public'));
app.use(bodyparser.json())
app.use(cors())
app.get('/', (req, res) => res.send('index'));

app.post('/api/post', (req, res) => {
    console.log()
    upload(req, res, (err) => {
        if (err) {
            res.send({ msg: err });
        } else {
            if (req.file == undefined) {
                res.send({ msg: 'Error: No File Selected!' });
            } else {
                res.send(req.file.filename)
            }
        }

    });
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
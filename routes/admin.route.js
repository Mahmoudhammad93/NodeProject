const router = require('express').Router();
const chech = require('express-validator').check;
const multer = require('multer')

const adminController = require('../controllers/admin.controller')
const adminGuard = require('./guards/admin.guard')

router.get('/add', adminGuard, adminController.getAdd)

router.post('/add', adminGuard, multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'images/upload')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
}).single('file'),
chech('file')
.custom((value, {req}) => {
    if(req.file) return true
    else throw 'Image is required'
}), adminController.postAdd)

module.exports = router;
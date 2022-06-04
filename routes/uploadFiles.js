const router = require('express').Router()

const assignmentUpload = require('../middleware/assignmentUpload')
const AssignmentCtrl = require('../controllers/AssignmentCtrl')

const express = require('express');


const auth = require('../middleware/auth')



router.post('/upload_file', assignmentUpload,  AssignmentCtrl.uploadFile)
router.post('/assignCr', AssignmentCtrl.assignment)





module.exports = router


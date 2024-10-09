const express = require('express')


const {addJobs} = require('../controllers/jobs/userJobController')
const {getJobs} = require('../controllers/jobs/userJobController')
const {deleteJobs}=require('../controllers/jobs/userJobController')

const router = express.Router()
router.post('/addjobs',addJobs)
//okay 

router.post('/getJobs',getJobs)
router.delete('/deletejobs/:id', deleteJobs)





module.exports = router
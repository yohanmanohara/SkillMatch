const express = require('express')
const {  signupUser } = require('../controllers/auth/signupcontroller')
const { loginUser } = require('../controllers/auth/logincontroller')
const { verifyOtp } = require('../controllers/auth/signupcontroller')
const {  getUsers } = require('../controllers/users/userController-admin')
const {deleteUser} = require('../controllers/users/userController-admin')
const {updateUser} = require('../controllers/users/userController-customer')
const {putActive} = require('../controllers/users/userController-admin')
const {putEmployer} = require('../controllers/users/userController-admin')
const {putEmployee} = require('../controllers/users/userController-admin')
const {putInactive} = require('../controllers/users/userController-admin')
const {verifyToken} = require('../controllers/auth/protected-route')
const {verifyTokenadmin} = require('../controllers/auth/protected-route')
const {getsingleuser} = require('../controllers/users/userController-customer')
const {updatePassword} = require('../controllers/users/userController-customer')
const {otpfroget} = require('../controllers/users/userController-customer')
const {resetpassword} = require('../controllers/users/userController-customer')
const {createOrganization} = require('../controllers/organization/organizationControllers')
const {getpicture} = require('../controllers/organization/organizationControllers')
const {addjobs} = require('../controllers/organization/organizationControllers')
const {fetchjobs} = require('../controllers/organization/organizationControllers')
const {updatejobs} = require('../controllers/organization/organizationControllers')
const {deletejob} = require('../controllers/organization/organizationControllers')
const {updatecv} = require('../controllers/users/userController-customer')
const {removecv} = require('../controllers/users/userController-customer')
const {getOrganizationJobs} = require('../controllers/organization/organizationControllers')
const {appliedjobs} = require('../controllers/users/userController-customer')
const {getappliedjobs} = require('../controllers/users/userController-customer')
const {sortCandidates} = require('../controllers/candidatesController')
const {rejectCandidates} = require('../controllers/candidatesController')
const {unsortcandidates} = require('../controllers/candidatesController')
const {processcandidates} = require('../controllers/candidatesController')
const {getcaluser} = require('../controllers/cal_controller')
const {update_cal} = require('../controllers/cal_controller')
const {calbookings} = require('../controllers/cal_controller')
const {calbookingsemployee} = require('../controllers/cal_controller')
const {getapikey} = require('../controllers/cal_controller')
const {calapikeystore} = require('../controllers/cal_controller')
const {candidatehire} = require('../controllers/candidatesController')
const {deleteresume} = require('../controllers/users/userController-customer')
const {recomandedjobs}  = require('../controllers/organization/organizationControllers')
const { route } = require('./JobRoutes')

const router = express.Router()

router.post('/candidates/process', processcandidates)
router.post('/candidates/unsort', unsortcandidates)
router.post('/candidates/reject', rejectCandidates)
router.post('/candidates/sort', sortCandidates)
router.post('/candidates/hire', candidatehire)

router.post('/calbookings/employee', calbookingsemployee)
router.post('/calapikeystore', calapikeystore)
router.post('/getapikey', getapikey)
router.post('/calbookings', calbookings)
router.post('/caluser', getcaluser)
router.post('/updatecal',update_cal)

router.post('/getorganizationspicture', getpicture)
router.post('/removecv', removecv)
router.post('/updatecv',updatecv)

router.get('/fetchjobs',fetchjobs)
router.post('/recommendedjobs',recomandedjobs)

router.post('/addjobs',addjobs)

router.post('/createorganizations', createOrganization)

router.post('/appliedjobs', appliedjobs)

router.post('/getappliedjobs', getappliedjobs)
router.delete('/deleteresume', deleteresume)

router.post('/login', loginUser)

router.post('/signup', signupUser)

router.post('/verifyotp', verifyOtp)

router.post('/getusers', getUsers)

router.delete('/deleteuser/:id', deleteUser)

router.delete('/deletejob', deletejob)
router.patch('/updateuser', updateUser)

router.put('/putactive/:id', putActive)

router.put('/putemployer/:id', putEmployer)

router.put('/putemployee/:id', putEmployee)

router.put('/updatejobs/:id', updatejobs)
router.put('/putinactive/:id', putInactive)

router.put('/putinactive/:id', putInactive)

router.get('/protected', verifyToken);

router.get('/admin', verifyTokenadmin);

router.get('/getsingleuser', getsingleuser);



router.post('/getOrganizationJobs', getOrganizationJobs);


router.patch('/updatpassword', updatePassword);

router.post('/otpfroget', otpfroget)

router.post('/resetpassword', resetpassword)

module.exports = router
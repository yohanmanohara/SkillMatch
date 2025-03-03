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
const router = express.Router()

router.post('/getorganizationspicture', getpicture)

router.post('/addjobs',addjobs)

router.post('/createorganizations', createOrganization)

router.post('/login', loginUser)

router.post('/signup', signupUser)

router.post('/verifyotp', verifyOtp)

router.post('/getusers', getUsers)

router.delete('/deleteuser/:id', deleteUser)

router.patch('/updateuser', updateUser)

router.put('/putactive/:id', putActive)

router.put('/putemployer/:id', putEmployer)

router.put('/putemployee/:id', putEmployee)


router.put('/putinactive/:id', putInactive)

router.put('/putinactive/:id', putInactive)

router.get('/protected', verifyToken);

router.get('/admin', verifyTokenadmin);

router.get('/getsingleuser', getsingleuser);

router.get('/getsingleuser', getsingleuser);

router.patch('/updatpassword', updatePassword);

router.post('/otpfroget', otpfroget)

router.post('/resetpassword', resetpassword)

module.exports = router
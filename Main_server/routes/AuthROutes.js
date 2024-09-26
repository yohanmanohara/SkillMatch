const express = require('express');
const router = express.Router();
const CredentialController = require('../controllers/CredentialProviderController');

router.get('/:id', (req, res) => CredentialController.getSingleCredential(req, res));
router.get('', (req, res) => CredentialController.getAllCredentials(req, res));
router.post('', (req, res) => CredentialController.createNewCredential(req, res));
router.put('/:id', (req, res) => CredentialController.updateCredential(req, res));
router.delete('/:id', (req, res) => CredentialController.deleteSingleCredential(req, res));
router.delete('', (req, res) => CredentialController.deleteAllCredentials(req, res));

module.exports = router;

const express = require('express');
const router = express.Router();
const OrganizationController = require('../controllers/organizationControllers');

router.get('/:id', (req, res) => OrganizationController.getSingleOrganization(req, res));
router.get('', (req, res) => OrganizationController.getAllOrganizations(req, res));
router.post('', (req, res) => OrganizationController.createNewOrganization(req, res));
router.put('/:id', (req, res) => OrganizationController.updateOrganization(req, res));
router.delete('/:id', (req, res) => OrganizationController.deleteSingleOrganization(req, res));
router.delete('', (req, res) => OrganizationController.deleteAllOrganizations(req, res));

module.exports = router;

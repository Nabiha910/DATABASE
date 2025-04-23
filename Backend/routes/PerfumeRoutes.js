const express = require('express');
const router = express.Router();
const PerfumeController = require('../controllers/PerfumeController');


router.get('/get/all', PerfumeController.getAllPerfumes);
router.get('/:id', PerfumeController.getPerfumeById);
router.post('/add/new', PerfumeController.createPerfume);
router.put('/edit/:id', PerfumeController.updatePerfume);
router.delete('/delete/:id', PerfumeController.deletePerfume);
router.get('/all/custom-requests', PerfumeController.getAllCustomPerfumeRequests);
router.get('/custom-requests/:id', PerfumeController.getCustomPerfumeRequestById);
router.post('/custom-requests', PerfumeController.createCustomPerfumeRequest);
router.put('/edit/custom-requests/:id', PerfumeController.updateCustomPerfumeRequest);
router.delete('/delete/custom-requests/:id', PerfumeController.deleteCustomPerfumeRequest);


module.exports = router;



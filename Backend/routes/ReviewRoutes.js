const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController'); // Make sure the file exists!

router.get('/get/all', ReviewController.getAllReviews);
router.get('/perfume/:perfume_id', ReviewController.getReviewsByPerfume_id); // Match function name
router.get('/:id', ReviewController.getReviewById);
router.post('/add/new', ReviewController.createReview);
router.put('/edit/:id', ReviewController.updateReview);
router.delete('/delete/:id', ReviewController.deleteReview);

module.exports = router;

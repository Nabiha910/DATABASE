const db = require('../DbSetup/MySqlConnection');

// Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM reviews');
    res.json({
      success: true,
      message: 'Reviews fetched successfully.',
      data: results,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching reviews.', error: err.message });
  }
};

// Get all reviews for a specific perfume
exports.getReviewsByPerfume_id = async (req, res) => {
    try {
      const { perfume_id } = req.params;
  
      const [results] = await db.query(
        'SELECT * FROM reviews WHERE perfume_id = ?',
        [perfume_id]
      );
  
      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: `No reviews found for perfume ID ${perfume_id}`,
        });
      }
  
      res.json({
        success: true,
        message: `Reviews for perfume ID ${perfume_id} fetched successfully.`,
        data: results,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Error fetching reviews.',
        error: err.message,
      });
    }
  };



  // Get a review by ID
exports.getReviewById = async (req, res) => {
    try {
      const { id } = req.params;
      const [results] = await db.query('SELECT * FROM reviews WHERE review_id = ?', [id]);
  
      if (results.length === 0) {
        return res.status(404).json({ success: false, message: 'Review not found' });
      }
  
      res.json({
        success: true,
        message: 'Review fetched successfully.',
        data: results[0],
      });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error fetching review.', error: err.message });
    }
  };
  

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const { user_id, order_id, perfume_id, custom_perfume_request_id, rating, review_text } = req.body;

    const [result] = await db.query(
      `INSERT INTO reviews (user_id, order_id, perfume_id, custom_perfume_request_id, rating, review_text, review_date)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [user_id, order_id, perfume_id, custom_perfume_request_id, rating, review_text]
    );

    res.status(201).json({
      success: true,
      message: 'Review created successfully.',
      review_id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error creating review.', error: err.message });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, order_id, perfume_id, custom_perfume_request_id, rating, review_text } = req.body;

    const [result] = await db.query(
      `UPDATE reviews
       SET user_id = ?, order_id = ?, perfume_id = ?, custom_perfume_request_id = ?, rating = ?, review_text = ?
       WHERE review_id = ?`,
      [user_id, order_id, perfume_id, custom_perfume_request_id, rating, review_text, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: `No review found with ID ${id}` });
    }

    res.json({
      success: true,
      message: 'Review updated successfully.',
      updatedReview: {
        review_id: id,
        user_id,
        order_id,
        perfume_id,
        custom_perfume_request_id,
        rating,
        review_text,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating review.', error: err.message });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query('DELETE FROM reviews WHERE review_id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'No review found with that ID' });
    }

    res.json({ success: true, message: 'Review deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting review.', error: err.message });
  }
};

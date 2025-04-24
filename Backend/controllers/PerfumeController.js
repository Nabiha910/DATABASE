const db = require('../DbSetup/MySqlConnection');

// Get all perfumes
exports.getAllPerfumes = async (req, res) => {
  try {
    console.log('Fetching all perfumes...');
    const [results] = await db.query('SELECT * FROM perfumes');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a perfume by ID
exports.getPerfumeById = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await db.query('SELECT * FROM perfumes WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Perfume not found' });
    }
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new perfume
exports.createPerfume = async (req, res) => {
  try {
    const { name, categories, rating, price,perfume_des,allergens,target_gender  } = req.body;
    const [results] = await db.query(
      'INSERT INTO perfumes (name, categories, price, rating,perfume_des,allergens,target_gender) VALUES (?, ?, ?, ?,?, ?, ?)',
        [name, categories, price, rating,perfume_des,allergens,target_gender]
    );
    res.status(201).json({ id: results.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePerfume = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, categories, price, rating, perfume_des, allergens, target_gender } = req.body;
  
      const [result] = await db.query(
        `UPDATE perfumes 
         SET name = ?, categories = ?, price = ?, rating = ?, perfume_des = ?, allergens = ?, target_gender = ? 
         WHERE perfume_id = ?`,
        [name, categories, price, rating, perfume_des, allergens, target_gender, id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: `No perfume found with ID ${id}` });
      }
  
      res.json({
        message: 'Perfume updated successfully',
        updatedPerfume: {
          id,
          name,
          categories,
          price,
          rating,
          perfume_des,
          allergens,
          target_gender,
        },
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update perfume', details: err.message });
    }
  };
  

// Delete a perfume
exports.deletePerfume = async (req, res) => {
    try {
      console.log('DELETE endpoint hit with id:', req.params.id);
  
      const { id } = req.params;
      const [result] = await db.query('DELETE FROM perfumes WHERE perfume_id = ?', [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'No perfume found with that ID' });
      }
  
      res.json({ message: 'Perfume deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  

  // Custom Perfume Api

  // table name = custom_perfume_requests
  // fileds are request_id, user_id, order_id, request_date, base_scent_category, intensity_level, bottle_style, status, customer_instructions

  // Get all custom perfume requests
exports.getAllCustomPerfumeRequests = async (req, res) => {
    try {
      const [results] = await db.query('SELECT * FROM custom_perfume_requests');
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


// Get a custom perfume request by ID
exports.getCustomPerfumeRequestById = async (req, res) => {
    try {
      const { id } = req.params;
      const [results] = await db.query('SELECT * FROM custom_perfume_requests WHERE request_id = ?', [id]);
      if (results.length === 0) {
        return res.status(404).json({ error: 'Custom perfume request not found' });
      }
      res.json(results[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // Create a new custom perfume request

exports.createCustomPerfumeRequest = async (req, res) => {
    try {
      const { user_id, order_id, base_scent_category, intensity_level, bottle_style, status, customer_instructions } = req.body;
      const [results] = await db.query(
        'INSERT INTO custom_perfume_requests (user_id, order_id, request_date, base_scent_category, intensity_level, bottle_style, status, customer_instructions) VALUES (?, ?, NOW(), ?, ?, ?, ?, ?)',
        [user_id, order_id,  base_scent_category, intensity_level, bottle_style, status, customer_instructions]
      );
      res.status(201).json({ id: results.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


// Update a custom perfume request

exports.updateCustomPerfumeRequest = async (req, res) => {
    try {
      const { id } = req.params;
      const { user_id, order_id, request_date, base_scent_category, intensity_level, bottle_style, status, customer_instructions } = req.body;
  
      const [result] = await db.query(
        `UPDATE custom_perfume_requests 
         SET user_id = ?, order_id = ?, request_date = ?, base_scent_category = ?, intensity_level = ?, bottle_style = ?, status = ?, customer_instructions = ? 
         WHERE request_id = ?`,
        [user_id, order_id, request_date, base_scent_category, intensity_level, bottle_style, status, customer_instructions, id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: `No custom perfume request found with ID ${id}` });
      }
  
      res.json({
        message: 'Custom perfume request updated successfully',
        updatedRequest: {
          id,
          user_id,
          order_id,
          request_date,
          base_scent_category,
          intensity_level,
          bottle_style,
          status,
          customer_instructions,
        },
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update custom perfume request', details: err.message });
    }
  }


// Delete a custom perfume request
exports.deleteCustomPerfumeRequest = async (req, res) => {
    try {
      const { id } = req.params;
      const [result] = await db.query('DELETE FROM custom_perfume_requests WHERE request_id = ?', [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'No custom perfume request found with that ID' });
      }
  
      res.json({ message: 'Custom perfume request deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  

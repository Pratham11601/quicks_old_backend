const { RzpKey } = require('../models'); // Adjust the path according to your project structure

// Controller to fetch the Razorpay key by ID
async function getRzpKeyById(req, res) {
  try {
    const { id } = req.params; // Get the ID from the request params

    // Find the RzpKey record by its ID
    const rzpKey = await RzpKey.findOne({ where: { id } });

    if (!rzpKey) {
      return res.status(404).json({ message: 'Razorpay key not found' });
    }

    // If record is found, send it in the response
    res.status(200).json(rzpKey);
  } catch (error) {
    console.error('Error fetching Razorpay key:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

// Controller to fetch all Razorpay keys
async function getAllRzpKeys(req, res) {
  try {
    // Fetch all records from the RzpKey table
    const rzpKeys = await RzpKey.findAll();

    if (!rzpKeys || rzpKeys.length === 0) {
      return res.status(404).json({ message: 'No Razorpay keys found' });
    }

    // Send the list of all Razorpay keys in the response
    res.status(200).json(rzpKeys);
  } catch (error) {
    console.error('Error fetching Razorpay keys:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

// Export the controller functions
module.exports = {
  getRzpKeyById,
  getAllRzpKeys,
};

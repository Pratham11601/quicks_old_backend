// controllers/subPackagesController.js

const { sub_packages } = require('../models'); // Adjust the path as necessary










exports.getAllSubPackages = async (req, res) => {
  try {
    const packages = await sub_packages.findAll();
    res.status(200).json(  {status:1, packages});
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving sub-packages', error });
  }
};

exports.addSubPackage = async (req, res) => {
  const { package_name, duration_in_days, price_per_day, total_price } = req.body;

  try {
    const newPackage = await sub_packages.create({
      package_name,
      duration_in_days,
      price_per_day,
      total_price
    });
    res.status(201).json(  {status:1,  newPackage});
  } catch (error) {
    res.status(500).json({ status:0, message: 'Error adding sub-package', error });
  }
};



exports.editSubPackage = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters
  const { package_name, duration_in_days, price_per_day, total_price } = req.body;

  // Create an object to hold the fields to be updated
  const updateFields = {};

  // Add only the provided fields to updateFields
  if (package_name) updateFields.package_name = package_name;
  if (duration_in_days) updateFields.duration_in_days = duration_in_days;
  if (price_per_day) updateFields.price_per_day = price_per_day;
  if (total_price) updateFields.total_price = total_price;

  try {
    const updatedPackage = await sub_packages.update(updateFields, {
      where: { id }
    });

    if (updatedPackage[0] === 0) {
      return res.status(404).json({ status: 0, message: 'Sub-package not found' });
    }

    res.status(200).json({ status: 1, message: 'Sub-package updated successfully' });
  } catch (error) {
    res.status(500).json({ status: 0, message: 'Error updating sub-package', error });
  }
};


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




const express = require('express');
const { DataTypes } = require('sequelize');
const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const fs = require('fs').promises;


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadFolder = path.join(__dirname, '../uploads');
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '' + file.originalname);
  },
});


/// new created
function saveBasicVendorDetails(req, res) {
  const { fullname, phone, aadhaar_number, password, vendor_cat, vendor_gender } = req.body;

  // Check if the vendor already exists using phone or Aadhaar
  models.VendorDetails.findOne({ where: { phone: phone } })
    .then(result => {
      if (result) {
        return res.status(409).json({
          message: "Vendor already exists, please login."
        });
      }

      // Generate a salt and hash the password
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          return res.status(500).json({
            message: "Failed to generate salt",
            error: err
          });
        }

        bcrypt.hash(password, salt, function (err, hash) {
          if (err) {
            return res.status(500).json({
              message: "Failed to hash password",
              error: err
            });
          }

          // Construct the vendor details
          const vendorDetails = {
            fullname,
            phone,
            aadhaar_number,
            password: hash,
            vendor_cat,
            vendor_gender
          };

          // Save the new vendor to the database
          models.VendorDetails.create(vendorDetails)
            .then(result => {
              res.status(201).json({
                message: "Vendor registered successfully",
                vendor: result
              });
            })
            .catch(err => {
              res.status(500).json({
                message: "Failed to register vendor",
                error: err
              });
            });
        });
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Failed to check for existing vendor",
        error: error
      });
    });
}


/// save data 
function saveVendorDetails(req, res) {
  const {
    fullname, phone, email, password,status, vendor_cat, businessName, city, currentAddress,
    pin_code, carnumber, subscriptionPlan, vendor_gender
  } = req.body;



  const documentImgUrl = req.files && req.files['documentImage'] ? path.join('uploads', 'documents', req.files['documentImage'][0].filename).replace(/\\/g, '/') : null;
  const licenseImgUrl = req.files && req.files['licenseImage'] ? path.join('uploads', 'license', req.files['licenseImage'][0].filename).replace(/\\/g, '/') : null;
  const profileImgUrl = req.files && req.files['profileImgUrl'] ? 
  path.join('profile_img', req.files['profileImgUrl'][0].filename).replace(/\\/g, '/') : null;


  models.VendorDetails.findOne({ where: { phone: phone } })
    .then(result => {
      if (result) {
        return res.status(409).json({
          message: "Already a user, please login."
        });
      }

      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          return res.status(500).json({
            message: "Failed to generate salt",
            error: err
          });
        }

        bcrypt.hash(password, salt, function (err, hash) {
          if (err) {
            return res.status(500).json({
              message: "Failed to hash password",
              error: err
            });
          }

          const vendorDetails = {
            fullname,
            phone,
            email,
            password: hash,
            profileImgUrl,
            vendor_cat,
            businessName,
            city,
            status,
            vendor_gender,
            documentImgUrl,
            licenseImgUrl,
            currentAddress,
            pin_code,
            carnumber,
            subscriptionPlan
          };

          models.VendorDetails.create(vendorDetails)
            .then((result) => {
              res.status(201).json({
                message: "Vendor registered successfully",
                vendor: result
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: "Failed to register vendor",
                error: err
              });
            });
        });
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Failed to check for an existing user",
        error: error
      });
    });
}



/// save profile image only
async function uploadVendorImages(req, res) {
  const { vid } = req.params; // Get vendor ID from request parameters

  if (!vid) {
    return res.status(400).json({
      message: "Vendor ID (vid) is required."
    });
  }

  // Extract image paths from the request
  const profileImgUrl = req.files && req.files['profileImgUrl']
    ? path.join('profile_img', req.files['profileImgUrl'][0].filename).replace(/\\/g, '/')
    : null;

  const documentImgUrl = req.files && req.files['documentImage']
    ? path.join('uploads', 'documents', req.files['documentImage'][0].filename).replace(/\\/g, '/')
    : null;

  const licenseImgUrl = req.files && req.files['licenseImage']
    ? path.join('uploads', 'license', req.files['licenseImage'][0].filename).replace(/\\/g, '/')
    : null;

  if (!profileImgUrl && !documentImgUrl && !licenseImgUrl) {
    return res.status(400).json({
      message: "No images uploaded."
    });
  }

  try {
    // Check if the vendor exists
    const vendor = await models.VendorDetails.findOne({ where: { id: vid } });

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found."
      });
    }

    // Update the vendor's image URLs
    if (profileImgUrl) vendor.profileImgUrl = profileImgUrl;
    if (documentImgUrl) vendor.documentImgUrl = documentImgUrl;
    if (licenseImgUrl) vendor.licenseImgUrl = licenseImgUrl;

    await vendor.save();

    return res.status(200).json({
      message: "Images uploaded successfully.",
      vendor
    });
  } catch (error) {
    console.error("Error uploading vendor images:", error);
    return res.status(500).json({
      message: "Failed to upload vendor images.",
      error
    });
  }
}








const uploadImages = async (req, res) => {
  try {
    const { profile, document, license } = req.files;

    const profileImgUrls = profile.map(file => file.filename);
    const documentImgUrls = document.map(file => file.filename);
    const licenseImgUrls = license.map(file => file.filename);

    const vendorId = req.params.vendorId;

    const vendorDetails = await VendorDetails.findByPk(vendorId);
    if (vendorDetails) {
      vendorDetails.profileImgUrls = profileImgUrls;
      vendorDetails.documentImgUrls = documentImgUrls;
      vendorDetails.licenseImgUrls = licenseImgUrls;
      await vendorDetails.save();
    } else {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    res.status(201).json({ message: 'Images uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


function editVendorDetails(req, res) {
  const vendorId = req.params.id;
  const {
    // fullname,
    //  phone,
    email,
    
    businessName,
    vendor_cat,
    currentAddress,
    city,
    pin_code,
    //  carnumber,
    // subscriptionPlan,
    //  vendor_gender
  } = req.body;

  // const documentImgUrl = req.files && req.files['documentImage'] ? path.join('uploads', 'documents', req.files['documentImage'][0].filename) : null;
  // const licenseImgUrl = req.files && req.files['licenseImage'] ? path.join('uploads', 'license', req.files['licenseImage'][0].filename) : null;
  // const profileImgUrl = req.files && req.files['profileImgUrl'] ? path.join('uploads', 'profile_img', req.files['profileImgUrl'][0].filename).replace(/\\/g, '/') : null;

  models.VendorDetails.findByPk(vendorId)
    .then(result => {
      if (!result) {
        return res.status(404).json({
          message: "Vendor not found"
        });
      }

      // Update the existing vendor details
      // result.fullname = fullname;
      // result.phone = phone;
      result.email = email;
      // result.profileImgUrl = profileImgUrl;

      result.businessName = businessName;
      result.vendor_cat = vendor_cat;
      result.currentAddress = currentAddress;
      result.city = city;
      result.pin_code = pin_code;

       
      // result.documentImgUrl = documentImgUrl;
      // result.licenseImgUrl = licenseImgUrl;

      result.save()
        .then(updatedVendor => {
          res.status(200).json({
            message: "Vendor details updated successfully",
            vendor: updatedVendor
          });
        })
        .catch(err => {
          res.status(500).json({
            message: "Failed to update vendor details",
            error: err
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: "Failed to find vendor",
        error: error
      });
    });
};

function updateVendorSubscriptionPlan(req, res) {
  const vendorId = req.params.id; // Get vendor ID from request parameters
  const { subscriptionPlan } = req.body; // Extract subscriptionPlan from request body

  if (!subscriptionPlan) {
    return res.status(400).json({
      message: "subscriptionPlan is required",
    });
  }

  models.VendorDetails.findByPk(vendorId)
    .then((vendor) => {
      if (!vendor) {
        return res.status(404).json({
          message: "Vendor not found",
        });
      }

      // Update the subscription plan and subscription date
      vendor.subscriptionPlan = subscriptionPlan;
      vendor.subscription_date = new Date(); // Set subscription_date to the current date and time

      vendor
        .save()
        .then((updatedVendor) => {
          res.status(200).json({
            message: "Subscription plan and date updated successfully",
            vendor: updatedVendor,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Failed to update subscription plan and date",
            error: err.message,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to find vendor",
        error: error.message,
      });
    });
}

// function checkSubscriptionExpiry(req, res) {
//   const vendorId = req.params.id; // Get vendor ID from request parameters

//   models.VendorDetails.findByPk(vendorId)
//     .then((vendor) => {
//       if (!vendor) {
//         return res.status(404).json({
//           message: "Vendor not found",
//         });
//       }

//       const { subscriptionPlan, subscription_date } = vendor;

//       if (!subscription_date || !subscriptionPlan) {
//         return res.status(400).json({
//           message: "Subscription plan or date is missing for this vendor",
//         });
//       }

//       // Calculate the subscription expiration based on the plan
//       const subscriptionStartDate = new Date(subscription_date);
//       const currentDate = new Date();

//       const diffTime = Math.abs(currentDate - subscriptionStartDate); // Difference in milliseconds
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert to days

//       // Check expiration based on the subscriptionPlan duration (assuming days for simplicity)
//       if (diffDays > subscriptionPlan) {
//         return res.status(200).json({
//           message: "Subscription has expired",
//           daysPassed: diffDays,
//           subscriptionPlan: subscriptionPlan,
//           expired: true,
//         });
//       } else {
//         const daysLeft = subscriptionPlan - diffDays;
//         return res.status(200).json({
//           message: "Subscription is active",
//           daysLeft: daysLeft,
//           subscriptionPlan: subscriptionPlan,
//           expired: false,
//         });
//       }
//     })
//     .catch((error) => {
//       res.status(500).json({
//         message: "Failed to retrieve vendor data",
//         error: error.message,
//       });
//     });
// }

function checkSubscriptionExpiry(req, res) {
  const vendorId = req.params.id; // Get vendor ID from request parameters

  models.VendorDetails.findByPk(vendorId)
    .then((vendor) => {
      if (!vendor) {
        return res.status(404).json({
          message: "Vendor not found",
        });
      }

      const { subscriptionPlan, subscription_date } = vendor;

      if (!subscription_date || !subscriptionPlan) {
        return res.status(400).json({
          message: "Subscription plan or date is missing for this vendor",
        });
      }

      // Retrieve the subscription plan details from the Subscription table
      models.Subscription.findByPk(subscriptionPlan)
        .then((subscription) => {
          if (!subscription) {
            return res.status(404).json({
              message: "Subscription plan not found",
            });
          }

          const subscriptionDuration = parseInt(subscription.duration); // Assuming duration is in days
          const subscriptionPrice = subscription.price; // Assuming price is stored in the Subscription table

          const subscriptionStartDate = new Date(subscription_date);
          const currentDate = new Date();

          // Calculate the difference in time between the current date and subscription start date
          const diffTime = Math.abs(currentDate - subscriptionStartDate); // Difference in milliseconds
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert to days

          // Check expiration based on the subscriptionPlan duration
          if (diffDays > subscriptionDuration) {
            return res.status(200).json({
              message: "Subscription has expired",
              subscriptionStartDate: subscriptionStartDate.toISOString(), // Format the start date
              daysLeft: 0,
              subscriptionPlan: subscriptionPlan,
              expired: true,
            });
          } else {
            const daysLeft = subscriptionDuration - diffDays;
            return res.status(200).json({
              message: "Subscription is active",
              subscriptionStartDate: subscriptionStartDate.toISOString(), // Format the start date
              daysLeft: daysLeft,
              subscriptionPlan: subscriptionPlan,
              expired: false,
            });
          }
        })
        .catch((error) => {
          res.status(500).json({
            message: "Failed to retrieve subscription plan data",
            error: error.message,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to retrieve vendor data",
        error: error.message,
      });
    });
}



function getVendorDetailsById(req, res) {
  const vendorId = req.params.id;

  models.VendorDetails.findByPk(vendorId)
    .then(vendor => {
      if (!vendor) {
        return res.status(404).json({

          message: "Vendor not found",
        });
      }

      res.status(200).json({

        vendor: vendor,

      });
    })
    .catch(error => {
      console.error('Error retrieving vendor details:', error);
      res.status(500).json({

        error: error
      });
    });
};


function showAllVendors(req, res) {
  models.VendorDetails.findAll()
    .then(vendors => {
      res.status(200).json({
        status: true,
        vendors: vendors,
        message: "Successfully retrieved all vendors",
      });
    })
    .catch(error => {
      console.error('Error retrieving vendors:', error);
      res.status(500).json({
        message: "Error retrieving vendors",
        error: error
      });
    });
};

function login(req, res) {
  const { phone, password } = req.body;

  models.VendorDetails.findOne({ where: { phone: phone } })
    .then(user => {
      if (user == null) {
        return res.status(401).json({
          message: "Invalid credentials! Please create an account."
        });
      }

      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          const token = jwt.sign({
            phone: user.phone,
            userId: user.id,
            fullname: user.fullname,
            vendor_cat: user.vendor_cat,
            email: user.email,
            profileImgUrl: user.profileImgUrl,
            licenseImgUrl: user.licenseImgUrl,
            documentImgUrl: user.documentImgUrl,
            currentAddress: user.currentAddress,
            pin_code: user.pin_code,
            carnumber: user.carnumber,
            subscriptionPlan: user.subscriptionPlan,
            vendor_gender: user.vendor_gender
          }, 'your_secret_key', { expiresIn: '7h' });

          console.log('Generated Token:', token);

          res.status(200).json({
            status: true,
            userId: user.id,
            token: token,
            message: "Successfully Logged in",
          });
        } else {
          return res.status(401).json({
            message: "Invalid Password"
          });
        }
      });
    })
    .catch(error => {
      console.error('Error during login:', error);
      res.status(500).json({
        message: "Error during login",
        error: error
      });
    });
};




function updateVendorDetails(req, res) {
  const vendorId = req.params.id;

  models.VendorDetails.findByPk(vendorId)
    .then(result => {
      if (!result) {
        return res.status(404).json({
          message: "Vendor not found"
        });
      }

      result.fullname = req.body.fullname || result.fullname;
      result.phone = req.body.phone || result.phone;
      result.email = req.body.email || result.email;
      result.currentAddress = req.body.currentAddress || result.currentAddress;

      // Handle file uploads
      if (req.file) {
        result.profileImgUrl = path.join('uploads/profile_img/', req.file.filename);
      }

      if (req.files['documentImage']) {
        result.documentImgUrl = path.join('uploads', req.files['documentImage'][0].filename);
      }

      if (req.files['licenseImage']) {
        result.licenseImgUrl = path.join('uploads', req.files['licenseImage'][0].filename);
      }

      result.save()
        .then(updatedVendor => {
          res.status(200).json({
            message: "Vendor details updated successfully",
            vendor: updatedVendor
          });
        })
        .catch(err => {
          res.status(500).json({
            message: "Failed to update vendor details",
            error: err
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: "Failed to find vendor",
        error: error
      });
    });
};

function checkPhoneNumberExistence(req, res) {
  const { phone } = req.body;

  models.VendorDetails.findOne({ where: { phone: phone } })
    .then(result => {
      if (result) {
        return res.status(409).json({
          message: "Phone number already exists. Please login."
        });
      } else {
        res.status(200).json({
          message: "Phone number available for registration."
        });
      }
    })
    .catch(error => {
      console.error('Error checking phone number existence:', error);
      res.status(500).json({
        message: error.message

      });
    });
}


async function resetPassword(req, res) {
  try {
    const { phone, newPassword } = req.body;

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password directly
    await models.VendorDetails.update(
      { password: hashedPassword },
      { where: { phone } }
    );

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateEmail(req, res) {
  try {
    const { phone, newEmail } = req.body;

    // Validate email format
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(newEmail)) {
      return res.status(400).json({
        message: "Invalid email format."
      });
    }

    // Check if vendor exists
    const vendor = await models.VendorDetails.findOne({ where: { phone } });
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found." });
    }

    // Update the vendor's email
    vendor.email = newEmail;
    await vendor.save();

    res.status(200).json({ message: "Email updated successfully", vendor });
  } catch (error) {
    console.error('Error updating email:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

function getUserDetailsByPhone(req, res) {
  const { phone } = req.params;

  models.VendorDetails.findOne({ where: { phone } })
    .then(vendor => {
      if (!vendor) {
        return res.status(404).json({
          message: "Vendor not found"
        });
      }

      res.status(200).json({
        vendor: vendor
      });
    })
    .catch(error => {
      console.error('Error retrieving vendor details:', error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message
      });
    });
}

function checkProfileCompletion(req, res) {
  const { id } = req.params; // Get vendor ID from request parameters

  if (!id) {
    return res.status(400).json({
      message: "Vendor ID is required to check profile completion.",
    });
  }

  models.VendorDetails.findOne({ where: { id } })
    .then(vendor => {
      if (!vendor) {
        return res.status(404).json({
          message: "Vendor not found.",
          isComplete: false,
        });
      }

      // Check if any required field is missing or empty
      const requiredFields = [
        vendor.fullname,
        vendor.vendor_gender,
        vendor.phone,
        vendor.email,
        vendor.aadhaar_number,
        vendor.profileImgUrl,
        vendor.businessName,
        vendor.vendor_cat,
        vendor.currentAddress,
        vendor.city,
        vendor.pin_code,
        vendor.licenseImgUrl,
        vendor.documentImgUrl,
      ];

      const isComplete = requiredFields.every(field => field && field.trim() !== "");

      res.status(200).json({
        isComplete, // true if profile is complete, false otherwise
        message: isComplete
          ? "Profile is complete."
          : "Profile is incomplete. Please fill all required fields.",
      });
    })
    .catch(error => {
      console.error('Error checking profile completion:', error);
      res.status(500).json({
        message: "An error occurred while checking profile completion.",
        error: error.message,
        isComplete: false,
      });
    });
}



module.exports = {
  checkSubscriptionExpiry: checkSubscriptionExpiry,
  updateVendorSubscriptionPlan: updateVendorSubscriptionPlan,
  uploadVendorImages: uploadVendorImages,
  saveVendorDetails: saveVendorDetails,
  uploadImages: uploadImages,
  login: login,
  showAllVendors: showAllVendors,
  updateVendorDetails: updateVendorDetails,
  checkPhoneNumberExistence: checkPhoneNumberExistence,
  getVendorDetailsById: getVendorDetailsById,
  editVendorDetails: editVendorDetails,
  resetPassword: resetPassword,
  updateEmail: updateEmail,
  getUserDetailsByPhone: getUserDetailsByPhone,
  saveBasicVendorDetails: saveBasicVendorDetails,
  checkProfileCompletion: checkProfileCompletion
};

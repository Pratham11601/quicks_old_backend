const { DataTypes, Model  } = require('sequelize');
const { sequelize } = require('../models');
const models = require('../models');
const { Lead } = require('../models');

const { Op } = require('sequelize');

// Function to get lead statistics
async function stats(req, res)  {
  try {
    const totalLeads = await Lead.count();
    const activeLeads = await Lead.count({ where: { is_active: true } });
    const inactiveLeads = await Lead.count({ where: { is_active: false } });

    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayLeads = await Lead.count({ where: { date: todayStart } });

    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const currentMonthLeads = await Lead.count({
      where: {
        date: {
          [Op.gte]: currentMonthStart,
        }
      }
    });

    res.json({
      totalLeads,
      activeLeads,
      inactiveLeads,
      todayLeads,
      currentMonthLeads,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching lead statistics.' });
  }
  }










function save(req, res) {
    const Lead = {
        vendor_cat: req.body.vendor_cat,
        date: req.body.date,
        time: req.body.time,
        location_from: req.body.location_from,
        location_from_area: req.body.location_from_area, // Add location_from_area
        to_location: req.body.to_location,
        to_location_area: req.body.to_location_area, // Add to_location_area
        car_model: req.body.car_model, // Add car_model field
        add_on: req.body.add_on, // Add car_model field
        fare: req.body.fare, // Add fare field
        cab_number: req.body.cab_number,
        vendor_contact: req.body.vendor_contact,
        vendor_name: req.body.vendor_name,
        vendor_id: req.body.vendor_id,
        is_active: req.body.is_active,
    };

    models.Lead.create(Lead).then((result) => {
        res.status(201).json({
            message: "Post created successfully",
            post: result
        });
    }).catch((err) => {
        res.status(500).json({
            message: "Failed to create post",
            error: err
        });
    });
}


function index(req, res) {
    const vendorId = req.params.id;

    models.Lead.findByPk(vendorId).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: "Post not found"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}


    
function getDistinctLocationFromValues(req, res) {
    models.Lead.findAll({
        attributes: [
            [sequelize.fn('DISTINCT', sequelize.col('location_from')), 'location_from']
        ],
        where: {
            is_active: true
        }
    }).then(result => {
        const locationFromValues = result.map(item => item.location_from);
        res.status(200).json({
            locationFromValues: locationFromValues,
            message: "Fetched distinct locationFrom values successfully"
        });
    }).catch(error => {
        console.error("Error fetching distinct locationFrom values:", error);
        res.status(500).json({
            message: "Failed to fetch distinct locationFrom values",
            error: error
        });
    });
}


function getDistinctLocationtoValues(req, res) {
    models.Lead.findAll({
        attributes: [
            [sequelize.fn('DISTINCT', sequelize.col('to_location')), 'to_location']
        ],
        where: {
            is_active: true
        }
    }).then(result => {
        const locationtoValues = result.map(item => item.to_location);
        res.status(200).json({
            locationtoValues: locationtoValues,
            message: "Fetched distinct to_location values successfully"
        });
    }).catch(error => {
        console.error("Error fetching distinct to_location values:", error);
        res.status(500).json({
            message: "Failed to fetch distinct to_location values",
            error: error
        });
    });
}



function show(req, res) {

    models.Lead.findAll({
        order: [['id', 'DESC']]   
    }).then(
        result => {
            res.status(200).json({
                result: result,
                message: "got Fetch successfully"
            });
        }
    ).catch(error => {
        res.status(500).json({
            message: "SomethingWent Wrong",
            error: error
        })

    });
}



function showActive(req, res) {
    models.Lead.findAll({
        where: {
            is_active: true
        }
    }).then(result => {
        res.status(200).json({
            results: result,
            message: "Fetch successful"
        });
    }).catch(error => {
        console.error("Error fetching leads:", error);
        res.status(500).json({      
            message: "Something went wrong"
        });
    });
}


function showOnlyActive(req, res) {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 15;
    const offset = (page - 1) * pageSize;

    models.Lead.findAndCountAll({
        where: {
            is_active: true
        },
        limit: pageSize,
        offset: offset,
    }).then(result => {
        const { count, rows } = result;
        res.status(200).json({
            totalItems: count,
            totalPages: Math.ceil(count / pageSize),
            currentPage: page,
            leads: rows,
            message: "Fetch successful"
        });
    }).catch(error => {
        console.error("Error fetching leads:", error);
        res.status(500).json({
            message: "Something went wrong"
        });
    });
}




function showOtherdata(req, res) {

    models.Lead.findAll({
        where: {
            is_active: true
        },
        offset:3
    }).then(result => {
        res.status(200).json({
            result: result,
            message: "Fetch successful"
        });
    }).catch(error => {
        console.error("Error fetching leads:", error);
        res.status(500).json({
            message: "Something went wrong"
        });
    });
}


function edit(req, res) {
    const leadId = req.params.id;

    models.Lead.findByPk(leadId)
        .then(lead => {
            if (!lead) {
                return res.status(404).json({
                    message: "Lead not found"
                });
            }

            // Update lead attributes based on request body
            lead.vendor_cat = req.body.vendor_cat || lead.vendor_cat;
            lead.date = req.body.date || lead.date;
            lead.time = req.body.time || lead.time;
            lead.location_from = req.body.location_from || lead.location_from;
            lead.location_from_area = req.body.location_from_area || lead.location_from_area; // Update location_from_area
            lead.to_location = req.body.to_location || lead.to_location;
            lead.to_location_area = req.body.to_location_area || lead.to_location_area; // Update to_location_area
            lead.car_model = req.body.car_model || lead.car_model; // Update car_model
            lead.add_on = req.body.add_on || lead.add_on; // Update car_model
            lead.fare = req.body.fare || lead.fare; // Update fare
            lead.cab_number = req.body.cab_number || lead.cab_number;
            lead.vendor_contact = req.body.vendor_contact || lead.vendor_contact;
            lead.vendor_name = req.body.vendor_name || lead.vendor_name;
            lead.vendor_id = req.body.vendor_id || lead.vendor_id;

            // Update the is_active field (boolean handling)
            lead.is_active = req.body.is_active !== undefined ? req.body.is_active : lead.is_active;

            // Save the updated lead
            lead.save()
                .then(updatedLead => {
                    res.status(200).json({
                        message: "Lead updated successfully",
                        lead: updatedLead
                    });
                })
                .catch(error => {
                    console.error("Error saving updated lead:", error);
                    res.status(500).json({
                        message: "Failed to update lead",
                        error: error
                    });
                });
        })
        .catch(error => {
            console.error("Error finding lead by ID:", error);
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

function updatePostActiveness(req, res) {
    const id = req.params.id;

    const updatedPost = {
        is_active: true
    };

    models.Lead.update(updatedPost, {
        where: {
            id: id
        }
    })
    .then(result => {
        if (result[0] === 1) {
            res.status(200).json({
                message: "Post updated successfully",
                post: result
            });
        } else if (result[0] === null) {
            res.status(200).json({
                message: "Post updated successfully",
                post: result
            });
        } else {
            res.status(404).json({
                message: "Post not found or already active"
            });
        }
    })
    .catch(error => {
        // Handle errors
        res.status(500).json({
            message: "Failed to update post",
            error: error
        });
    });
}



function showHistorydata(req, res) {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 12;
    const offset = (page - 1) * pageSize;

    models.Lead.findAndCountAll({
        where: {
            is_active: false
        },
        limit: pageSize,
        order: [['createdAt', 'DESC']],
        offset: offset,
    }).then(result => {
        const { count, rows } = result;
        res.status(200).json({
            message: "Fetch successful",
            totalItems: count,
            totalPages: Math.ceil(count / pageSize),
            currentPage: page,
            leads: rows,
          
        });
    }).catch(error => {
        console.error("Error fetching leads:", error);
        res.status(500).json({
            message: "Something went wrong"
        });
    });
}

function showeveryLead(req, res) {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 15;
    const offset = (page - 1) * pageSize;



    console.log("hello uped");

    models.Lead.findAndCountAll({
        order: [['createdAt', 'DESC']], // Order by createdAt in descending order
        limit: pageSize,
        offset: offset,
    }).then(result => {
        const { count, rows } = result;
        res.status(200).json({
            totalItems: count,
            totalPages: Math.ceil(count / pageSize),
            currentPage: page,
            leads: rows,
            message: "Fetch successful"
        });
    }).catch(error => {
        console.error("Error fetching leads:", error);
        res.status(500).json({
            message: "Something went wrong"
        });
    });
}


module.exports = {
    save: save,
    stats: stats,
    edit: edit,
    show: show,
    index: index,
    showOnlyActive: showOnlyActive,
    showOtherdata:showOtherdata,
    updatePostActiveness: updatePostActiveness,
    getDistinctLocationFromValues: getDistinctLocationFromValues,
    getDistinctLocationtoValues: getDistinctLocationtoValues,
    showActive:showActive,
    showHistorydata:showHistorydata,
    showeveryLead:showeveryLead,
};




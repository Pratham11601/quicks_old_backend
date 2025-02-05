const { sequelize } = require('../models');
const models = require('../models');

function index(req, res) {
    const vendorId = req.params.id;

    models.help_support.findByPk(vendorId).then(result => {
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

function save(req, res) {
    models.help_support.create({
        query_message: req.body.query_message,
        vendor_category: req.body.vendor_category,
        vendor_id: req.body.vendor_id,
        vendor_contact: req.body.vendor_contact,
        vendor_name: req.body.vendor_name
    }).then((result) => {
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


function getDistinctVendorCategoryValues(req, res) {
    models.help_support.findAll({
        attributes: [
            [sequelize.fn('DISTINCT', sequelize.col('vendor_category')), 'vendor_category']
        ],
        where: {
        }
    }).then(result => {
        const vendorCategoryValues = result.map(item => item.vendor_category);
        res.status(200).json({
            vendorCategoryValues: vendorCategoryValues,
            message: "Fetched distinct vendorCategory values successfully"
        });
    }).catch(error => {
        console.error("Error fetching distinct vendorCategory values:", error);
        res.status(500).json({
            message: "Failed to fetch distinct vendorCategory values",
            error: error
        });
    });
}

function getAll(req, res) {
    models.help_support.findAll()
        .then(results => {
            res.status(200).json({
                message: "Fetched all records successfully",
                data: results
            });
        })
        .catch(error => {
            console.error("Error fetching all records:", error);
            res.status(500).json({
                message: "Failed to fetch records",
                error: error
            });
        });
}

module.exports = {
    save: save,
    index: index,
    getDistinctVendorCategoryValues: getDistinctVendorCategoryValues,
    getAll: getAll, 
};
 
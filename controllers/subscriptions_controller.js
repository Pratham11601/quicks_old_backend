const { Subscription } = require('../models');

const subscriptionController = {
  getAll: async (req, res) => {
    try {
      const subscriptions = await Subscription.findAll();
      res.status(200).json({
        message: "Fetched all subscriptions successfully",
        data: subscriptions,
      });
    } catch (error) {
      console.error("Error fetching all subscriptions:", error);
      res.status(500).json({
        message: "Failed to fetch subscriptions",
        error: error.message,
      });
    }
  },
};

module.exports = subscriptionController;

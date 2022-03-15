const express = require('express');
const { getAppointments } = require('../controllers/appointment');
const { protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.get('/', protect, getAppointments);

module.exports = router;

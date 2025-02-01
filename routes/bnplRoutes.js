const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { startBNPLPurchase, viewPaymentSchedule, makePayment} = require('../controllers/bnplController');

router.post('/api/create', authenticate, startBNPLPurchase);
router.get('/api/schedule/:userid', authenticate, viewPaymentSchedule);
router.post('/api/pay', authenticate, makePayment);

module.exports = router;
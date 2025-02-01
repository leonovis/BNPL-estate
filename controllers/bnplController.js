const User = require('../models/User');
const Property = require('../models/Property');
const BNPLTransaction = require('../models/BNPLTransaction');

exports.startBNPLPurchase = async (req, res ) => {
    try {
        const { userId, propertyId } = req.body;

        const user = await User.findById(userId);
        const property = await Property.findById(propertyId);
        
        if (!user || !property) {
            return res.status(404).json({ error: 'User or Property not found' });
        }

        const propertyPrice = property.price;
        const upfrontPayment = property.price * 0.1;
        const remainingPayment = property.price * 0.9;

        //Apply 5% interest rate on remaining balance
        const totalWithInterest = remainingPayment * 1.05;
        const monthlyPayment = totalWithInterest / 12;

        // check if user has enough balance for upfront payment
        if (user.walletBalance < upfrontPayment) {
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        //deduct upfront payment from user's wallet
        user.walletBalance -= upfrontPayment;
        await user.save();

        // create BNPL transaction
        const transaction = new BNPLTransaction({
            user: userId,
            property: propertyId,
            upfrontPayment,
            totalAmountDue: totalWithInterest,
            monthlyPayment,
            paymentsMade: [],
            missedPayments: 0,
        });

        await transaction.save();

        res.status(201).json({ message: 'BNPL transaction started successfully', transaction });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.viewPaymentSchedule = async (req, res) => {
    try {
        const { userId, propertyId } = req.body;

        const user = await User.findById(userId);
        const property = await Property.findById(propertyId);

        if (!transaction.length) {
            return res.status(404).json({ error: 'No BNPL transactions found' });
        }

        const paymentSchedule = transaction.payments.map( txn => ({
            property: txn.property,
            totalAmountDue: txn.totalAmountDue,
            monthlyPayment: txn.monthlyPayment,
            paymentsMade: txn.payments,
            missedPayments: txn.missedPayments,
        }));

        res.json(paymentSchedule);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.makePayment = async (req, res) => {
    try {
        const { userId, propertyId } = req.body;

        const user = await User.findById(userId);
        const property = await Property.findById(propertyId);
        
        if (!user || !property) {
            return res.status(404).json({ error: 'User or Property not found' });
        }

        if (user.walletBalance < transaction.monthlyPayment) {
            return res.status(400).json({ error: 'Insufficient funds' });
        }

        //deduct monthly payment from user's wallet
        user.walletBalance = user.walletBalance - transaction.monthlyPayment
        await user.save();

        //Record the payment
        transaction.payments.push({ amount: transaction.monthlyPayment });

        const totalPaid = transaction.payments.reduce((sum, payment) => sum + payment.amount, 0);
        if (totalpaid >= property.price * 0.5) {
            await property.findByIdAndUpdate(transaction.property, { locked: false, resellable: true})
        }

        await transaction.save();

        res.json({ message: 'Payment successful', transaction });
    } catch (error) {
        res.status(500).json({ error: error.message });
        
    }
}
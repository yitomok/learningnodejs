'use strict'

const co = require('co')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const accountSchema = new mongoose.Schema({
    name: { type: String, required: true },
    balance: { type: Number, default: 0 },
    pendingTransactions: { type: Array, default: [] }
})

const Account = mongoose.model('Account', accountSchema)

const transactionSchema = new mongoose.Schema({
    source: { type: String, required: true },
    destination: { type: String, required: true },
    value: { type: Number, default: 0 },
    state: { type: String, required: true, default: "initial" },
    lastModified: { type: Date, default: Date.now }
})

const Transaction = mongoose.model('Transaction', transactionSchema)

co(function *() {
    mongoose.connect('mongodb://localhost/ci')

    //Create data
    //yield [ "A", "B" ].map(cur => Account.findOneAndUpdate({name: cur}, {$set: {balance: 1000}}, {upsert: true}).exec())
    //Create transaction
    yield Transaction.create({source: process.env.SRC || "A", destination: process.env.DEST || "B", value: process.env.AMT || 100})

    //Initialize transaction
    let t = yield Transaction.findOneAndUpdate({state: "initial"}, {$set: {state: "pending"}, $currentDate: {lastModified: true}}).exec()
    //Initialize data
    yield [ t.source, t.destination ].map(cur => Account.findOneAndUpdate({name: cur, pendingTransactions: {$ne: t._id}}, {$push: {pendingTransactions: t._id}}).exec())

    //Update data
    yield [ {target: t.source, value: -t.value}, {target: t.destination, value: t.value} ].map(cur => Account.findOneAndUpdate({name: cur.target, pendingTransactions: t._id}, {$inc: {balance: cur.value}}).exec())
    //Update transaction
    t = yield Transaction.findOneAndUpdate({state: "pending"}, {$set: {state: "applied"}, $currentDate: {lastModified: true}}).exec()

    //Done data
    console.log(yield [ t.source, t.destination ].map(cur => Account.findOneAndUpdate({name: cur, pendingTransactions: t._id}, {$pull: {pendingTransactions: t._id}}).exec()))
    //Done transaction
    yield Transaction.findOneAndUpdate({state: "applied"}, {$set: {state: "done"}, $currentDate: {lastModified: true}}).exec()

    mongoose.disconnect()
}).catch(err => { console.log(err) })

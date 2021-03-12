const express = require('express');

const router = express.Router();

const SubscriptionBL = require('../BL/SubscriptionBL');

router.route('/')
    .get(async function (req, resp) {
        let subs = await SubscriptionBL.getAllSubscriptions()
        return resp.json(subs);
    })

router.route('/:id')
    .get(async function (req, resp) {
        let sub = await SubscriptionBL.getSubscription(req.params.id)
        return resp.json(sub);
    })

router.route('')
    .post(async function (req, resp) {
        console.log(req.body);
        let obj = req.body;

        let status = await SubscriptionBL.addSubscription(obj)
        return resp.json(status);
    })

router.route('/:id')
    .put(async function (req, resp) {
        let obj = req.body;
        let id = req.params.id;

        let status = await SubscriptionBL.updateSubscription(id, obj)
        return resp.json(status);
    })

router.route('/:id')
    .delete(async function (req, resp) {
        let id = req.params.id;

        let status = await SubscriptionBL.deleteSubscription(id)
        return resp.json(status);
    })






module.exports = router;
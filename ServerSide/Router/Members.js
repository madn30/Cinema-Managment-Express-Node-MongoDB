const express = require('express');

const router = express.Router();

const MemberBL = require('../BL/MembersBL');

router.route('/')
    .get(async function(req,resp)
    {
        let pers = await MemberBL.getAllMembers()
        return resp.json(pers);
    })

router.route('/:id')
    .get(async function(req,resp)
    {
        let per = await MemberBL.getMember(req.params.id)
        return resp.json(per);
    })

router.route('')
    .post(async function(req,resp)
    {
        let obj = req.body;

        let status = await MemberBL.addMember(obj)
        return resp.json(status);
    })

router.route('/:id')
    .put(async function(req,resp)
    {
        let obj = req.body;
        let id = req.params.id;
        
        let status = await MemberBL.updateMember(id,obj)
        return resp.json(status);
    })

router.route('/:id')
    .delete(async function(req,resp)
    {
        let id = req.params.id;

        let status = await MemberBL.deleteMember(id)
        return resp.json(status);
    })






    module.exports = router;
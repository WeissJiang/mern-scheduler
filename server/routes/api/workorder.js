const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const WorkOrder = require('../../models/workorder');
const Project = require('../../models/project');

router.get('/', auth.verifyJWT, async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const workOrdersDoc = await WorkOrder.find()
                                .sort('startDate')
                                .limit(limit * 1)
                                .skip((page - 1) * limit)
                                .exec();

        const count = await WorkOrder.countDocuments(); 

        res.status(200).json({
            workorders: workOrdersDoc,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
            count
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get('/:id', auth.verifyJWT, async (req, res) => {
    try {
        const id = req.params.id;
        const workOrderDoc = await WorkOrder.findOne({ _id: id});

        if (!workOrderDoc) {
            res.status(404).json({
                message: `Cannot find work order with the id: ${id}.`
            });
        }

        res.status(200).json({
            workorder: workOrderDoc
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/add', auth.verifyJWT, async (req, res) => {
    try {
        const { name, startDate, endDate, workingDays, project } = req.body;

        if(!name || !startDate || !endDate || !workingDays){
            res.status(400).json({
                message: `Name, startDate, endDate, workingDays are required.`,
            });
        }

        const projectDoc = await Project.findOne({ _id: project});

        if (!projectDoc) {
            res.status(404).json({
                message: `Cannot find project with the id: ${project}.`
            });
        }

        const added = new WorkOrder({
            name,
            startDate,
            endDate,
            workingDays,
            project
        })

        await added.save();

        res.status(200).json({
            success: true,
            message: "Your work order has been added successfully!",
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

router.patch('/:id', auth.verifyJWT, async (req, res) => {
    try {
        const id = req.params.id;
        
        const workOrderDoc = await WorkOrder.findOne({ _id: id});

        if(!workOrderDoc){
            res.status(404).json({
                message: `Cannot find work order with the id: ${id}.`,
            });
        }
    
        req.body.updated = Date.now();
        await WorkOrder.updateOne({ _id: id }, req.body, {
            insert: true
        }); 

        res.status(200).json({
            success: true,
            message: "Your work order has been updated successfully!",
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete('/:id', auth.verifyJWT, async (req, res) => {
    try {
        const id = req.params.id;

        await WorkOrder.deleteOne({ _id: id});

        res.status(200).json({
            success: true,
            message: "Your work order has been deleted successfully!",
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;
const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Project = require('../../models/project');

router.get('/', auth.verifyJWT, async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const projectsDoc = await Project.find()
                                .sort('name')
                                .limit(limit * 1)
                                .skip((page - 1) * limit)
                                .exec();

        const count = await Project.countDocuments(); 

        res.status(200).json({
            projects: projectsDoc,
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
        const projectDoc = await Project.findOne({ _id: id});

        if (!projectDoc) {
            res.status(404).json({
                message: `Cannot find project with the id: ${id}.`
            });
        }

        res.status(200).json({
            project: projectDoc
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/add', auth.verifyJWT, async (req, res) => {
    try {
        const { name } = req.body;

        const existingProject = await Project.findOne({ name });

        if (existingProject) {
            return res
              .status(400)
              .json({ error: 'That project name is already in use.' });
        }

        const project = new Project({
            name
        })

        await project.save();

        res.status(200).json({
            success: true,
            message: "Your project has been added successfully!",
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

router.patch('/:id', auth.verifyJWT, async (req, res) => {
    try {
        const id = req.params.id;

        const projectDoc = await Project.findOne({ _id: id});
        
        if(!projectDoc){
            res.status(404).json({
                message: `Cannot find project with the id: ${id}.`,
            });
        }
        
        req.body.updated = Date.now();
        await Project.updateOne({ _id: id }, req.body, {
            insert: true
        }); 

        res.status(200).json({
            success: true,
            message: "Your project has been updated successfully!",
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete('/:id', auth.verifyJWT, async (req, res) => {
    try {
        const id = req.params.id;

        // const findedJobs = await Job.find({ project: projectDoc.id});
        await Project.deleteOne({ _id: id});

        res.status(200).json({
            success: true,
            message: "Your project has been deleted successfully!",
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;
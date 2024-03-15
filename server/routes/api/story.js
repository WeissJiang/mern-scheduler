const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Story = require('../../models/story');

router.get('/', auth.verifyJWT, async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const storiesDoc = await Story.find()
                                .sort('order')
                                .limit(limit * 1)
                                .skip((page - 1) * limit)
                                .exec();

        const count = await Story.countDocuments(); 

        res.status(200).json({
            data: storiesDoc,
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
        const storyDoc = await Story.findOne({ _id: id});

        if (!storyDoc) {
            res.status(404).json({
                message: `Cannot find story with the id: ${id}.`
            });
        }

        res.status(200).json({
            data: storyDoc
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/add', auth.verifyJWT, async (req, res) => {
    try {
        const { name, color } = req.body;

        const existingStory = await Story.findOne({ name });

        if (existingStory) {
            return res
              .status(400)
              .json({ error: 'That story name is already in use.' });
        }

        const count = await Story.countDocuments(); 
        const order = count + 1;
        
        const added = new Story({
            name,
            color,
            order
        })

        const newDoc = await added.save();

        res.status(200).json({
            data: newDoc,
            success: true,
            message: "Your story has been added successfully!",
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

router.patch('/:id', auth.verifyJWT, async (req, res) => {
    try {
        const id = req.params.id;

        const storyDoc = await Story.findOne({ _id: id});
        
        if(!storyDoc){
            res.status(404).json({
                message: `Cannot find story with the id: ${id}.`,
            });
        }
        
        req.body.updated = Date.now();
        await Story.updateOne({ _id: id }, req.body, {
            insert: true
        }); 

        const updatedDoc = await Story.findOne({ _id: id});

        if (!updatedDoc) {
            res.status(404).json({
                message: `Cannot find story with the id: ${id}.`
            });
        }

        res.status(200).json({
            data: updatedDoc,
            success: true,
            message: "Your story has been updated successfully!",
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

// router.patch('/reorder/:id', auth.verifyJWT, async (req, res) => {
//     try {
//         const { order} = req.body;
//         const id = req.params.id;
//         const storyDoc = await Story.findOne({ _id: id});

//         if(!storyDoc){
//             res.status(404).json({
//                 message: `Cannot find story with the id: ${id}.`,
//             });
//         }

//         const currentOrder = storyDoc.order;

//         if (currentOrder != order) {
//             storyDoc.order = order;
//             const storiesDocAfter = await Story.findOne({ order: id});
//         }
//     } catch (error) {
//         res.status(400).send(error);
//     }
// })

router.delete('/:id', auth.verifyJWT, async (req, res) => {
    try {
        const id = req.params.id;

        await Story.deleteOne({ _id: id});

        res.status(200).json({
            success: true,
            message: "Your story has been deleted successfully!",
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;
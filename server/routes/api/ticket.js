const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Ticket = require('../../models/ticket');
const WorkOrder = require('../../models/workorder');
const Project = require('../../models/project');
const User = require('../../models/user');

/**
 * ticket crud
 */
router.get('/', auth.verifyJWT, async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const ticketsDoc = await Ticket.Ticket.find()
                                .sort('-created')
                                .limit(limit * 1)
                                .skip((page - 1) * limit)
                                .exec();

        const count = await Ticket.Ticket.countDocuments(); 

        res.status(200).json({
            data: ticketsDoc,
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
        const ticketDoc = await Ticket.Ticket.findOne({ _id: id})
                                                .populate('comments');

        if (!ticketDoc) {
            res.status(404).json({
                message: `Cannot find ticket with the id: ${id}.`
            });
        }

        res.status(200).json({
            data: ticketDoc
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/add', auth.verifyJWT, async (req, res) => {
    try {
        const {
            title, 
            description,
            assignee,
            supervisor,
            story,
            estimate,
            dueDate,
            project, 
            workOrder
        } = req.body;

        if(!title ){
            res.status(400).json({
                message: `Title is required.`,
            });
        }

        const existingAssignee = await User.findOne({ _id: assignee});
        const existingSupervisor = await User.findOne({ _id: supervisor});

        if (!existingAssignee) {
            res.status(404).json({
                message: `Cannot find user with the id: ${assignee}.`
            });
        }

        if (!existingSupervisor) {
            res.status(404).json({
                message: `Cannot find user with the id: ${supervisor}.`
            });
        }

        if (project) {
            const existingProject = await Project.findOne({ _id: project});

            if (!existingProject) {
                res.status(404).json({
                    message: `Cannot find project with the id: ${project}.`
                });
            }
        }

        if (workOrder) {
            const existingWO = await WorkOrder.findOne({ _id: workOrder});

            if (!existingWO) {
                res.status(404).json({
                    message: `Cannot find work order with the id: ${workOrder}.`
                });
            }
        }

        const added = new Ticket.Ticket({
            title, 
            description,
            assignee,
            supervisor,
            estimate,
            dueDate,
            project, 
            workOrder,
            story
        })

        const newDoc = await added.save();

        res.status(200).json({
            data: newDoc,
            success: true,
            message: "Your ticket has been added successfully!",
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

router.patch('/:id', auth.verifyJWT, async (req, res) => {
    try {
        const id = req.params.id;
        
        const ticketDoc = await Ticket.Ticket.findOne({ _id: id});

        if(!ticketDoc){
            res.status(404).json({
                message: `Cannot find ticket with the id: ${id}.`,
            });
        }

        const {
            assignee,
            supervisor,
            project, 
            workOrder
        } = req.body;

        if (assignee) {
            const existingAssignee = await User.findOne({ _id: assignee});
            if (!existingAssignee) {
                res.status(404).json({
                    message: `Cannot find user with the id: ${assignee}.`
                });
            }
        }

        if (supervisor) {
            const existingSupervisor = await User.findOne({ _id: supervisor});
            if (!existingSupervisor) {
                res.status(404).json({
                    message: `Cannot find user with the id: ${supervisor}.`
                });
            }
        }

        if (project) {
            const existingProject = await Project.findOne({ _id: project});

            if (!existingProject) {
                res.status(404).json({
                    message: `Cannot find project with the id: ${project}.`
                });
            }
        }

        if (workOrder) {
            const existingWO = await WorkOrder.findOne({ _id: workOrder});

            if (!existingWO) {
                res.status(404).json({
                    message: `Cannot find work order with the id: ${workOrder}.`
                });
            }
        }
    
        req.body.updated = Date.now();

        await Ticket.Ticket.updateOne({ _id: id }, req.body, {
            insert: true
        }); 

        const updatedDoc = await Ticket.Ticket.findOne({ _id: id});

        if (!updatedDoc) {
            res.status(404).json({
                message: `Cannot find ticket with the id: ${id}.`
            });
        }

        res.status(200).json({
            data: updatedDoc,
            success: true,
            message: "Your ticket has been updated successfully!",
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete('/:id', auth.verifyJWT, async (req, res) => {
    try {
        const id = req.params.id;

        await Ticket.Ticket.deleteOne({ _id: id});

        res.status(200).json({
            success: true,
            message: "Your ticket has been deleted successfully!",
        });
    } catch (error) {
        res.status(400).send(error);
    }
})


/**
 * ticket comment crud
 */
router.post('/comment/add', auth.verifyJWT, async (req, res) => {
    try {
        const { ticket, content, author } = req.body;

        if (!ticket || !content || !author) {
            res.status(400).json({
                message: `ticket, content, and author are required.`,
            });
        }

        const existingTicket = await Ticket.Ticket.findOne({ _id: ticket });
        if (!existingTicket) {
            res.status(404).json({
                message: `Cannot find ticket with the id: ${ticket}.`
            });
        }

        const existingAuthor = await User.findOne({ _id: author });
        if (!existingAuthor) {
            res.status(404).json({
                message: `Cannot find user with the id: ${author}.`
            });
        }

        existingTicket.comments.push(req.body);
        await existingTicket.save();

        res.status(200).json({
            success: true,
            message: "Your ticket comment has been added successfully!",
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

router.patch('/:id/comment/:commentId', auth.verifyJWT, async (req, res) => {
    try {
        const ticketId = req.params.id;
        const commentId = req.params.commentId;

        const { content } = req.body;

        const existingTicket = await Ticket.Ticket.findOne({ _id: ticketId });
        if (!existingTicket) {
            res.status(404).json({
                message: `Cannot find ticket with the id: ${ticketId}.`
            });
        }

        const comment = existingTicket.comments.id(commentId);
        comment.content = content;
        comment.updated = Date.now();
        await existingTicket.save();

        res.status(200).json({
            success: true,
            message: "Your ticket comment has been updated successfully!",
        });

    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete('/:id/comment/:commentId', auth.verifyJWT, async (req, res) => {
    try {
        const ticketId = req.params.id;
        const commentId = req.params.commentId;
        
        const existingTicket = await Ticket.Ticket.findOne({ _id: ticketId });
        if (!existingTicket) {
            res.status(404).json({
                message: `Cannot find ticket with the id: ${ticketId}.`
            });
        }

        existingTicket.comments = existingTicket.comments.filter(comment => comment._id.toString() !== commentId);
        await existingTicket.save();

        res.status(200).json({
            success: true,
            message: "Your ticket comment has been deleted successfully!",
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

/**
 * ticket hours crud
 */
router.get('/hours/getAll', auth.verifyJWT, async (req, res) => {
    try {
        const { starttime, endtime } = req.query;

        if (!starttime || !endtime) {
            return res.status(400).json({ error: 'Start time and end time are required.' });
        }

        const startDate = new Date(parseInt(starttime));
        const endDate = new Date(parseInt(endtime));

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({ error: 'Invalid start time or end time.' });
        }

        const tickets = await Ticket.Ticket.aggregate([
            { $unwind: '$hours' }, // 展开 hours 数组
            { $match: { 'hours.loggedDate': { $gte: startDate, $lte: endDate } } }, 
            {
                $group: {
                    _id: '$_id', // 根据 Ticket 文档的 ID 分组
                    title: { $first: '$title' }, // 保留 Ticket 文档的其他字段（如果需要）
                    hours: { $push: '$hours' } // 将所有符合条件的 hours 放入一个数组
                }
            }
        ]);

        const ticketHoursDoc = tickets.flatMap(ticket => 
            ticket.hours.filter(hour => 
                hour.loggedDate >= startDate && hour.loggedDate <= endDate
            )
        );

        res.status(200).json({
            data: ticketHoursDoc,
            count: ticketHoursDoc.length
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/hour/add', auth.verifyJWT, async (req, res) => {
    try {
        const { ticket, time, user } = req.body;

        if (!ticket || !time || !user) {
            res.status(400).json({
                message: `ticket, time, and user are required.`,
            });
        }

        const existingTicket = await Ticket.Ticket.findOne({ _id: ticket });
        if (!existingTicket) {
            res.status(404).json({
                message: `Cannot find ticket with the id: ${ticket}.`
            });
        }

        const existingUser = await User.findOne({ _id: user });
        if (!existingUser) {
            res.status(404).json({
                message: `Cannot find user with the id: ${user}.`
            });
        }

        existingTicket.hours.push(req.body);
        await existingTicket.save();

        res.status(200).json({
            data: existingTicket,
            success: true,
            message: "Your ticket hour has been added successfully!",
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

router.patch('/:id/hour/:hourId', auth.verifyJWT, async (req, res) => {
    try {
        const ticketId = req.params.id;
        const hourId = req.params.hourId;

        const { time, note, loggedDate } = req.body;

        const existingTicket = await Ticket.Ticket.findOne({ _id: ticketId });
        if (!existingTicket) {
            res.status(404).json({
                message: `Cannot find ticket with the id: ${ticketId}.`
            });
        }

        const hour = existingTicket.hours.id(hourId);
        hour.time = time;
        hour.note = note;
        hour.loggedDate = loggedDate;
        hour.updated = Date.now();
        await existingTicket.save();

        res.status(200).json({
            success: true,
            message: "Your ticket hour has been updated successfully!",
        });

    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete('/:id/hour/:hourId', auth.verifyJWT, async (req, res) => {
    try {
        const ticketId = req.params.id;
        const hourId = req.params.hourId;
        
        const existingTicket = await Ticket.Ticket.findOne({ _id: ticketId });
        if (!existingTicket) {
            res.status(404).json({
                message: `Cannot find ticket with the id: ${ticketId}.`
            });
        }

        existingTicket.hours = existingTicket.hours.filter(hour => hour._id.toString() !== hourId);
        await existingTicket.save();

        res.status(200).json({
            success: true,
            message: "Your ticket hour has been deleted successfully!",
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;
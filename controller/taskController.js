const Task = require('../entity/Task');

exports.createTask=async (req, res) => {
    try{
        const {title} = req.body;
        if (typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({error: 'Title is required and must be a non-empty string'});
        }
        const task = await Task.create({title: title.trim()});
        res.status(201).json(task);
    }catch (error){
        res.status(500).json({error: error.message});
    }
}
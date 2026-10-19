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
};
 exports.getAllTasks=async (req, res) => {
    try{
        const tasks = await Task.findAll({
            order: [['id', 'DESC']]
        });
        res.status(200).json(tasks);
    }catch (error){
        res.status(500).json({error: error.message});
    }
 };
 exports.getTaskById=async (req, res) => {
    try{
        const {id} = req.params;
        const task = await Task.findByPk(id);
        if(!task){
            return res.status(404).json({error: 'Task not found'});
        }
        res.status(200).json(task);
    }catch (error){
        res.status(500).json({error: error.message});
    }
 };
 exports.updateTask=async (req, res) => {
     try{
         const{title, completed} = req.body;
         const updates = {};
         if(title !== undefined){
             if(typeof title !== 'string' || title.trim() === ''){
                 return res.status(400).json({error: 'Title must be a non-empty string'});
             }
             updates.title = title.trim();
         }
            if(completed !== undefined){
                if(typeof completed !== 'boolean'){
                    return res.status(400).json({error: 'Completed must be a boolean'});
                }
                updates.completed = completed;
            }
            if(Object.keys(updates).length === 0){
                return res.status(400).json({error: 'No valid fields to update'});
            }
            const task=await Task.findByPk(req.params.id);
            if(!task){
                return res.status(404).json({error: 'Task not found'});
            }
            await task.update(updates);
            res.status(200).json(task);
     }catch (error){
            res.status(500).json({error: error.message});
     }
 };
 exports. deleteTask=async (req, res) => {
    try{
        const task = await Task.findByPk(req.params.id);
        if(!task){
            return res.status(404).json({error: 'Task not found'});
        }
        await task.destroy();
        res.status(200).json({message: 'Task deleted successfully'});
    }catch (error){
        res.status(500).json({error: error.message});
    }
 };
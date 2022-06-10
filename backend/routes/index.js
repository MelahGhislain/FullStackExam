const router = require('express').Router()
const Student = require('../models/student.model')


module.exports = () =>{
    router.post('/students', async(req, res)=>{
        try{
            const isStudent = await Student.findOne({name: req.body.name})
            if(isStudent) throw new Error("Matricule already exist")
            // const isName = await Student.findOne({name: req.body.matricule})
            // // console.log(isStudent)
            // if(isName) throw new Error("Student already exist")
            const student = await Student.create(req.body)
            if(student) res.status(201).json({status: "success", data: student})
        }catch(err){
            res.status(500).send({status: "error", msg: "Matricule already exist", err})
        }
    })
    router.get('/students', async(req, res)=>{
        try{
            const students = await Student.find({}).sort("-createdAt")
            if(students) res.status(200).json({status: "success", data: students})
        }catch(err){
            res.status(500).send({status: "error", msg: "Could not get students", err})
        }
    })
    router.put('/students/:id', async(req, res)=>{
        try{
            // console.log(req.body)
            const students = await Student.findOneAndUpdate({_id: req.params.id}, {$set:{...req.body}}, {new: true})
            if(students) res.status(200).json({status: "success", data: students})
        }catch(err){
            res.status(500).send({status: "error", msg: "Could not update students", err})
        }
    })
   
    router.delete('/students/:id', async(req, res)=>{
        try{
            const student = await Student.findByIdAndRemove(req.params.id)
            if(student) res.status(200).json({status: "success", data: student})
        }catch(err){
            res.status(500).send({status: "error", msg: "Could not delete student", err})
        }
    })
    router.get('/students/delete', async(req, res)=>{
        try{
            const students = await Student.find({})
            
            students.map( async (student) =>{
                // console.log(student._id)
                await Student.findByIdAndRemove(student._id)
            })
           
            res.status(200).json({status: "success", msg: "students deleted successfully"})
        }catch(err){
            res.status(500).send({status: "error", msg: "Could not delete students", err})
        }
    })

    return router
}
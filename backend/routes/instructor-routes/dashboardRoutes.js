const express=require('express')
const { getDashboardStats } = require('../../controllers/instructor/dashboardController')

const router=express.Router()

router.get('/student-course',getDashboardStats)

module.exports=router
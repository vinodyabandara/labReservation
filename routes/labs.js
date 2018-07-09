const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Lab = require('../models/lab');
const passport = require('passport');
const jwt = require('jsonwebtoken');

//Add Lab
router.post('/add', (req,res,next) => {
    let newLab = new Lab({
        username: req.body.username,
        lab: req.body.lab,
        date: req.body.date,
        tslot: req.body.tslot, 
        subject: req.body.subject
        //_id:req.body.id
        
    });

    Lab.getResbyDateLab(newLab.date, newLab.lab, function(err,lab){     //if available pass to array lab
        if(err){
            res.json({success:false, msg:'failed to load the lab'});
        }else{

            //isEmpty function for array lab
            function isEmpty(lab){
                for (let y of lab){
                    if((y.date != newLab.date) || (y.lab != newLab.lab)){
                        return true;
                    }
                    return false;
                }
            }
            //no similar reservation
            if(isEmpty(lab)){
                Lab.addLab(newLab, function (err,lab){
                    if(err){
                        res.json({success: false, msg:'Failed to reserve lab'});
                    } else{
                        res.json({success: true, msg:'Lab Reserved'});
                    }
                });
            }
            else{
                //check overlap
                function overlapReservation(lab){
                    for(let x of lab){
                        if((x.tslot == newLab.tslot)){
                            return false;
                        }
                    }
                
                return true;        
            }
            
            //when not overlapped
            if(overlapReservation(lab)){
                Lab.addLab(newLab, function (err,lab){
                    if(err){
                        res.json({success: false, msg:'Failed to reserve lab'});
                    } else{
                        res.json({success: true, msg:'Lab Reserved'});
                    }
                }); 
            } else {
                res.json({success: false, msg:'Time overlap'});
                }
            }
        }
    });
});

router.get('/addReserve/:username', function(req,res,next){
    const username = req.params.username;
    Lab.getLabByUsername(username, function(err,labs){
        if(err){
            res.json({success:false, msg:"Fail to load"});
        }
        else{
            console.log(labs);
            res.json({success:true, labs:labs});
        }
    });
});

//view
router.get('/view', function(req,res,next) {
    Lab.getLabs({},function(err, labs){
        if(err){
            throw err;
        } else {
            res.json({labs});
        }
    })
   
});

//ondelete
router.get('/delete/:id', function(req,res,next) {
    Lab.findByIdAndRemove({_id: req.params.id},function(err, labs){
        if(err){
            throw err;
            res.json({err});
        } else {
            res.json({labs});
        }
    })
   
});

//get Reservation
router.get('/getReservation/:id',function(req,res,next){
    Lab.getLabById({_id:req.params.id},function(err,labs){
        if(err){
            res.json({success:false,msg:'Failed to load the lab'});
        } else {
            //console.log(labs); // testing
            res.json({success:true, labs:labs});
        }
    });
});

//edit reservation
router.post('/update/:id',function(req,res,next){
    
    let newLab = new Lab({
        //creating an instance using model
        username: req.body.username,
        lab: req.body.lab,
        subject: req.body.subject,
        date: req.body.date,
        tslot: req.body.tslot,
        _id: req.params.id
    });

    // Lab.editReservation(newLabReservation._id,newLabReservation,function(err,labs){
    //     if(err){
    //         return res.json({success:false,msd:"Edit reservation failed"});
    //     }
    //     else{
    //         res.json({success:true, msg:"Edit reservation successfully"});
    //     }
    // });

    Lab.getResbyDateLab(newLab.date, newLab.lab, function(err,lab){
        if(err){
            res.json({success:false, msg:'failed to load the lab'});
        }else{
            function isEmpty(lab){
                for (let y of lab){
                    if((y.date != newLab.date) || (y.lab != newLab.lab)){
                        return true;
                    }
                    return false;
                }
            }
            if(isEmpty(lab)){
                 Lab.editReservation(newLab._id, newLab, function(err,labs){
                        if(err){
                            return res.json({success:false,msd:"Edit reservation failed"});
                        }
                        else{
                            res.json({success:true, msg:"Edit reservation successfully"});
                        }
                    });
            }
            else{
                function overlapReservation(lab){
                    for(let x of lab){
                        if((x.tslot == newLab.tslot)){
                            return false;
                        }
                    }
                
                return true;
            }

            if(overlapReservation(lab)){
                Lab.editReservation(newLab._id, newLab, function(err,labs){
                    if(err){
                        return res.json({success:false,msd:"Edit reservation failed"});
                    }
                    else{
                        res.json({success:true, msg:"Edit reservation successfully"});
                    }
                }); 
            } else {
                res.json({success: false, msg:'Time overlap'});
                }
            }
        }
    });
});

//search reservation
router.get('/search/:date',function(req,res,next){
    const date = req.params.date;
    console.log(date);
    Lab.getLabByDate(date,function(err,labs){
        if(err){
            res.json({success:false,msg:'Failed to load the labs'});
        } else {
           
            res.json({success:true, labs:labs});
        }
    });
});

module.exports = router;
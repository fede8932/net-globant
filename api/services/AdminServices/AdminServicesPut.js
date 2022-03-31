const {
    Client,
    Securities,
    BranchOficce,
    Provincies,
    WorkDay,
  } = require("../../models");

  class AdminServicesPut{
    static async serviceEditOffice(req, next) {
        try {
          const [rows, update] = await BranchOficce.update(req.body, {
            where: {
              id: req.params.id,
            },
            returning: true,
            plain: true,
          });
          return update;
        } catch (err) {
          next(err);
        }
      }
    
      static async serviceEditSecurity(req, next) {
        try {
          const [rows, security] = await Securities.update(req.body, {
            where: {
              id: req.params.id,
            },
            returning: true,
          });
          return security;
        } catch (err) {
          next(err);
        }
      }
    
      static async serviceEditClient(req, next) {
        try {
          console.log("req.body",req.body)
        
          const [rows, update] = await Client.update(req.body, {
            where: {
              id: req.params.id,
            },
            returning: true,
            plain: true,
          });

          console.log('update', update)
          return update;
        } catch (err) {
          next(err);
        }
      }
    
    
      static async serviceEditCalendarOffice(req, next){
        try{
          const [rows, newSchedule]= await WorkDay.update(req.body,{
            where:{id: req.body.id},
            returning:true
          })
        }catch(err){
          next(err)
        }
      }
    }


  

  module.exports= AdminServicesPut

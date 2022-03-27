const adminRouter = require("express").Router()
const AdminController= require("../controllers/AdminController")

adminRouter.get("/clients", AdminController.getAllClients)
adminRouter.get("/clients/:id", AdminController.getOneClient)
adminRouter.get("/securities", AdminController.getAllSecurities)
adminRouter.get("/securities/:id", AdminController.getOneSecurity)
adminRouter.get("/office",AdminController.getAllOffice)
adminRouter.get("/office/:id", AdminController.getOneOffice)

adminRouter.post("/add/office/security", AdminController.addSecurity)
adminRouter.post("/add/office", AdminController.addOffice)
adminRouter.post("/add/client",AdminController.addClient)

adminRouter.delete("/remove/security/:id", AdminController.removeSecurity)
adminRouter.delete("/remove/client/:id",AdminController.removeClient)
adminRouter.delete("/remove/office/:id",AdminController.removeOffice)

adminRouter.put("/edit/office/:id", AdminController.editOffice)
adminRouter.put("/edit/security/:id", AdminController.editSecurity)
adminRouter.put("/edit/client/:id",AdminController.editClient)













module.exports= adminRouter
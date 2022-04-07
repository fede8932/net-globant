const {
  Securities,
  WorkDay,
  BranchOficce,
  Client,
  Provincies,
} = require("../models");

class SecuritiesServices {
  static async serviceMyWorkDay(req, next) {
    try {
      const today = await WorkDay.findOne({
        where: {
          date: req.params.date,
        },
        include: {
          association: BranchOficce.calendar,
        },
      });
      const schedule = await Securities.findOne({
        where: { id: req.params.id },
        include: {
          association: Securities.calendar,
          where: {
            wishEntryHour: today.wishEntryHour,
          },
        },
      });

      const oficina = await BranchOficce.findOne({
        include: {
          association: BranchOficce.security,
          where: {
            id: schedule.id,
          },
        },
      });

      const oficinaSchedule = await BranchOficce.findOne({
        where: { id: oficina.id },
        include: {
          association: BranchOficce.security,
          where: {
            id: schedule.id,
          },
        },
      });

      console.log("OFICNA", oficina);

      const cliente = await Client.findOne({
        where: {
          id: oficina.clientId,
        },
      });

      const provincia = await Provincies.findOne({
        where: {
          id: oficina.provincyId,
        },
      });

      return {
        office: oficinaSchedule,
        calendario: schedule,
        cliente: cliente,
        provincia: provincia,
      };
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async serviceToWriteMyWorkDayEntry(req, next) {
    try {
      const date = req.params.date;
      const justDate = date.split(" ")[0]; //fecha
      const allWorkDays = await Securities.findOne({
        where: { id: req.params.id },
        include: {
          association: Securities.calendar,
        },
      });
     const todaySecurity= allWorkDays.workDays.filter((workaday)=> workaday.date === justDate)
      const [rows, workDay] = await WorkDay.update(
        { entryHour: req.params.date, serverHourEntry: new Date() },
        {
          where: { id: todaySecurity[0].dataValues.id},
          returning: true,
        }
      );
      console.log("fecha<--->>>>>>>>>>>>",req.params.date)
      return workDay;
    } catch (err) {
      next(err);
    }
  }
  
  static async serviceToWriteMyWorkDayClose(req, next) {
    try {
      const date = req.params.date;
      const justDate = date.split(" ")[0];
      const allWorkDays = await Securities.findOne({
        where: { id: req.params.id },
        include: {
          association: Securities.calendar,
        },
      });
     const todaySecurity= allWorkDays.workDays.filter((workaday)=> workaday.date === justDate)
     
      const [rows, workDay] = await WorkDay.update(
        { closingHour: req.params.date, serverHourClosing: new Date() },
        {
          where: { id: todaySecurity[0].dataValues.id},
          returning: true,
        }
      );
     
      return workDay;
    } catch (err) {
      next(err);
    }
  }

  static async serviceCancellWorkDay(req, next) {
    try {
      const [rows, workDay] = await WorkDay.update(
        (req.body,
        {
          where: { id: req.params.id },
        })
      );
      workDay.status = false;
      workDay.save();
      return workDay;
    } catch (err) {
      next(err);
    }
  }

  static async serviceChangeMyPassword(req, next) {
    try {
      await Securities.update(req.body, {
        where: { id: req.params.id },
      });
    } catch (err) {
      next(err);
    }
  }

  static async serviceSavePhoto(req, next) {
    try {
      const workDayUrl = WorkDay.update(
        { imageSecurity: req.body.image },
        {
          where: {
            id: req.body.id,
          },
        }
      );
      return workDayUrl;
    } catch (err) {
      next(err);
    }
  }
}

module.exports = SecuritiesServices;

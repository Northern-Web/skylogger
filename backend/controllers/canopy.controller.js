const { Canopy } = require('./../models/canopy.model');

exports.create = async (req, res, next) => {
    const data = req.body;

    try {
        var canopy = new Canopy({
            "model":        data.model,
            "manufacturer": data.manufacturer,
            "category":     data.category,
            "isActive":     true
        });

        await canopy.save();

        return res.status(201).json({
            "api": `${process.env.APP_NAME} v.${process.env.APP_VER}`,
            "code": 201,
            "status": "Success",
            "message": "Fallskjerm ble lagret på vellykket vis."
        });

    } catch (err) {
        return res.status(400).json({
            "api": `${process.env.APP_NAME} v.${process.env.APP_VER}`,
            "code": 400,
            "status": "Error",
            "message": "En feil oppstod under lagring av fallskjerm. Vennligst prøv igjen."
        });
    }
}

exports.delete = async (req, res, next) => {
    const id = req.params.id;

    try {
        const canopy = await Canopy.findById(id);
        await canopy.deleteOne();

        return res.status(200).json({
            "api": `${process.env.APP_NAME} v.${process.env.APP_VER}`,
            "code": 200,
            "status": "Success",
            "message": "Fallskjerm ble slettet på vellykket vis."
        });
    } catch (err) {
        return res.status(400).json({
            "api": `${process.env.APP_NAME} v.${process.env.APP_VER}`,
            "code": 400,
            "status": "Error",
            "message": "En feil oppstod under sletting av fallskjerm. Vennligst prøv igjen."
        });
    }
  };

exports.patch = async (req, res, next) => {
    const id   = req.params.id;
    const data = req.body;

    try {
        await Canopy.findByIdAndUpdate({ _id: id }, data);
        return res.status(200).json({
            "api": `${process.env.APP_NAME} v.${process.env.APP_VER}`,
            "code": 200,
            "status": "Success",
            "message": "Fallskjerm ble oppdatert på vellykket vis."
        });

    } catch (err) {
        return res.status(400).json({
            "api": `${process.env.APP_NAME} v.${process.env.APP_VER}`,
            "code": 400,
            "status": "Error",
            "message": "En feil oppstod under oppdatering av fallskjerm. Vennligst prøv igjen."
        });
    }
};

exports.find = async (req, res, next) => {
    var options = {};
    var query   = {};
  
    options.limit = parseInt(req.query.limit) || 50;
    options.skip  = parseInt(req.query.skip)  || 0;
    
    if (req.query.orderBy) {
      options.sort = req.query.orderBy;
    }
  
    if (req.query.order) {
      if (req.query.order == "desc") {
        options.sort = "-" + req.query.orderBy;
      }
    }
  
    if (req.query.model) {
      query["model"] = req.query.model;
    }
  
    if (req.query.manufacturer) {
      query["manufacturer"] = req.query.manufacturer;
    }

    if (req.query.category) {
        query["category"] = req.query.category;
    }

    if (req.query.isActive) {
        query["isActive"] = req.query.isActive;
    }

    try {
        const canopies = await Canopy.find(query).exec();

        return res.status(200).json({
            "api": `${process.env.APP_NAME} v.${process.env.APP_VER}`,
            "code": 200,
            "status": "Success",
            "filters": options,
            "records": canopies.length,
            "data": canopies
        });

    } catch (err) {
        return res.status(400).json({
            "api": `${process.env.APP_NAME} v.${process.env.APP_VER}`,
            "code": 400,
            "status": "Error",
            "message": "En feil oppstod under henting av fallskjerm(er). Vennligst prøv igjen."
        });
    }
  
  
};
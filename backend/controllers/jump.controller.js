const { Jump } = require('./../models/jump.model');


exports.create = async (req, res, next) => {
    const data = req.body;

    // Not yet finished - TODO:
    // [] Connect to actual front end inputs
    // [] Fetch and validate user data from Stytch session
    // []
    try {
        var jump = new Jump({
            "number": 0,
            "date": data.date,
            "aircraft": data.aircraft,
            "location": {
                "country": data.country,
                "country_code": data.country_code,
                "dropzone": data.dropzone
            },
            "stats": {
                "altitude": data.altitude,
                "freefalltime": data.freefalltime,
                "discipline": data.discipline,
                "isEmergencyProcedure": data.isEmergencyProcedure,
                "isTwin": data.isTwin,
                "isProgressionJump": data.isProgressionJump,
                "isProgressionJumpApproved": data.isProgressionJumpApproved,
                "packjob": data.packjob
            },
            "description": data.description,
            "attestant": {
                "name": data.attestantName,
                "license": data.attestantLicenceNum,
                "remark": data.attestantRemark
            },
            "owner": "XXX"
        });

        await jump.save();

        return res.status(201).json({
            "api": `${process.env.APP_NAME} v.${process.env.APP_VER}`,
            "code": 201,
            "status": "Success",
            "message": "Hopp ble lagret på vellykket vis."
        });

    } catch (err) {
        return res.status(400).json({
            "api": `${process.env.APP_NAME} v.${process.env.APP_VER}`,
            "code": 400,
            "status": "Error",
            "message": "En feil oppstod under lagring av hopp. Vennligst prøv igjen."
        });
    }


};

exports.delete = async (req, res, next) => {
    // Not yet implemented
};

exports.patch = async (req, res, next) => {
    // Not yet implemented
};

exports.find = async (req, res, next) => {
    // Not yet implemented
};
const { ReportPostCommentUser } = require('../db.js');

class ReportPCUClass {
    constructor(){}

    reportComment = async(req,res) => {
        const {typeReport} = req.body
        try {
            
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ReportPCUClass;
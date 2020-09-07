// getGeneral

const { response } = require("express");

const getGeneral = async(req, res = response) => {

    const query = req.params.searchs
    
    res.json({
        ok:true,
        msg: 'getGeneral',
        query
    })

}

module.exports = {
    getGeneral
}
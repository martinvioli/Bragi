const axios = require('axios');

class Search {
    constructor(){}
    searchSongById = async(req, res) => {
        const {id} = req.body
        console.log(id)
        try {
            if(id) {
                let arr = [];
                const song = await axios.get(`https://api.deezer.com/track/${id}`);
                arr.push(song.data)
                console.log(arr)
                return res.status(200).json(arr);
                // res.status(200).json(arr);
            } else res.status(404).send({msgE: 'No song ID Provided'})
        } catch(error){console.log(error)}
    }
}
module.exports = Search
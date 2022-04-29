const axios = require('axios');

class Search {
    constructor(){}

    searchSongById = async(req, res) => {
        const id = req.params.songId
        console.log(id)
        try {
            if(id) {
                const song = await axios.get(`https://api.deezer.com/track/${id}`);
                return res.status(200).json(song.data);
            } else res.status(404).send({msgE: 'No song ID Provided'})
        } catch(error){console.log(error)}
    }

    searchArtistByName = async(req,res) => {
        const name = req.params.name;
        try {
            if(name){
                const artist = await axios.get(`https://api.deezer.com/artist/${name}`)
                return res.status(200).json(artist.data)
            }else return res.status(404).json({ msgE: 'The artist was not found'})
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = Search
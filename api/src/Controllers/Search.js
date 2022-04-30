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

    searchSongByName = async(req, res) => {
        const songName = req.query.songName;
        try {
            if(songName){
                const song = await axios.get(`https://api.deezer.com/search/track?q=${songName}`)
                return res.status(200).json(song.data.data)
            } else return res.status(404).json({ msgE: 'Song name was not found'})
        } catch(error) {
            console.log(error)
        }
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

    searchGenreById = async(req, res) => {
        const genreId = req.params.genreId;
        try {
            if (genreId) {
                const genre = await axios.get(`https://api.deezer.com/genre/${genreId}`)
                return res.status(200).json(genre.data)
            } else return res.status(404).json({ msgE: 'Genre was not found'})
        } catch(error) {
            console.log(error)
        }
    }

    searchAlbumByName = async (req,res) => {
        const albumName = req.query.albumName
        try {
            if(albumName){
                const albums = await axios.get(`https://api.deezer.com/search/album?q=${albumName}`)
                // console.log(albums.data)
                return res.status(200).json(albums.data.data)
            } else return res.status(404).json({ msgE: 'Album not found'})
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = Search
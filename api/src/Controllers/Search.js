const axios = require('axios');
const { User } = require("../db.js");
const { Op } = require("sequelize");
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

    searchAlbumById = async(req,res) => {
        const id = req.params.albumId
        try {
            if(id){
                const song = await axios.get(`https://api.deezer.com/album/${id}`)
                return res.status(200).json(song.data);
            } else res.status(404).send({msgE: 'No album ID Provided'})
        } catch (error) {
            console.log(error)
        }
    }

    searchArtistById = async(req,res) => {
        const id = req.params.artistId
        try {
            if(id){
                const song = await axios.get(`https://api.deezer.com/artist/${id}`)
                return res.status(200).json(song.data);
            } else res.status(404).send({msgE: 'No artist ID Provided'})
        } catch (error) {
            console.log(error)
        }
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
        const artistName = req.query.artistName;
        try {
            if(artistName){
                const artist = await axios.get(`https://api.deezer.com/search/artist?q=${artistName}`)
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

    getTop10songs = async (req, res) => {
        try {
            const songs = await axios.get('https://api.deezer.com/chart')
            if(songs) {
                return res.status(200).json(songs.data.tracks.data)
            } else return res.status(404).json({ msgE: 'Songs not found'})
        } catch(error) {
            console.log(error)
        }
    }

    getTop10albums = async (req, res) => {
        try {
            const albums = await axios.get('https://api.deezer.com/chart')
            if(albums) {
                return res.status(200).json(albums.data.albums.data)
            } else return res.status(404).json({ msgE: 'Albums not found'})
        } catch(error) {
            console.log(error)
        }
    }

    getTop10artists = async (req, res) => {
        try {
            const artists = await axios.get('https://api.deezer.com/chart')
            if(artists) {
                return res.status(200).json(artists.data.artists.data)
            } else return res.status(404).json({ msgE: 'Artists not found'})
        } catch(error) {
            console.log(error)
        }
    }

    searchUser = async(req,res) =>{
        const nameUser = req.params.nameUser;
        try {
            if(nameUser){
                const searchNameInDb = await User.findAll({
                    where : {
                        [Op.or] : {
                            name: { [Op.iLike]: `%${nameUser}%` },
                            lastName: { [Op.iLike]: `%${nameUser}%` },
                            userName: { [Op.iLike]: `%${nameUser}%`}
                        }
                    },
                    attributes: ['userName']
                })
                searchNameInDb
                ? res.status(200).send(searchNameInDb)
                : res.status(404).json({ msgE: 'User not found' })
            }
            // return res.status(404).json({ msgE: 'Username not found' })
        } catch (error) {
            console.log(error)
            return res.status(404).json({ msgE: 'searchUser no se ejecuto' })
        }
    }
}
module.exports = Search
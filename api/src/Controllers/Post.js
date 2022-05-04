const { Post } = require('../db.js');

class PostClass {
    constructor(){}

    getAllPosts = async (req, res) => {
        try {
            const posts = await Post.findAll({
                atributes: [
                    'idPost',
                    'datePost',
                    'contentPost',
                    'linkContent',
                    'nameStatusPost',
                    'imagePost',
                    'UserIdUser'
                ]
            });
            return res.status(200).json(posts)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    getPost = async (req, res) => {
        const { idPost } = req.params;
        try {
            const post = await Post.findByPk(idPost);
            if (!post) return res.status(404).json({msgE: 'The post with that id doest not exist'});

            res.status(200).json(post)
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    createPost = async (req, res) => {
        const { contentPost, linkContent, nameStatusPost, imagePost, UserIdUser } = req.body;
        try {
            const newPost = await Post.create(
                {
                    UserIdUser,
                    contentPost,
                    linkContent,
                    nameStatusPost,
                    imagePost
                }
                );
            return res.status(200).json(newPost)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    };

    updatePost = async (req, res) => {
        const { idPost } = req.params;
        const id = req.body.idPost;
        const {datePost, nameStatusPost, createdAt, updatedAt, UserIdUser} = req.body;
        try { 
            if(id || datePost || nameStatusPost || createdAt || updatedAt || UserIdUser) return res.status(500).json({error: 'You cannot change this properties'});     
            const post = await Post.findByPk(idPost);
            if (!post) return res.status(404).json({msgE: 'The post with that id doest not exist'});

            
          post.set(req.body);
          await post.save();
          return res.status(200).json(post);
        } catch (error) {
          return res.status(500).json({ msgE: error.message });
        }
      }

      deletePost = async(req, res) => {
        const { idPost } = req.params;
        try {
          const post = await Post.findByPk(idPost);
          if (!post) return res.status(404).json({msgE: 'The post with that id doest not exist'});
          
          await post.destroy();

          return res.status(200).json({msg: 'Post deleted succesfully'});
        } catch (error) {
          return res.status(500).json({ msgE: error.message });
        }
      };

      
};

module.exports = PostClass;

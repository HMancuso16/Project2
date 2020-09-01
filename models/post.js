// sequelize post table
module.exports = function(sequelize, Datatypes){
    var Post = sequelize.define("Post", {
        name: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        },
        image: {
            // imgur
        },
        price: {
            type: Datatypes.INT,
            validate: {
                ammount: [1]
            }
        }
    });
    Post.associate = function(models) {
        Post.belongsTo(models.User, {
            // not sure
        })
    }
    return Post;
}
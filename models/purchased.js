// sequelize purchased table
module.exports = function(sequelize, Datatypes){
    var Purchased = sequelize.define("Purchased", {
        owned: {
            type: Datatypes.BOOLEAN,
            allowNull: false,
        }
    });
    Post.associate = function(models) {
        Post.belongsTo(models.User, {
            // not sure
        })
    }
    return Post;
}
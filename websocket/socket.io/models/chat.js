const Sequelize = require('sequelize');

module.exports = class Chat extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        message: {
          type: Sequelize.STRING(400),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: false,
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }
  static associate(db) {
    db.Chat.belongsTo(db.UserRoom);
  }
};

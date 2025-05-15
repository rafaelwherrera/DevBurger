import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        total: Sequelize.INTEGER,
        user_id: Sequelize.INTEGER,
        status: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'orders',
        timestamps: true,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Order;

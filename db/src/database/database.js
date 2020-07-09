import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
    'BattleClass',
    'postgres',
    'sql',
    {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 5,
            require: 30000,
            idle: 10000
        },
        logging: false
    }
)
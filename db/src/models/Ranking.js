import Sequelize from 'sequelize';

import { sequelize } from '../database/database';

const Ranking = sequelize.define('ranking', {
    player: {
        type: Sequelize.TEXT,
        primaryKey: true,
    },
    victories: {
        type: Sequelize.INTEGER,
    },
    defeats: {
        type: Sequelize.INTEGER,
    },
    rounds: {
        type: Sequelize.INTEGER,
    },
    win_rate: {
        type: Sequelize.DOUBLE,
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

export default Ranking;
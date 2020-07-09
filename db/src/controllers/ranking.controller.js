import Sequelize from 'sequelize';
import Ranking from '../models/Ranking';

export async function getRanking(req, res) {
    try {
        const ranking = await Ranking.findAll({order: Sequelize.literal('victories DESC, rounds ASC, defeats ASC, player ASC')});
        res.json({
        data: ranking
    });
    } catch (error) {
        console.log(error);
        
    }
}

export async function createRanking(req, res) {
    const { player, victories, rounds, defeats } = req.body;
    let win_rate = 0

    if (defeats > 0) {
        win_rate = ((victories / (victories + defeats)) * 100)
    }
    
    try {
        let newRanking = await Ranking.create({
            player,
            victories,
            rounds,
            defeats,
            win_rate
        }, {
            fields: ['player', 'victories', 'rounds', 'defeats', 'win_rate']
        });
        
        if (newRanking) {
            return res.json({
                message: 'Ranking created successfully',
                data: newRanking
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong.',
            data: {}
        });
    }
        
};

export async function getOneRanking(req, res) {
    const { player } = req.params;
    const ranking = await Ranking.findOne({
        where: {
            player
        }
    });
    res.json(ranking)
}

export async function deleteRanking(req, res) {
    const { player } = req.params
    const deleteRowCount = await Ranking.destroy({
        where: {
            player
        }
    });
    res.json({
        message: 'Ranking deleted successfully',
        count: deleteRowCount,
    });
}

export async function updateRanking(req,res) {
    const { player } = req.params;
    const { victories, rounds, defeats } = req.body;

    let win_rate = 0

    if (defeats > 0) {
        win_rate = ((victories / (victories + defeats)) * 100)
    }

    const ranking = await Ranking.findAll({
        attributes: ['player', 'victories', 'rounds', 'defeats', 'win_rate'],
        where: {
            player
        }
    });

    if (ranking.length > 0) {
        ranking.forEach(async ranking => {
            await ranking.update({
                player,
                victories,
                defeats,
                rounds,
                win_rate
            });
        })
    }

    return res.json({
        message: 'Ranking updated successfully',
        data: ranking
    })
}
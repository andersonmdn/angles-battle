import { Router } from 'express';
const router = Router();

import { createRanking, getRanking, getOneRanking, deleteRanking, updateRanking } from '../controllers/ranking.controller';

// api/rankings
router.post('/', createRanking);
router.get('/', getRanking);

// api/rankings/:rankingId
router.get('/:player', getOneRanking);
router.delete('/:player', deleteRanking);
router.put('/:player', updateRanking);

export default router;
        
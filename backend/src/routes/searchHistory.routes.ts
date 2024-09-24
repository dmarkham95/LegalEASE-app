import { Router } from 'express';
import { SearchHistoryController } from '../controllers/searchHistory.controller';

const router = Router();
const searchHistoryController = new SearchHistoryController();

router.post('/', searchHistoryController.createSearchHistory.bind(searchHistoryController));
router.get('/:id', searchHistoryController.getSearchHistoryById.bind(searchHistoryController));
router.get('/', searchHistoryController.getAllSearchHistories.bind(searchHistoryController));
router.put('/:id', searchHistoryController.updateSearchHistory.bind(searchHistoryController));
router.delete('/:id', searchHistoryController.deleteSearchHistory.bind(searchHistoryController));

export default router;

import { Router } from 'express';
import { WikipediaController } from '../controllers/wikipedia.controller';

const router = Router();
const wikipediaController = new WikipediaController();

router.get('/', wikipediaController.searchWiki.bind(wikipediaController));

export default router;

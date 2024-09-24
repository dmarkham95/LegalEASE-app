import { Request, Response } from 'express';
import { SearchHistoryService } from '../services/searchHistory.service';

const searchHistoryService = new SearchHistoryService();

export class SearchHistoryController {
  async createSearchHistory(req: Request, res: Response) {
    try {
      const searchHistory = await searchHistoryService.createSearchHistory(req.body);
      res.status(201).json(searchHistory);
    } catch (error) {
      res.status(500).json({ error: 'Error creating searchHistory' });
    }
  }

  async getSearchHistoryById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const searchHistory = await searchHistoryService.getSearchHistoryById(Number(id));
      if (!searchHistory) return res.status(404).json({ error: 'SearchHistory not found' });
      res.json(searchHistory);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching searchHistory' });
    }
  }

  async getAllSearchHistories(req: Request, res: Response) {
    const { query } = req.query;
    try {
      const searchHistories = await searchHistoryService.getAllSearchHistories({
        query: query as string,
      });
      res.json(searchHistories);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching searchHistories' });
    }
  }

  async updateSearchHistory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const updatedSearchHistory = await searchHistoryService.updateSearchHistory(Number(id), req.body);
      res.json(updatedSearchHistory);
    } catch (error) {
      res.status(500).json({ error: 'Error updating searchHistory' });
    }
  }

  async deleteSearchHistory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await searchHistoryService.deleteSearchHistory(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting searchHistory' });
    }
  }
}


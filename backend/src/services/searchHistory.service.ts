
import { Repository } from 'typeorm';
import { SearchHistory } from '../entities/searchHistory.entity';
import { AppDataSource } from '../config/typeorm.config';

export class SearchHistoryService {
  private searchHistoryRepository: Repository<SearchHistory>;

  constructor() {
    this.searchHistoryRepository = AppDataSource.getRepository(SearchHistory);
  }

  async createSearchHistory(data: { query: string; searchDate: Date }): Promise<SearchHistory> {
    const searchHistory = this.searchHistoryRepository.create(data);
    return await this.searchHistoryRepository.save(searchHistory);
  }

  async getSearchHistoryById(id: number): Promise<SearchHistory | null> {
    return await this.searchHistoryRepository.findOneBy({ id });
  }

  async getAllSearchHistories(filter?: { query?: string; }): Promise<{data: SearchHistory[], count: number}> {
    const where: any = {};

    if (filter?.query) {
      where.query = filter.query;
    }

    const [results, total] = await this.searchHistoryRepository.findAndCount({ where }); 
    return {
      data: results,
      count: total
    }
  }

  async updateSearchHistory(id: number, data: Partial<{ query: string; searchDate: string; }>): Promise<SearchHistory | null> {
    await this.searchHistoryRepository.update(id, data);
    return await this.searchHistoryRepository.findOneBy({ id });
  }

  async deleteSearchHistory(id: number): Promise<void> {
    await this.searchHistoryRepository.delete(id);
  }
}

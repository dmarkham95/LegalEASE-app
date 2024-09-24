import { Request, Response } from 'express';
import axios from 'axios';
import { WikiQuery } from '../interfaces/wikiQuery.interface';
import { WikiSearchResponse } from '../interfaces/wikiSearchResponse.interface';


export class WikipediaController {

    async searchWiki(req: Request, res: Response) {
        try {
            const baseUrl = "https://en.wikipedia.org/w/api.php"
            const { query, pageNum, pageSize } = req.query as unknown as WikiQuery

            if (!query) {
                return res.status(404).json({ error: 'query is a required field' });
            }

            const limit = pageSize || 10;
            const offset = ((pageNum || 1) - 1) * limit;

            const queryUrl = `${baseUrl}?action=query&format=json&list=search&srsearch=${query}&srlimit=${limit}&sroffset=${offset}`

            const searchRes = await axios.get(queryUrl);

            const s = searchRes.data as WikiSearchResponse;

            res.json({
                data: s.query.search,
                count: s.query.searchinfo.totalhits
            });
        } catch (error) {
            res.status(500).json({ error: 'Error fetching wiki data' });
        }
    }


}
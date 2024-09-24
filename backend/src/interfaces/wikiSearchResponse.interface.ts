export interface WikiSearchResponse {
  batchcomplete: boolean;
  continue: Continue;
  query: Query;
}

interface Continue {
  sroffset: number;
  continue: string;
}

interface Query {
  searchinfo: Searchinfo;
  search: Search[];
}

interface Search {
  ns: number;
  title: string;
  pageid: number;
  size: number;
  wordcount: number;
  snippet: string;
  timestamp: Date;
}

interface Searchinfo {
  totalhits: number;
}

import { useEffect, useState } from "react";
import GenericTable from "../components/GenericTable";
import { TextField, Typography, Paper } from "@mui/material";
import useDebounce from "../hooks/useDebounce";
import { apiGetWikipediaData } from "../services/WikipediaService";
import { Pagination } from "../types/Pagination";
import { apiCreateSearchHistory } from "../services/HistoryService";

interface WikiData {
  ns: number;
  title: string;
  pageid: number;
  size: number;
  wordcount: number;
  snippet: string;
  timestamp: Date;
}

type WikiDataPoints = WikiData[];

type GetWikisResponse = {
  data: WikiDataPoints;
  count: number;
};

type GetWikisRequest = {
  pageNum?: number;
  pageSize?: number;
  query?: string;
};

const WikipediaSearch = () => {
  const [wikiDataPoints, setWikiDataPoints] = useState<WikiData[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 0,
    rowsPerPage: 5,
    totalCount: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const fetchWikis = async (
    pageNum: number,
    pageSize: number,
    query: string
  ) => {
    try {
      if (query === "") {
        setWikiDataPoints([]);
        setPagination((prev) => ({
          ...prev,
          totalCount: 0,
        }));
      } else {
        const res = await apiGetWikipediaData<
          GetWikisResponse,
          GetWikisRequest
        >({
          query,
          pageNum: pageNum,
          pageSize,
        });
        setWikiDataPoints(res.data.data);
        setPagination((prev) => ({
          ...prev,
          totalCount: res.data.count,
        }));
      }
    } catch (error) {
      console.error("Error fetching wiki data points:", error);
    }
  };

  const saveNewSearchHistory = async (query: string) => {
    await apiCreateSearchHistory({ query, searchDate: new Date() });
  };

  useEffect(() => {
    fetchWikis(
      pagination.page + 1,
      pagination.rowsPerPage,
      debouncedSearchQuery
    );
  }, [pagination.page, pagination.rowsPerPage, debouncedSearchQuery]);

  useEffect(() => {
    if (debouncedSearchQuery) {
      saveNewSearchHistory(debouncedSearchQuery);
    }
  }, [pagination.page, pagination.rowsPerPage, debouncedSearchQuery]);

  const handleChangePage = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setPagination((prev) => ({
      ...prev,
      rowsPerPage: newRowsPerPage,
      page: 0,
    })); // Reset to the first page
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const columns: { id: keyof WikiData; label: string }[] = [
    { id: "title", label: "Title" },
    { id: "pageid", label: "Page id" },
    { id: "snippet", label: "Snippet" },
  ];

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography sx={{ marginBottom: 4 }} variant="h5">
        Wiki Data Points
      </Typography>
      <TextField
        label="Search Wiki Data Points"
        variant="outlined"
        fullWidth
        onChange={handleSearchChange}
        sx={{ marginBottom: 6 }}
      />
      <GenericTable
        data={wikiDataPoints}
        columns={columns}
        totalCount={pagination.totalCount}
        rowsPerPage={pagination.rowsPerPage}
        page={pagination.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        canEdit={false}
        canDelete={false}
      />
    </Paper>
  );
};

export default WikipediaSearch;

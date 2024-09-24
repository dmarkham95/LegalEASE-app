import { useEffect, useState } from "react";
import GenericTable from "../components/GenericTable";
import { TextField, Typography, Paper } from "@mui/material";
import useDebounce from "../hooks/useDebounce";
import { apiGetSearchHistories } from "../services/HistoryService";

interface SearchHistory {
  id: number;
  query: string;
  searchDate: string;
}

type SearchHistories = SearchHistory[];

type GetSearchHistoriesResponse = {
  data: SearchHistories;
  count: number;
};

type GetSearchHistoriesRequest = {
  pageNum?: number;
  pageSize?: number;
  query?: string;
};

interface Pagination {
  page: number;
  rowsPerPage: number;
  totalCount: number;
}

const SearchHistory = () => {
  const [searchHistories, setSearchHistories] = useState<SearchHistory[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 0,
    rowsPerPage: 5,
    totalCount: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const fetchSearchHistories = async (
    pageNum: number,
    pageSize: number,
    query: string
  ) => {
    try {
      const res = await apiGetSearchHistories<
        GetSearchHistoriesResponse,
        GetSearchHistoriesRequest
      >({
        query,
        pageNum,
        pageSize,
      });

      setSearchHistories(res.data.data);
      setPagination((prev) => ({
        ...prev,
        totalCount: res.data.count,
      }));
    } catch (error) {
      console.error("Error fetching searchHistories:", error);
    }
  };

  useEffect(() => {
    fetchSearchHistories(
      pagination.page + 1,
      pagination.rowsPerPage,
      debouncedSearchQuery
    );
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

  const columns: { id: keyof SearchHistory; label: string }[] = [
    { id: "query", label: "Search Query" },
    { id: "searchDate", label: "Search Date" },
  ];

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography sx={{ marginBottom: 4 }} variant="h5">
        Search History
      </Typography>
      <TextField
        label="Search History"
        variant="outlined"
        fullWidth
        onChange={handleSearchChange}
        sx={{ marginBottom: 6 }}
      />
      <GenericTable
        data={searchHistories}
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

export default SearchHistory;

import { useEffect, useState } from "react";
import GenericTable from "../components/GenericTable";
import { TextField, Typography, Paper } from "@mui/material";
import useDebounce from "../hooks/useDebounce";
import { apiCreateUser, apiDeleteUser, apiGetUsers, apiPutUser } from "../services/UserService";
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

type Users = User[];

type GetUsersResponse = {
  data: Users;
  count: number;
};

type GetUsersRequest = {
    pageNum?: number;
  pageSize?: number;
  query?: string;
};

interface Pagination {
  page: number;
  rowsPerPage: number;
  totalCount: number;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 0,
    rowsPerPage: 5,
    totalCount: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const fetchUsers = async (
    pageNum: number,
    pageSize: number,
    query: string
  ) => {
    try {
      const res = await apiGetUsers<GetUsersResponse, GetUsersRequest>({
        query,
        pageNum,
        pageSize,
      });
      setUsers(res.data.data);
      setPagination((prev) => ({
        ...prev,
        totalCount: res.data.count,
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(
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
    })); 
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSaveEditUser = async (updatedUser: User) => {
    try {
      await apiPutUser(updatedUser as unknown as Record<string, unknown>);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Error saving user:")
    }
  };

  const handleDeleteUser = async (deletedUser: User) => {
    try {
      await apiDeleteUser(deletedUser as unknown as Record<string, unknown>);
      setUsers((prevUsers) =>
        prevUsers.filter((user) =>
          user.id !== deletedUser.id
        )
      );
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user:")
    }
  };

  const handleCreateNewUser = async (newUser: User) => {
    try {
      const response = await apiCreateUser<User, Record<string, unknown>>(newUser as unknown as Record<string, unknown>);
      setUsers((prevUsers) => [response.data, ...prevUsers]);
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user:")
    }
  };

  const columns: { id: keyof User; label: string }[] = [
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "email", label: "Email" },
  ];

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography sx={{ marginBottom: 4 }} variant="h5">
        Users
      </Typography>
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        onChange={handleSearchChange}
        sx={{ marginBottom: 6 }}
      />
      <GenericTable<User>
        data={users}
        columns={columns}
        totalCount={pagination.totalCount}
        rowsPerPage={pagination.rowsPerPage}
        page={pagination.page}
        canEdit={true}
        canDelete={true}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onSaveEdit={handleSaveEditUser}
        onDelete={handleDeleteUser}
        onCreateNew={handleCreateNewUser}
      />
    </Paper>
  );
};

export default Users;

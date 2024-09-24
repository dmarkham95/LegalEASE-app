import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Box,
  IconButton,
  Tooltip,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import XIcon from "@mui/icons-material/X";
import { useState } from "react";

interface GenericTableProps<T> {
  data: T[];
  columns: { id: keyof T; label: string }[];
  totalCount: number;
  rowsPerPage: number;
  page: number;
  canEdit: boolean;
  canDelete: boolean;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
  onSaveEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onCreateNew?: (newRow: T) => void;
}

const GenericTable = <T,>({
  data,
  columns,
  totalCount,
  rowsPerPage,
  page,
  canEdit = false,
  canDelete = false,
  onPageChange,
  onRowsPerPageChange,
  onSaveEdit,
  onDelete,
  onCreateNew,
}: GenericTableProps<T>) => {
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const [editedRow, setEditedRow] = useState<T | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newRow, setNewRow] = useState<Partial<T>>({});

  const handleEditClick = (rowIndex: number, row: T) => {
    setEditingRowIndex(rowIndex);
    setEditedRow({ ...row });
  };

  const handleCancelEdit = () => {
    setEditingRowIndex(null);
    setEditedRow(null);
  };

  const handleSaveEdit = () => {
    if (onSaveEdit && editedRow !== null) {
      onSaveEdit(editedRow);
    }
    handleCancelEdit();
  };

  const handleInputChange = (columnId: keyof T, value: string | number) => {
    if (editedRow) {
      setEditedRow({ ...editedRow, [columnId]: value });
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log(event);
    onPageChange(newPage);
  };
  const handleCreateNewClick = () => {
    setIsCreatingNew(true);
  };

  const handleSaveNewRow = () => {
    if (onCreateNew && newRow) {
      onCreateNew(newRow as T);
      setNewRow({});
      setIsCreatingNew(false);
    }
  };

  const handleNewRowInputChange = (
    columnId: keyof T,
    value: string | number
  ) => {
    setNewRow({ ...newRow, [columnId]: value });
  };

  const handleCancelNewRow = () => {
    setIsCreatingNew(false);
    setNewRow({});
  };

  const ActionCell = (props: { rowIndex: number; row: T }) => {
    const { row, rowIndex } = props;
    if (editingRowIndex === rowIndex) {
      return (
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <IconButton onClick={handleSaveEdit}>
            <SaveIcon />
          </IconButton>
          <IconButton onClick={handleCancelEdit}>
            <XIcon />
          </IconButton>
        </Box>
      );
    }

    return (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        {onSaveEdit && (
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEditClick(rowIndex, row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
        {onDelete && (
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => onDelete(row)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    );
  };

  return (
    <Paper>
      {onCreateNew && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateNewClick}
          sx={{ marginBottom: 2 }}
        >
          Create New
        </Button>
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id as string}>{column.label}</TableCell>
              ))}
              {(canEdit || canDelete) && <TableCell>Actions</TableCell>}{" "}
            </TableRow>
          </TableHead>
          <TableBody>
            {isCreatingNew && (
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id as string}>
                    <TextField
                      value={(newRow && newRow[column.id]) || ""}
                      onChange={(e) =>
                        handleNewRowInputChange(column.id, e.target.value)
                      }
                    />
                  </TableCell>
                ))}
                <TableCell>
                  <Box sx={{ display: "flex", gap: "1rem" }}>
                    <IconButton onClick={handleSaveNewRow}>
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={handleCancelNewRow}>
                      <XIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            )}
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell key={column.id as string}>
                    {editingRowIndex === rowIndex ? (
                      <TextField
                        value={(editedRow && editedRow[column.id]) || ""}
                        onChange={(e) =>
                          handleInputChange(column.id, e.target.value)
                        }
                      />
                    ) : (
                      (row[column.id] as unknown as React.ReactNode)
                    )}
                  </TableCell>
                ))}
                {(canEdit || canDelete) && (
                  <TableCell>
                    <ActionCell row={row} rowIndex={rowIndex} />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={(event) =>
          onRowsPerPageChange(parseInt(event.target.value, 10))
        }
      />
    </Paper>
  );
};

export default GenericTable;

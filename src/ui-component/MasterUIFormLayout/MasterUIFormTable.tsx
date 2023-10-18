import {
    TableContainer, Table, TableHead,
    TableBody, TableRow, TableCell,
    IconButton, TextField, InputAdornment,
} from "@mui/material";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { FieldProps } from "../Form/FormTypes";
import { FC, useMemo } from "react";

type MasterUIFormTableProps = {
    fieldProps: FieldProps;
    showDeleteOnRow?: boolean;
}

const MasterUIFormTable: FC<MasterUIFormTableProps> = ({ fieldProps, showDeleteOnRow = false }) => {
    const { columns, data = [], search, filter } = fieldProps.tableFields;
    const options = useMemo<any>(() => {
        if (!filter) {
            return [];
        }
        return filter.options.map(ele => ({ id: ele.value, label: ele.label }));
    }, [])
    return (
        <div>
            <Grid container >
                <Grid item xs={filter ? 8 : 12}>
                    <TextField
                        id="input-with-icon-textfield"
                        fullWidth
                        placeholder={search.name}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />
                </Grid>
                {
                    filter ? (
                        <Grid item xs={4}>
                            <Autocomplete
                                size="small"
                                options={options}
                                defaultValue={options[0]}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                    ) : null
                }
            </Grid>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map(({ key, name, subText }) => {
                                return <TableText key={key} label={name} subText={subText} />;
                            })}
                            {showDeleteOnRow && <TableCell hidden={true}>Delete</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map(row =>
                            <TableRow key={`Row-${row[columns[0].key]}`}>
                                {columns.map((column) => {
                                    const { text, subText } = row[column.key]
                                    return (
                                        <TableText key={`${column.key}-${text}`} label={text} subText={subText} />
                                    );
                                })}
                                {showDeleteOnRow ? (
                                    <TableCell>
                                        <IconButton>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                ) : null}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
const TableText: FC<{ label: string, subText?: string }> = ({ label, subText }) => {
    return (
        <TableCell key={label}>
            {label}
            {subText ? <Typography variant="caption"><br />{subText}</Typography > : null}
        </TableCell>
    )
}
export default MasterUIFormTable;
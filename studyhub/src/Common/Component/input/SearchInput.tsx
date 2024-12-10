import React from 'react';
import { SerchInputContainer, SeachInputBox, IconButtonBox } from "./SearchInputStyle";
import SearchIcon from '@mui/icons-material/Search';

interface SearchInputProps {
    width: number | string;
    height: number | string;
    placeholder: string;
    inputWidth?: number | string;
    onClick ?: () => any;
    search?: string;
    setSearch?: (value:string)=>any;
}

const SearchInput: React.FC<SearchInputProps> = ({ width, height, placeholder, inputWidth, onClick, search, setSearch=function() {} }) => {
    return (
        <SerchInputContainer width={width} height={height}>
            <SeachInputBox type="text" placeholder={placeholder} width={inputWidth} value={search} onChange={(e) => {setSearch(e.target.value)}}>
            </SeachInputBox>
            <IconButtonBox type="button" aria-label="search">
                <div onClick={onClick}><SearchIcon /></div>
            </IconButtonBox>
        </SerchInputContainer>
    )
}

export default SearchInput;
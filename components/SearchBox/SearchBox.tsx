"use client";
import css from "./SearchBox.module.css";

// GET https://notehub-public.goit.study/api/notes?search=mysearchtext

interface SearchBoxProps {
  text: string;
  onSearch: (newSearchText: string) => void;
}

export default function SearchBox({ text, onSearch }: SearchBoxProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={text}
      onChange={handleSearch}
    />
  );
}

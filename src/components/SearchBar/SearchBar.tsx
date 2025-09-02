import { TextInput } from '@mantine/core';
import { Search } from 'lucide-react';
import type { CSSProperties, FC } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  style?: CSSProperties;
  className?: string;
}

export const SearchBar: FC<SearchBarProps> = ({ value, onChange, style, className }) => {
  return (
    <TextInput
      style={style}
      className={className}
      leftSection={<Search size={18}/>}
      defaultValue={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

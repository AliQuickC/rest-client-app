'use client';

import type { FormDataItem } from '../../Types/Types';

interface FormDataEditorProps {
  value: FormDataItem[];
  onChange: (val: FormDataItem[]) => void;
  readOnly?: boolean;
}

export default function FormDataEditor({
  value,
  onChange,
  readOnly = false,
}: FormDataEditorProps) {
  const handleKeyChange = (index: number, key: string) => {
    const newValue = [...value];
    newValue[index] = { ...newValue[index], key };
    onChange(newValue);
  };

  const handleValueChange = (index: number, val: string) => {
    const newValue = [...value];
    newValue[index].value = val;
    onChange(newValue);
  };

  const handleAddRow = () => {
    onChange([...value, { key: '', value: '' }]);
  };

  const handleRemoveRow = (index: number) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    onChange(newValue);
  };

  return (
    <div>
      {value.map((item, index) => (
        <div
          key={index}
          style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}
        >
          <input
            type="text"
            placeholder="Key"
            readOnly={readOnly}
            value={item.key}
            onChange={(e) => handleKeyChange(index, e.target.value)}
          />
          <input
            type="text"
            placeholder="Value"
            readOnly={readOnly}
            value={item.value}
            onChange={(e) => handleValueChange(index, e.target.value)}
          />
          <button onClick={() => handleRemoveRow(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddRow}>Add row</button>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import FormDataEditor from '../FormDataEditor/FormDataEditor';
import type { BodyValue, FormDataItem } from '../../Types/Types';

type BodyType = 'none' | 'raw' | 'form-data';

interface BodyEditorProps {
  value: BodyValue;
  onChange: (val: BodyValue) => void;
  readOnly?: boolean;
}

export default function BodyEditor({
  value,
  onChange,
  readOnly = false,
}: BodyEditorProps) {
  const [error, setError] = useState<string | null>(null);
  const [bodyType, setBodyType] = useState<BodyType>('none');
  const [rawValue, setRawValue] = useState('');
  const [formDataValue, setFormDataValue] = useState<FormDataItem[]>([]);

  useEffect(() => {
    if (typeof value === 'string') {
      setBodyType('raw');
      setRawValue(value);
    } else if (value instanceof FormData) {
      setBodyType('form-data');

      const arr: FormDataItem[] = [];
      value.forEach((val, key) => arr.push({ key, value: String(val) }));
      setFormDataValue(arr);
    } else {
      setBodyType('none');
    }
  }, [value]);

  useEffect(() => {
    if (bodyType === 'raw') {
      try {
        JSON.parse(rawValue);
        setError(null);
        onChange(rawValue);
      } catch {
        setError('Invalid JSON');
      }
    }
  }, [rawValue, bodyType, onChange]);

  useEffect(() => {
    if (bodyType === 'form-data') {
      const fd = new FormData();
      formDataValue.forEach((item) => {
        if (item.key) fd.append(item.key, item.value);
      });
      onChange(fd);
    }
  }, [formDataValue, bodyType, onChange]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <select
        value={bodyType}
        onChange={(e) => setBodyType(e.target.value as BodyType)}
      >
        <option value="none">None</option>
        <option value="raw">Raw(JSON)</option>
        <option value="form-data">Form Data</option>
      </select>

      {bodyType === 'raw' && (
        <textarea
          value={rawValue}
          onChange={(e) => setRawValue(e.target.value)}
          readOnly={readOnly}
          placeholder="Input JSON .."
          style={{
            width: '100%',
            minHeight: '200px',
            fontFamily: 'monospace',
            backgroundColor: readOnly ? '#f9f9f9' : 'white',
          }}
        />
      )}

      {bodyType === 'form-data' && (
        <FormDataEditor
          value={formDataValue}
          onChange={setFormDataValue}
          readOnly={readOnly}
        />
      )}

      {error && !readOnly && <span style={{ color: 'red' }}>{error}</span>}
    </div>
  );
}

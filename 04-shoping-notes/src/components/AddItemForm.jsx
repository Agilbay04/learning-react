import { useState } from 'react';

export default function AddItemForm({ onAddItem }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return; // Jangan tambahkan jika input kosong
    onAddItem(inputValue);
    setInputValue(''); // Reset input setelah ditambahkan
  };

  return (
    <form onSubmit={handleSubmit} className="add-item-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Contoh: Beras Lele 5kg"
      />
      <button type="submit" className="add-btn">Tambah</button>
    </form>
  );
}
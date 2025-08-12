import { useState, useEffect } from "react";
import ShoppingList from "./components/ShoppingList";
import AddItemForm from "./components/AddItemForm";
import ShoppingItemStatus from "./components/ShoppingItemStatus";

export default function App() {
  // State untuk menyimpan semua item, coba ambil dari localStorage dulu
  const [items, setItems] = useState(() => {
    try {
      const savedItems = localStorage.getItem("shoppingItems");
      if (!savedItems) return [];
      
      // Memastikan timestamp diubah kembali menjadi objek Date
      return JSON.parse(savedItems).map((item) => ({
        ...item,
        timestamp: new Date(item.timestamp),
      }));
    } catch (error) {
      console.error("Gagal memuat item dari localStorage", error);
      return [];
    }
  });

  // State untuk filter tanggal
  const [filterDate, setFilterDate] = useState("");

  // Simpan ke localStorage setiap kali 'items' berubah
  useEffect(() => {
    try {
      localStorage.setItem("shoppingItems", JSON.stringify(items));
    } catch (error) {
      console.error("Gagal menyimpan item ke localStorage", error);
    }
  }, [items]);

  // Fungsi untuk menambah item baru
  const handleAddItem = (text) => {
    const newItem = {
      id: Date.now(),
      text: text,
      timestamp: new Date(),
      checked: false, // Properti checked awal
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  // Fungsi untuk menghapus item
  const handleDeleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Fungsi untuk mengedit item (termasuk status checked)
  const handleEditItem = (id, newText, newChecked) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, text: newText, checked: newChecked } : item
      )
    );
  };

  // Logika untuk memfilter item berdasarkan tanggal yang dipilih
  const filteredItems = items
    .filter((item) => {
      if (!filterDate) return true; // Jika tidak ada filter, tampilkan semua
      const itemDate = item.timestamp.toISOString().split("T")[0];
      return itemDate === filterDate;
    })
    .sort((a, b) => b.timestamp - a.timestamp); // Urutkan dari yang terbaru

  return (
    <div className="app-container">
      <h1>📝 Catatan Belanja</h1>

      <AddItemForm onAddItem={handleAddItem} />

      <hr style={{ margin: "30px 0", border: "1px solid #eee" }} />

      <h2>Daftar Belanja Anda</h2>

      {/* Tampilan Home dengan Filter */}
      <div className="filter-container">
        <label htmlFor="date-filter">Filter Berdasarkan Tanggal:</label>
        <input
          type="date"
          id="date-filter"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        {filterDate && (
          <button
            onClick={() => setFilterDate("")}
            style={{ marginTop: "10px" }}
          >
            Reset Filter
          </button>
        )}
      </div>

      <ShoppingList
        items={filteredItems}
        onDelete={handleDeleteItem}
        onEdit={handleEditItem}
      />

      <ShoppingItemStatus items={filteredItems} />
    </div>
  );
}
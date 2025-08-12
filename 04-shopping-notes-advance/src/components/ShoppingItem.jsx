import { useState } from "react";
import { formattedTime, formattedDate } from "../utils/dateTimeFormat";

export default function ShoppingItem({ item, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.text);
  
  // State `isChecked` kini dikontrol langsung dari `item.checked` yang datang dari props
  const isChecked = item.checked || false;

  // Fungsi untuk menangani perubahan pada checkbox
  const handleCheckboxChange = () => {
    // Panggil onEdit dengan status checked yang baru
    onEdit(item.id, item.text, !isChecked);
  };

  // Fungsi untuk menangani simpan perubahan teks
  const handleSave = () => {
    onEdit(item.id, editText, isChecked); // Pertahankan status checked saat menyimpan
    setIsEditing(false);
  };
  
  const itemContainerStyle = {
    display: "flex",
    alignItems: "center",
    width: "100%",
  };

  const infoStyle = {
    flexGrow: 1,
    // Terapkan coretan jika item sudah dicentang
    textDecoration: isChecked ? "line-through" : "none",
    color: isChecked ? "#888" : "inherit",
  };
  
  const checkboxStyle = {
    marginRight: "15px",
    cursor: "pointer",
    // Perbesar ukuran checkbox
    transform: "scale(1.2)",
  };

  return (
    <li className="shopping-item">
      {isEditing ? (
        // Mode Edit
        <div style={itemContainerStyle}>
          <input
            type="text"
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus // Langsung fokus ke input saat mode edit aktif
          />
          <button onClick={handleSave} className="edit-btn">
            Simpan
          </button>
        </div>
      ) : (
        // Mode Tampilan
        <div style={itemContainerStyle}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            style={checkboxStyle}
          />
          <div style={infoStyle} className="item-info">
            <span className="item-text">{item.text}</span>
            <span className="item-timestamp">{`${formattedDate(item)} - ${formattedTime(item)} WIB`}</span>
          </div>
          <div className="item-actions">
            <button onClick={() => setIsEditing(true)} className="edit-btn">
              Edit
            </button>
            <button onClick={() => onDelete(item.id)} className="delete-btn">
              Hapus
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
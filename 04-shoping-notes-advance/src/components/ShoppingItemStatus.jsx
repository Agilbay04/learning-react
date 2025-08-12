export default function ShoppingItemStatus({ items }) {
    // Jika tidak ada item, kembalikan null
    if (items.length === 0) return null;

    // Hitung jumlah item yang sudah dicentang
    const countCheckedItems = items.filter((item) => item.checked);

    return (
        <div className="shopping-item-status">
            {countCheckedItems.length} dari {items.length} barang sudah selesai
        </div>
    );
}
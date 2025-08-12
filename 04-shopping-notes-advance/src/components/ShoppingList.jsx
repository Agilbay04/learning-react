import ShoppingItem from './ShoppingItem';

export default function ShoppingList({ items, onDelete, onEdit }) {
  if (items.length === 0) {
    return <p style={{ textAlign: 'center' }}>Belum ada catatan belanja.</p>;
  }

  return (
    <ul className="shopping-list">
      {items.map((item) => (
        <ShoppingItem
          key={item.id}
          item={item}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
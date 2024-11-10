export default function LoadMore({ onLoad, hasMore }) {
  if (!hasMore) return null;

  return (
    <button type="button" onClick={onLoad}>
      Load More
    </button>
  );
}

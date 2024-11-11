export default function ImageCard({ instagram_username, urls }) {
  return (
    <div>
      <img width="180" src={urls.small} alt={instagram_username} />
      <p>{instagram_username}</p>
    </div>
  );
}

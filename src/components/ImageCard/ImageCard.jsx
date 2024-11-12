export default function ImageCard({ alt_description, urls }) {
  return (
    <div>
      <img width="180" src={urls.small} alt={alt_description} />
    </div>
  );
}

export default function Button({ children }) {
  return (
    <button type="submit" className="pushable w-full">
      <span className="shadow"></span>
      <span className="edge bg-pink-700"></span>
      <span className="front bg-pink-500">{children}</span>
    </button>
  );
}

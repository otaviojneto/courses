import Image from "next/image";
import favorireHeart from "../../../public/icons/heartFavorite.svg";
import favorireHeartOutlined from "../../../public/icons/heartFavoriteOutlined.svg";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onToggle,
}) => {
  return (
    <button
      onClick={onToggle}
      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
    >
      <Image
        width={24}
        height={24}
        src={isFavorite ? favorireHeart : favorireHeartOutlined}
        className="cursor-pointer"
        alt="favorite"
      />
    </button>
  );
};

export default FavoriteButton;

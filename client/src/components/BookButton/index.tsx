import imgTecnologia from '../../assets/images/Tecnologia.png';
import imgInfantil from '../../assets/images/Infantil.png';
import imgRomance from '../../assets/images/Romance.png';
import imgHistoria from '../../assets/images/Historia.png';
import imgCiencias from '../../assets/images/Ciencias.png';


type BookButtonProps = {
  category: string;
  selected: boolean;
  onClick: () => void;
};


export default function BookButton({ category, selected, onClick }: BookButtonProps){
  let imageSource;
  if (category === "Tecnologia") {
      imageSource = imgTecnologia;
  } else if (category === "Infantil") {
    imageSource = imgInfantil;
  } else if (category === "Romance") {
    imageSource = imgRomance;
  } else if (category === "História") {
    imageSource = imgHistoria;
  } else if (category === "Ciências") {
    imageSource = imgCiencias;
  } else {
    imageSource = imgTecnologia;
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={`
        flex flex-col items-center w-36 p-5 gap-2
        border-[1.67px] rounded-lg
        transition-all duration-200
        hover:bg-[#E8FFF7]
        hover:border-[#00C389]
        hover:shadow-md
        hover:-translate-y-1
        active:scale-95
        ${
          selected
            ? "border-[#00C389] bg-[#E8FFF7] shadow-sm"
            : "border-gray-300"
        }
      `}
    >
      <img src={imageSource.src} alt={category} className="w-28 h-28" />
      <span className="font-medium">{category}</span>
    </button>
  );
}
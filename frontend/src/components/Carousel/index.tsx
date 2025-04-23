import IPet from "../../types/pet";
import "./Carousel.scss";
import { generateRandomNumber } from "../../utils/index";
const Carousel = ({ pets }: { pets: IPet[] }) => {
  return (
    <div className="slider">
      <div className={`slide-track `}>
        {[...pets, ...pets, ...pets].slice(0, 14).map((pet, idx) => {
          const randomNumber = generateRandomNumber(1, 3);
          return (
            <a key={idx} href={`/pet/${pet.id}`} className="slide">
              <img
                src={`${
                  pet.type === "cat"
                    ? `/cat${randomNumber}.png`
                    : `/dog${randomNumber}.png`
                }`}
              ></img>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;

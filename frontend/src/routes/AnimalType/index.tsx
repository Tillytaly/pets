import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/petService";
import IPet from "../../types/pet";
import Carousel from "../../components/Carousel";
import { generateRandomNumber } from "../../utils/index";
import "./AnimalType.scss";
const AnimalType = () => {
  const { animalType } = useParams<{ id: string; animalType: string }>();
  const [petData, setPetData] = useState<IPet[]>([]);

  useEffect(() => {
    const fetchAnimalData = async () => {
      try {
        const response = await axiosInstance.get(`${animalType}`);

        setPetData(response.data.pets);
      } catch (error) {
        console.error("Error fetching animal data:", error);
      }
    };

    fetchAnimalData();
  }, []);

  const getLongerOrEvenTo = (length: number, array: IPet[]) => {
    if (array.length >= length) return array;

    const doubledArray = [...array, ...array];

    return getLongerOrEvenTo(length, doubledArray);
  };

  const perfectLengthArray = useMemo(() => {
    const desiredLength = 7;
    if (petData.length === 0) return [];
    const longerArray = getLongerOrEvenTo(desiredLength, petData);

    return longerArray.slice(0, desiredLength + 1);
  }, [petData.length]);

  // console.log(perfectLengthArray);

  return (
    <div>
      <h1>{`Our ${animalType}`}</h1>
      {perfectLengthArray.length ? (
        <>
          <div>
            <Carousel pets={perfectLengthArray} />
          </div>
          <div className="animalsGrid">
            {perfectLengthArray.map((pet, idx) => {
              const randomNumber = generateRandomNumber(1, 3);
              return (
                <a href={`/pet/${pet.id}`} key={`${pet.id}_${idx}`}>
                  <img
                    src={`/${(animalType || "")
                      .split("")
                      .slice(0, 3)
                      .join("")}${randomNumber}.png`}
                  ></img>
                  {pet.name}
                </a>
              );
            })}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AnimalType;

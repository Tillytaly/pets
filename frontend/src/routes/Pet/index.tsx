import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/petService";
import IPet from "../../types/pet";
import { generateRandomNumber } from "../../utils";
import { Link } from "react-router-dom";

import "./pet.scss";

const Pet = () => {
  const { id } = useParams<{ id: string }>();
  const [petData, setPetData] = useState<IPet | null>(null);

  useEffect(() => {
    const fetchAnimalData = async () => {
      try {
        const response = await axiosInstance.get(`/${id}`);
        setPetData(response.data.pet);
      } catch (error) {
        console.error("Error fetching animal data:", error);
      }
    };

    fetchAnimalData();
  }, [id]);
  const randomNumber = generateRandomNumber(1, 3);
  return (
    <div>
      <div className="linkContainer">
        <Link to="/">Go back to main page</Link>
      </div>
      <h1>{petData?.name}</h1>
      {petData ? (
        <div className="petData">
          <div className="petImage">
            <img
              src={`/${(petData.type || "")
                .split("")
                .slice(0, 3)
                .join("")}${randomNumber}.png`}
            />
          </div>
          <p>
            {petData.age} {petData.age === 1 ? "year old" : "years old"}
          </p>
          <p>{petData.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Pet;

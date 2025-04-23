import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/petService";
import IPet from "../../types/pet";
import Carousel from "../../components/Carousel";
import { Link } from "react-router-dom";
import "./pets.scss";
const Pets = () => {
  const { id } = useParams<{ id: string }>();
  const [petData, setPetData] = useState<IPet[]>([]);

  useEffect(() => {
    const fetchAnimalData = async () => {
      try {
        const response = await axiosInstance.get("/");
        setPetData(response.data.pets);
      } catch (error) {
        console.error("Error fetching animal data:", error);
      }
    };

    fetchAnimalData();
  }, [id]);

  return (
    <div>
      <h1>Meet our pets</h1>
      {petData.length ? (
        <div className="">
          <div className="linksContainer">
            <Link to="/pets/cats">Search for cats</Link>
            <Link to="/pets/dogs">Search for dogs</Link>
          </div>
          <Carousel pets={petData} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Pets;

import React, { useEffect, useState } from 'react';
import './land.css';
import { Link } from 'react-router-dom';

const AllurePage = () => {
  const [perfumes, setPerfumes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/perfumes')
      .then((res) => res.json())
      .then((data) => {
        setPerfumes(data);
        console.log('Perfumes:', data); // Optional: to check in console
      })
      .catch((err) => console.error('error aayi:', err));
  }, []);

  return (
    <div className="landing">
      {/* Background Video */}
      <video className="video-background" autoPlay muted loop>
        <source src="/videos/v3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <p className="handle">@allureperfumes</p>

      {/* Static "Welcome to" text */}
      <div className="a">Welcome to</div>

      {/* Bold and elegant "Allure" text */}
      <div className="text-block">
        <h1>
          <span className="beauty">ALLURE</span>
          <br />
          <br />
        </h1>
        <p className="desc">
          <h4>
            <span className="budget">EXPERIENCE THE ESSENCE OF LUXURY</span>
          </h4>
          DISCOVER OUR EXQUISITE RANGE OF PERFUMES, CRAFTED TO CAPTURE THE VERY SPIRIT
          OF ELEGANCE AND BEAUTY, WITHOUT THE PREMIUM PRICE TAG.
        </p>
      </div>

      <div className="tap">
  <Link to="/home">
    <div className="circle">
      <span>&#8594;</span>
    </div>
  </Link>
  <p className="tap-text">EXPLORE OUR COLLECTION</p>
</div>


      {/* 👇 Bonus: Show perfumes fetched */}
      <div className="perfume-list">
        {perfumes.map((perfume) => (
          <div key={perfume._id}>{perfume.name}</div>
        ))}
      </div>
    </div>
  );
};

export default AllurePage;

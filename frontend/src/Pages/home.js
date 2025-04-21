import React, { useEffect } from 'react';
import './home.css';
import { Link } from 'react-router-dom';


const App = () => {
  useEffect(() => {
    const video = document.querySelector('.background-video');
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const opacity = 1 - (scrollPosition / maxScroll);
      video.style.opacity = opacity;
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Landing Section */}
      <div className="landing">
        <video className="background-video" autoPlay muted loop>
          <source src="/videos/v3.mp4" type="video/mp4" />
        </video>
        <div className="overlay"></div>

        <div className="nav-wrapper">
  <nav>
    <h1>ALLURE</h1>
    <Link to="/login" className="login-button">Login</Link>
  </nav>
</div>

        <div className="hero-content">
          <h2>Experience the Essence of Luxury</h2>
          <p>
            Discover our exquisite range of perfumes crafted to capture the
            spirit of elegance and beauty.
          </p>
        </div>
      </div>
{/* Women Section */}
<section id="women">
  <div className="collection">
    <div className="collection-text">
      <h2>Women Collection</h2>
      <p>
        Step into a world of sophistication and charm. Our women's
        perfume line is designed to captivate and inspire, blending
        timeless elegance with modern allure.
      </p>
      
      <Link to="/women" className="shop-now-btn">Shop Now</Link>

    </div>

    <div className="collection-img">
      <img src="/images/i12.jpg" alt="Women's Perfume" />
    </div>
  </div>
</section>


      {/* Men Section */}
      <section id="men">
        <div className="collection">
          <div className="collection-text">
            <h2>Men Collection</h2>
            <p>
              Bold, refined, and unforgettable. Our men's collection embodies
              confidence and charisma, leaving a lasting impression wherever you
              go.
            </p>
          </div>
          <div className="collection-img">
            <img src="/images/i18.jpg" alt="Men's Perfume" />
          </div>
        </div>
      </section>

      {/* Premium Section */}
      <section id="premium">
        <div className="collection">
          <div className="collection-text">
            <h2>Premium Collection</h2>
            <p>
              Crafted with rare ingredients and timeless elegance, our premium
              line is luxury redefined for the modern connoisseur of fine
              fragrance.
            </p>
          </div>
          <div className="collection-img">
            <img src="/images/i14.jpg" alt="Premium Perfume" />
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>Perfection| Customize | © 2025 Allure Perfumes</p>
      </footer>
    </div>
  );
};

export default App;

// <p>Contact Us | Login | Customize | © 2025 Allure Perfumes</p>
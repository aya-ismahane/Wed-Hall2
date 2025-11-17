// Testimonials.jsx
import React from "react";
import "./Testimonials.css";

/**
 * Simple Avatar component used inside Testimonials
 * - src: image url
 * - size: number (px)
 * - className: additional classes
 */
function Avatar({ src, size = 72, className = "" }) {
  return (
    <img
      className={`t-avatar ${className}`}
      src={src}
      alt="client avatar"
      style={{ width: size, height: size }}
    />
  );
}

/**
 * Testimonials component
 * - Accepts optional props if you want to drive content later.
 * - This version uses static data for the illustration; replace image URLs/text as needed.
 */
export default function Testimonials() {
  // Replace these with your real image URLs or props.
  const mainAvatar = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80";
  const smallAvatars = [
    "https://www.utopix.com/fr/blog/wp-content/uploads/2024/04/OWNjOTI3MjYtOGQyYy00MzU2LTlhZTUtZGQyZTBjZDdhMzA0_811db412-6829-4e04-bfe6-a8c04d3d424b_profilhomme3-scaled.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmRLsrVoyDW3yvJPUXQMaRkYVC1jvZ7ji0RQ&s",
    "https://www.portraitprofessionnel.fr/wp-content/uploads/2024/02/Studio_Photo_Pro_Paris-1.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0LAmqeBgAaH8uuEP6z-ghw3HmuNrdvNYgWg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf5pAUfa51FMVHNLTVwIy2LY22l8M2CPlBHg&s",
  ];

  return (
    <section className="t-section" aria-labelledby="testimonials-title">
      <div className="t-container">
        <h2 id="testimonials-title" className="t-title">
          See What Our Clients Say
          <br />
          <span className="t-subtitle">About Us</span>
        </h2>

        <div className="t-row">
          {/* left floating avatars */}
          <div className="t-floating t-floating-left">
            {smallAvatars.slice(0, 3).map((src, i) => (
              <Avatar key={i} src={src} size={48} className={`left-${i}`} />
            ))}
          </div>

          {/* testimonial card */}
          <div className="t-card-wrap">
            <div className="t-card">
              <div className="t-quote-mark t-quote-open">“</div>

              <p className="t-text">
                I found the perfect wedding hall in just a few clicks. The photos and details were
                accurate, and the team was very responsive. Highly recommend this site!
              </p>

              <div className="t-author">Christine Beckam — Designer</div>

              <div className="t-quote-mark t-quote-close">”</div>
            </div>

            {/* circular avatar overlapping the card */}
            <div className="t-main-avatar">
              <Avatar src={mainAvatar} size={72} />
            </div>
          </div>

          {/* right floating avatars */}
          <div className="t-floating t-floating-right">
            {smallAvatars.slice(3).map((src, i) => (
              <Avatar key={i} src={src} size={48} className={`right-${i}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import './AboutUs.css'; // Import the CSS file
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import icons
import { useNavigate } from 'react-router-dom'; // For navigation

const clientReviews = [
    {
        stars: '★★★★★',
        title: 'ProFlex Cricket Bat',
        content: 'Great product, my child loves it! Very durable and perfect for practice sessions.',
    },
    {
        stars: '★★★★☆',
        title: 'AllCourt Tennis Racket',
        content: 'Lightweight and easy to handle. Helped improve my child’s game a lot!',
    },
    {
        stars: '★★★★★',
        title: 'Speedster Football Shoes',
        content: 'These shoes are very comfortable and provide great support for long matches.',
    },
    {
        stars: '★★★☆☆',
        title: 'PlayX Volleyball',
        content: 'Good quality ball, but loses air a bit faster than expected. Overall, a decent buy.',
    },
];

const AboutUs = () => {
        const navigate = useNavigate();
        const [currentReview, setCurrentReview] = useState(0); // Track the current review index
    
        // Navigate to "How to Choose a Sport for Children" page
        const handleChooseSportClick = () => {
            navigate('/how-to-choose-sport'); // Adjust the path as per your route
        };
    
        // Navigate reviews
        const handleNextReview = () => {
            setCurrentReview((prevIndex) => (prevIndex + 1) % clientReviews.length);
        };
    
        const handlePrevReview = () => {
            setCurrentReview((prevIndex) =>
                prevIndex === 0 ? clientReviews.length - 1 : prevIndex - 1
            );
        };

    return (
        <section className="about-us">
            <div className="what-we-do">
                <h2>WHAT WE DO</h2>
                <p>
                The FitnSportz app uses AI technology to help kids, especially around  7 years old,discover the best sports for their body type. 
                By inputting simple details like  height, weight, and age,the app suggests sports that are most suitable  for the child's physical attributes, ensuring they have the best chance for success, fun,and development.Whether it's Cricket, Basketball, Football, Badminton, VolleyBall, Tennis, TableTennis. 
                FitnSportz makes it easy for kids and parents to find the perfect sport to match their unique build and Interests.
                </p>
                <div className="choose-sport">
                    <button onClick={handleChooseSportClick}>HOW TO CHOOSE A SPORT FOR CHILDREN</button>
                </div>
            </div>

            <div className="client-reviews">
            <h3>CLIENT REVIEWS</h3>
            <div className="reviews-container">
                <button className="review-nav-icon prev-icon">
                    <FaChevronLeft />
                </button> {/* Previous Icon */}
                <div className="reviews">
                    {clientReviews.map((review, index) => (
                        <div
                            className={`review ${index % 2 === 0 ? 'review-even' : 'review-odd'}`}
                            key={index}
                        >
                            <div className="stars">{review.stars}</div>
                            <h4>{review.title}</h4>
                            <p>{review.content}</p>
                        </div>
                    ))}
                </div>
                <button className="review-nav-icon next-icon">
                    <FaChevronRight />
                </button> {/* Next Icon */}
            </div>
        </div>

        </section>
    );
};

export default AboutUs;

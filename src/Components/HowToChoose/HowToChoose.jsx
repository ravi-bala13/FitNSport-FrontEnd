import React from "react";
import "./HowToChoose.css";

const HowToChoose = () => {
  return (
    <div className="how-to-choose-sport">
      <div className="content">
        {/* Section 1 - Odd */}
        <section className="section odd">
          <h1 className="center-heading">HOW TO CHOOSE A SPORT FOR CHILDREN</h1>
          <p>
               Sports can be of huge benefit to children’s physical, emotional, and social development. However, choosing the right sport for your children can be a big decision. In this article, we look at some tips to help you choose the most suitable sport for your children, taking account of various factors such as age, personal preferences, and individual characteristics.
          </p>
        </section>

        {/* Section 2 - Even */}
        <section className="section even">
          <h2 className="center-heading">When to Introduce Children to Sport</h2>
          <p>Parents often ask when they should introduce children to sport. Here are some things to consider:</p>
          <ul>
            <li>
              <strong>Motor development</strong> <br/> Children should have good coordination and a certain degree of muscle control before starting to play sport. Children usually reach a stage of motor development that would allow them to take part in games and structured physical activity at the age of 3 or 4.
            </li>
            <li>
              <strong>Interest and motivation</strong> <br/>It’s important to observe the child’s interest in physical activities. If they are curious and want to get involved in a specific sport, it could be a good time to start.
            </li>
            <li>
              <strong>Play-based approach</strong> <br/>It’s a good idea to start with fun, play-based activities that encourage active participation. Simple games, like throwing a ball or running, can be a fun way to introduce children to sport.
            </li>
          </ul>
        </section>

        {/* Section 3 - Odd */}
        <section className="section odd">
          <h2 className="center-heading">Welcome to FITNSPORTS</h2>
          <p>
            At FITNSPORTZ, we are dedicated to nurturing the athletic potential in every child from a young age. Our mission is to foster a love for sports while ensuring that each child receives personalized guidance and support tailored to their unique fitness needs.
          </p>
          <h2 className="center-heading">Our Approach</h2>
          <p>
            Leveraging advanced AI technology, we carefully assess each child’s fitness level to recommend the most suitable sports for their development. This ensures that they not only enjoy their sports experience but also excel in their chosen activities.
          </p>
        </section>

        {/* Section 4 - Even */}
        <section className="section even">
          <h2 className="center-heading">Our Comprehensive Services</h2>
          <ul className="grid-list">
            <li>
              <strong>Sports Products</strong><br/> We offer a wide range of high-quality sports equipment and gear tailored for various activities, ensuring that your child has everything they need to train effectively and safely.
            </li>
            <li>
              <strong>Personal Sports Trainer</strong> <br/>Our experienced sports trainers provide one-on-one coaching, focusing on skill development, technique improvement, and overall performance enhancement.
            </li>
            <li>
              <strong>Dietician</strong> <br/>A balanced diet is crucial for athletic success. Our expert dieticians create personalized nutrition plans to fuel your child’s body and support their training goals.
            </li>
            <li>
              <strong>Physical Fitness Trainer</strong><br/> Our physical fitness trainers design specialized programs to build strength, endurance, and flexibility, laying a solid foundation for sports excellence.
            </li>
          </ul>
        </section>

        {/* Section 5 - Odd */}
        <section className="section odd">
          <h2 className="center-heading">Our Sports Offerings</h2>
          <p>We provide training in the following seven sports:</p>
          <ul className="grid-list sports-list">
            <li>Basketball</li>
            <li>Cricket</li>
            <li>Badminton</li>
            <li>Football</li>
            <li>Volleyball</li>
            <li>Tennis</li>
            <li>Table Tennis</li>
          </ul>

          <h2 className="center-heading">Join Us at FITNSPORTZ</h2>
          <p>
            <strong>Unlock your child’s potential with FITNSPORTZ.</strong> Our expert team is here to guide them every step of the way. Discover the right sport for your child and help them embark on a journey of growth, fitness, and fun.
          </p>
        </section>
      </div>
    </div>
  );
};

export default HowToChoose;

import { useEffect, useState } from "react";
import "./MainBody.css";

function MainBody() {
  const slides = ["/Images/1.jpg", "/Images/2.jpg", "/Images/3.png"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="main-body">
      <div className="slider">
        {slides.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Slide ${i + 1}`}
            className={`slide ${i === index ? "active" : ""}`}
          />
        ))}
      </div>

      <p className="para">
        Today a lot of students, both in school and in college and their parents
        are faced with a very confusing proposition of choosing a course or
        career. This confusion gets compounded by the fact that there are a
        number of lucrative options in front of the students. Moreover, the
        influence of media, parents, and peers creates unnecessary pressure in
        the minds of young students. All these factors create a need for expert
        external help. It is here that external Career Guidance comes into play.
      </p>
    </main>
  );
}

export default MainBody;

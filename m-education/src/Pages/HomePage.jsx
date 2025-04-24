import { useContext, useEffect, useState } from "react";
import DataContext from "../Context/DataContext";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
// images
import firstImage from "../assets/images/first-card.jpg";
import secondCard from "../assets/images/second-card.jpg";
import thirdCard from "../assets/images/third-card.jpg";
import fourthCard from "../assets/images/fourth-card.jpg";
import fifthCard from "../assets/images/fifth-card.jpg";

const HomePage = () => {
  const { headerState, setHeaderState, recentActivities, score, newQuiz } =
    useContext(DataContext);
  const [initialActivity, setInitialActivity] = useState(0);
  const [activityPerPage, setActivityPerPage] = useState(10);

  const [articles, setArticles] = useState([
    {
      image: fifthCard,
      alt: "Nola Quiz Illustration",
      title: "Test Your Knowledge with Nola",
      description:
        "Discover a world where learning comes alive! Whether you’re a scholar, a professional, or simply curious, our Education hub.",
      buttonText: "Play Now",
      link: "/quizes",
      category: "Quizzes",
      backgroundColor: "#e0f7fa",
      icon: "bx bx-desktop",
    },
    {
      image: secondCard,
      alt: "Library Illustration with Tablet",
      title: "Imagine having access to a world-class library wherever you go.",
      description:
        "Thousands of books, research articles, and magazines. Search and filter to find exactly what you need.",
      buttonText: "Visit Us",
      link: "/library",
      category: "Library",
      backgroundColor: "#fbe9e7",
      icon: "bx bxs-book-open",
    },
    {
      image: thirdCard,
      alt: "E-learning Illustration with Notebooks",
      title: "Empower yourself through our innovative e-learning courses",
      description:
        "Learn from the best in the field. Courses designed to fit your busy lifestyle. Earn credentials that boost your career.",
      buttonText: "Check Now",
      link: "/E-learn",
      category: "E-Learning",
      backgroundColor: "#e8f5e9",
      icon: "bx bx-library",
    },
    {
      image: fourthCard,
      alt: "Saved Courses Collection",
      title: "Your Personalized Learning Journey",
      description:
        "Access your saved courses anytime, anywhere. Continue your learning at your own pace. Your saved courses are always at your fingertips.",
      buttonText: "View Saved",
      link: "/saved-courses",
      category: "Saved",
      backgroundColor: "#f0f8ff",
      icon: "bx bx-bookmark-heart",
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setHeaderState(true);
  }, [headerState]);

  useEffect(() => {
    const setImages = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, 5000);
    return () => clearInterval(setImages);
  }, [currentIndex]);

  return (
    <>
      <Header />

      <main className="home">
        <article className="article">
          <img src={articles[0].image} alt={articles[currentIndex].alt} />
          <div className="content-card">
            <h3>{articles[0].title}</h3>
            <p>{articles[0].description}</p>
            <Link
              className="btn"
              to={articles[0].link}
              style={{ color: articles[0].backgroundColor }}
            >
              <button>{articles[currentIndex].buttonText}</button>
            </Link>
          </div>

          {articles.length && (
            <article
              className="
            article-inner
         animate__animated 
         animate__fadeInLeftBig

            "
              key={currentIndex}
            >
              <img
                src={articles[currentIndex].image}
                alt={articles[currentIndex].alt}
              />

              <div className="content-card">
                <h3>{articles[currentIndex].title}</h3>
                <p>{articles[currentIndex].description}</p>
                <Link
                  className="btn"
                  to={articles[currentIndex].link}
                  style={{ color: articles[currentIndex].backgroundColor }}
                >
                  <button>{articles[currentIndex].buttonText}</button>
                </Link>
              </div>
              <div className="layer"></div>
            </article>
          )}
        </article>

        <h4 className="collection-title">Category</h4>
        <div className="collections">
          {articles.length &&
            articles.map((article) => (
              <Link to={article.link} className="link">
                <button className="collection">
                  <i class={article.icon}></i>
                </button>
                <span className="collection-name">{article.category}</span>
              </Link>
            ))}
        </div>

        <h4 className="recent-activity-title">Recent Activity</h4>
        <ul>
          {recentActivities.length ? (
            [...recentActivities]
              .reverse()
              .slice(initialActivity, activityPerPage)
              .map((activity, index) => (
                <li className="recent-activity-list" key={index}>
                  <div className="activity-col">
                    <span>
                      <p>
                        <strong>{activity.title}</strong>
                      </p>

                      <p>
                        {activity.questions
                          ? `${activity.questions} Questions`
                          : `${activity.pages} Pages`}
                      </p>
                    </span>
                  </div>
                  <div className="activity-col">
                    <div
                      className={`
                        result ${
                          typeof score === "number" &&
                          parseInt(activity.score) <= 20
                            ? "low"
                            : parseInt(activity.score) < 50
                            ? "fair"
                            : parseInt(activity.score) > 50 &&
                              parseInt(activity.score) < 70
                            ? "good"
                            : parseInt(activity.score) > 70
                            ? "excellent"
                            : ""
                        }`}
                    >
                      <span>{activity.score}</span>
                    </div>
                  </div>
                </li>
              ))
          ) : (
            <p>No activity yet!</p>
          )}
        </ul>
      </main>
    </>
  );
};

export default HomePage;

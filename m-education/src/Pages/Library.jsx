import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
Link;

function BookDisplay() {
  return (
    <>
      <header className="quizes-header">
        <div className="quizes-header-wrapper">
          <Link to="/user-profile">
            <nav className="quizes-nav">
              <FontAwesomeIcon icon={faArrowLeft} color="#18493e" size="1x" />
            </nav>
          </Link>

          <span>Library</span>
        </div>
      </header>
      <div className="library">
        <h3>Oops no books was found, Disappointed???</h3>
        <a href="/user-profile">Go back home</a>
      </div>
    </>
  );
}

export default BookDisplay;

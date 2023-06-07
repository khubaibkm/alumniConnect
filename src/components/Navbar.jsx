import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Alumni Connect
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/signin">
                SignIn
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/signup">
                SignUp
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/On_boarding_form">
                Onboard Form
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

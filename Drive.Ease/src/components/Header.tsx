import React from 'react';

const Header = () => (
  <nav className="navbar navbar-expand-lg custom-nav sticky-top">
    <div className="container-fluid px-lg-5">
     <a className="navbar-brand fw-bold fs-3" href="#">DRIVE<span style={{color: 'var(--accent)'}}>.</span>EASE</a>
      <button className="navbar-toggler border-0" data-bs-toggle="collapse" data-bs-target="#nav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="nav">
        <ul className="navbar-nav ms-auto gap-4 fw-semibold">
          <li className="nav-item"><a className="nav-link" href="#home">Home</a></li>
          <li className="nav-item"><a className="nav-link" href="#work">Our Work</a></li>
          <li className="nav-item"><a className="nav-link" href="#Contact">Contact</a></li>
          <li><button className="btn btn-dark rounded-pill px-4">Get Started</button></li>
        </ul>
      </div>
    </div>
  </nav>
);
export default Header;
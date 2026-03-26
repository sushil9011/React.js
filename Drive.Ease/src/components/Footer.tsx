import React from 'react';

const Footer = () => (
  <footer className="py-5 bg-white border-top">
    <div className="container-fluid px-lg-5">
      <div className="row align-items-center">
        <div className="col-md-4">
          <h3 className="fw-bold">DRIVE<span className="text-warning">.</span>EASE</h3>
        </div>
        <div className="col-md-4 text-center my-4 my-md-0">
          <div className="d-flex justify-content-center gap-4 fw-bold small text-muted">
            <span>INSTAGRAM</span> <span>TWITTER</span> <span>LINKEDIN</span>
          </div>
        </div>
        <div className="col-md-4 text-md-end">
          <p className="small text-muted mb-0">© 2026 PREMIUM CAR RENTALS. SURAT, INDIA.</p>
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
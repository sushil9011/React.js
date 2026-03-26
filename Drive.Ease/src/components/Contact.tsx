import React from 'react';

const Contact = () => (
  <section id="Contact" className="full-section bg-light">
    <div className="container-fluid px-lg-5">
      <div className="bg-white rounded-5 shadow-lg overflow-hidden row g-0" style={{border: '1px solid #eee'}}>
        {/* Left Info Panel */}
        <div className="col-lg-4 bg- text-white p-5 d-flex flex-column justify-content-center"
        style={{ backgroundColor: 'rgb(121, 121, 121)', important: 'true' }}>
          <span className="badge bg-warning text-dark mb-3 w-25">PREMIUM</span>
          <h2 className="display-5 fw-bold mb-4">Book Your <br/> Dream Car.</h2>
          <p className="lead opacity-75 mb-5">Simple, fast, and secure booking process for elite travelers.</p>
          <div className="mt-auto">
            <p className="mb-1 fw-bold text-warning small text-uppercase">Direct Support</p>
            <p className="fs-5 fw-bold">+91 98765 43210</p>
          </div>
        </div>
        {/* Right Form Panel */}
        <div className="col-lg-8 p-5 bg-white">
          <form className="row g-4">
            <div className="col-md-6">
              <label className="small fw-bold text-muted mb-2">PICKUP LOCATION</label>
              <input type="text" placeholder="City or Airport" className="form-control bg-light border-0 py-3 rounded-3" />
            </div>
            <div className="col-md-6">
              <label className="small fw-bold text-muted mb-2">PICKUP DATE</label>
              <input type="date" className="form-control bg-light border-0 py-3 rounded-3" />
            </div>
            <div className="col-md-12">
              <label className="small fw-bold text-muted mb-2">CAR TYPE</label>
              <select className="form-select bg-light border-0 py-3 rounded-3">
                <option>Luxury Sedan</option>
                <option>Sports Car</option>
                <option>SUV</option>
              </select>
            </div>
            <div className="col-12 mt-5">
              <button className="btn btn-dark w-100 py-3 rounded-4 fw-bold fs-5 shadow-sm">Check Availability ⚡</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
);
export default Contact;



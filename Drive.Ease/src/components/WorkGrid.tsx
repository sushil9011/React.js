import React from 'react';

const WorkGrid = () => {
  const fleet = [
    { 
      name: "Lamborghini Revuelto", 
      desc: "Experience the pinnacle of Italian engineering with 1001 HP. This V12 hybrid beast offers lightning-fast acceleration.", 
      specs: "V12 Hybrid | 1001 HP", 
      price: "$650"
    },
    { 
      name: "Rolls Royce Ghost", 
      desc: "For those who value silence and serenity. The Ghost provides a magic carpet ride experience with hand-crafted luxury.", 
      specs: "V12 Twin-Turbo | Comfort", 
      price: "$900"
    },
    { 
      name: "Porsche 911 GT3", 
      desc: "Born on the racetrack, perfected for the road. The GT3 offers a naturally aspirated engine that screams up to 9000 RPM.", 
      specs: "Flat-6 | Track Ready", 
      price: "$450"
    }
  ];

  return (
    <section id="work" className="full-section bg-white">
      <div className="container-fluid px-lg-5">
        <h2 className="display-4 fw-bold mb-5">Discover Our Fleet</h2>
        <div className="row g-5">
          {fleet.map((car, i) => (
            <div className="col-lg-4" key={i}>
              <div className="work-card no-image-card">
                <div className="p-5"> 
                  <div className="d-flex justify-content-between align-items-start mb-4">
                    <div>
                      <span className="text-uppercase small fw-bold text-muted mb-2 d-block">Elite Collection</span>
                      <h3 className="fw-bold display-6" style={{ fontSize: '1.8rem' }}>{car.name}</h3>
                    </div>
                    <span className="badge bg-dark px-3 py-2">Premium</span>
                  </div>

                  <p className="text-muted mb-5" style={{ lineHeight: '1.8', fontSize: '1rem' }}>
                    {car.desc}
                  </p>

                  <div className="d-flex justify-content-between align-items-center border-top pt-4 mb-4">
                    <div>
                      <span className="d-block small text-muted">Daily Rate</span>
                      <span className="fw-bold text-dark fs-4">{car.price}</span>
                    </div>
                    <div className="text-end">
                      <span className="d-block small text-muted">Performance</span>
                      <span className="small fw-semibold text-dark">{car.specs}</span>
                    </div>
                  </div>

                  <button className="btn-book-now-v2">Book This Experience</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkGrid;
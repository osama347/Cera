import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ServicesCards = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  
  // Service data - corrected and enhanced content
  const services = [
    {
      id: 1,
      title: "Preclinical Studies",
      description: "Comprehensive studies to evaluate the safety and efficacy of potential drug candidates before clinical trials. Our team conducts rigorous laboratory and animal research to ensure a strong foundation for your therapy.",
      services: [
        "In vitro testing",
        "Pharmaceutical analysis",
        "Pharmacokinetic evaluation",
        "Safety assessment protocols"
      ],
      for: "Pharmaceutical companies and biotechnology firms developing new drugs, as well as academic researchers working on therapeutic candidates."
    },
    {
      id: 2,
      title: "Disease Modeling",
      description: "Advanced techniques to simulate and study various health conditions in a controlled setting. We develop in vitro (cell-based) and in vivo (animal) models of diseases to test new treatment approaches before clinical trials.",
      services: [
        "In vitro disease models",
        "In vivo disease simulation",
        "Computational modelling",
        "Disease mechanism studies"
      ],
      for: "Pharma and biotech companies, as well as academic institutions, seeking to understand disease mechanisms or evaluate potential therapies."
    },
    {
      id: 3,
      title: "Safety Testing",
      description: "Comprehensive safety testing protocols to ensure the safety of new drugs and treatments. Our rigorous testing procedures help identify potential risks before human trials.",
      services: [
        "Biocompatibility studies",
        "Genotoxicity assessment",
        "Systemic toxicity evaluation"
      ],
      for: "Drug developers and medical device manufacturers requiring comprehensive safety validation before regulatory submissions."
    },
    {
      id: 4,
      title: "Animal Studies",
      description: "Development and management of animal models for disease research and drug testing. We specialize in creating reliable, humane testing protocols that help predict how treatments will work in humans.",
      services: [
        "Animal model development",
        "In vivo study design",
        "Animal care procedures",
        "Data collection and analysis"
      ],
      for: "Research institutions and pharmaceutical companies requiring ethical animal testing for drug development."
    },
    {
      id: 5,
      title: "Drug Testing",
      description: "Rigorous drug testing to assess pharmacokinetics, pharmacodynamics, and potential toxicity. We provide comprehensive analysis to ensure your drug candidates meet safety and efficacy standards.",
      services: [
        "Bioanalytical studies",
        "Biomarker services",
        "Pharmaceutical analysis",
        "Toxicity assessment"
      ],
      for: "Pharmaceutical companies developing new medications and requiring detailed analysis of drug behavior."
    },
    {
      id: 6,
      title: "Tropical Medicine Testing",
      description: "Specialized R&D services focused on treatments and prevention for tropical diseases. We have expertise in diseases prevalent in our region (like dengue fever, malaria, leishmaniasis), offering efficacy testing and field research support.",
      services: [
        "In vitro efficacy testing",
        "In vivo efficacy studies",
        "Epidemiological coordination",
        "Tropical disease expertise"
      ],
      for: "Public health agencies, NGOs, and pharmaceutical companies working on vaccines or interventions for tropical infectious diseases."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="services-page" ref={sectionRef}>
      <style>
        {`
          .services-page {
            background-color: #f9fbfd;
            padding: 80px 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          
          .services-container {
            margin: 0 auto;
            padding: 0 20px;
          }
          
          .section-header {
            text-align: center;
            margin-bottom: 60px;
          }
          
          .section-title {
            font-size: 2.8rem;
            font-weight: 800;
            color: #2a2a2a;
            margin-bottom: 20px;
            position: relative;
            display: inline-block;
          }
          
          .section-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 4px;
            background: #44c2c7;
            border-radius: 2px;
          }
          
          .section-subtitle {
            font-size: 1.2rem;
            color: #555;
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.7;
          }
          
          .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
            gap: 30px;
          }
          
          .service-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            display: flex;
            flex-direction: column;
            height: 100%;
          }
          
          .service-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
          }
          
          .card-header {
            background: linear-gradient(135deg, #44c2c7 0%, #2a9d8f 100%);
            padding: 25px;
            color: white;
          }
          
          .card-title {
            font-size: 1.6rem;
            font-weight: 700;
            margin: 0 0 10px 0;
          }
          
          .card-description {
            font-size: 1rem;
            opacity: 0.9;
            line-height: 1.6;
          }
          
          .card-body {
            padding: 25px;
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          
          .services-list-title {
            font-size: 1.2rem;
            color: #44c2c7;
            font-weight: 600;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
          }
          
          .services-list-title::before {
            content: '';
            display: block;
            width: 24px;
            height: 24px;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2344c2c7'%3E%3Cpath d='M9.707 17.707l10-10-1.414-1.414L9 15.586l-4.293-4.293-1.414 1.414L9 18.414z'/%3E%3C/svg%3E") no-repeat center;
            margin-right: 10px;
          }
          
          .services-list {
            list-style: none;
            padding: 0;
            margin-bottom: 25px;
          }
          
          .services-list li {
            padding: 8px 0;
            padding-left: 35px;
            position: relative;
            font-size: 1rem;
            color: #555;
          }
          
          .services-list li::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2344c2c7'%3E%3Cpath d='M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1 15l-5-5 1.414-1.414L11 14.172l7.586-7.586L20 8l-9 9z'/%3E%3C/svg%3E") no-repeat center;
            background-size: contain;
          }
          
          .who-section {
            background: #f0f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-top: auto;
            border-left: 4px solid #44c2c7;
          }
          
          .who-title {
            font-weight: 600;
            color: #2a9d8f;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
          }
          
          .who-title::before {
            content: '';
            display: block;
            width: 20px;
            height: 20px;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232a9d8f'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E") no-repeat center;
            margin-right: 8px;
          }
          
          .who-description {
            color: #555;
            font-size: 0.95rem;
            line-height: 1.6;
          }
          
          .request-button {
            display: block;
            width: 100%;
            padding: 14px;
            background: white;
            color: #44c2c7;
            border: 2px solid #44c2c7;
            border-radius: 8px;
            font-size: 1.05rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 20px;
            position: relative;
            overflow: hidden;
          }
          
          .request-button:hover {
            background: #44c2c7;
            color: white;
          }
          
          .request-button::after {
            content: '→';
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            transition: transform 0.3s ease;
          }
          
          .request-button:hover::after {
            transform: translate(5px, -50%);
          }
          
          .science-pattern {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.03;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2344c2c7'/%3E%3C/svg%3E");
          }
          
          @media (max-width: 768px) {
            .services-grid {
              grid-template-columns: 1fr;
            }
            
            .section-title {
              font-size: 2.2rem;
            }
            
            .section-subtitle {
              font-size: 1.1rem;
            }
          }
          
          @media (max-width: 480px) {
            .services-page {
              padding: 50px 0;
            }
            
            .section-header {
              margin-bottom: 40px;
            }
            
            .section-title {
              font-size: 1.8rem;
            }
            
            .card-header {
              padding: 20px;
            }
            
            .card-title {
              font-size: 1.4rem;
            }
          }
        `}
      </style>

      <div className="services-container">
        <div className="section-header">
          <h2 className="section-title">Our Research & Development Services</h2>
          <p className="section-subtitle">
            Comprehensive solutions designed to support researchers, pharmaceutical companies, 
            and healthcare innovators at every stage of development. Each service includes 
            dedicated support with detailed pricing available upon request.
          </p>
        </div>

        <div className="science-pattern"></div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <div className="card-header">
                <h3 className="card-title">{service.title}</h3>
                <p className="card-description">{service.description}</p>
              </div>
              
              <div className="card-body">
                <div>
                  <h4 className="services-list-title">Services Offered</h4>
                  <ul className="services-list">
                    {service.services.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="who-section">
                  <h4 className="who-title">Who It's For</h4>
                  <p className="who-description">{service.for}</p>
                </div>
                
                <button className="request-button">Request Outline</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesCards;
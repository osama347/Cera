import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const TeamSection = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  
  // Team member data
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Muhammad Imran Khan",
      title: "PI, Head Drug Testing",
      affiliation: "Assistant Professor, Department of Biomedical Sciences, PAF-IAST",
      description: "A pharmacology expert leading CERA's drug safety and efficacy studies. He has extensive experience in preclinical research and ensures our laboratory meets the highest standards for quality and compliance.",
      expertise: ["Pharmacology", "Drug Safety", "Preclinical Research", "Quality Compliance"],
      linkedin: "#",
      image: "/dr_imran-removebg-preview.png"
    },
    {
      id: 2,
      name: "Dr. Fazal Wahab",
      title: "Lead Animal Studies",
      affiliation: "Associate Professor",
      description: "Specialist in preclinical animal research models with a focus on humane, reliable testing. Dr. Wahab has spent over a decade designing in vivo studies that help predict how treatments will work in humans.",
      expertise: ["Animal Models", "In Vivo Studies", "Research Ethics", "Preclinical Testing"],
      linkedin: "#",
      image: "/fazle_image-removebg-preview.png"
    },
        {
      id: 3,
      name: "Dr. Waqar Khalid Saeed",
      title: "Lead Disease Modeling and Clinical Studies ",
      affiliation: "Assistant Professor",
      description: "Specialist in preclinical animal research models with a focus on humane, reliable testing. Dr. Wahab has spent over a decade designing in vivo studies that help predict how treatments will work in humans.",
      expertise: ["Animal Models", "In Vivo Studies", "Research Ethics", "Preclinical Testing"],
      linkedin: "#",
      image: "/waqar_image-removebg-preview (1).png"
    },
          {
      id: 4,
      name: "Habab Ali Ahmad",
      title: "Community Lead /Research Scientist",
      affiliation: "Masters in Biomedical Sciences",
      description: "Specialist in preclinical animal research models with a focus on humane, reliable testing. Dr. Wahab has spent over a decade designing in vivo studies that help predict how treatments will work in humans.",
      expertise: ["Animal Models", "In Vivo Studies", "Research Ethics", "Preclinical Testing"],
      linkedin: "#",
      image: "/habab_ali_ahmadimage-removebg-preview (2).png"
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
    <div className="team-page" ref={sectionRef}>
      <style>
        {`
          .team-page {
            background-color: #f9fbfd;
            padding: 80px 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          
          .team-container {
            max-width: 1200px;
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
          
          .team-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
            gap: 40px;
          }
          
          .team-card {
            background: white;
            border-radius: 12px;
            overflow: visible;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 40px 30px 30px;
            position: relative;
          }
          
          .team-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.12);
          }
          
          .team-image-container {
            position: relative;
            margin-bottom: 25px;
          }
          
          .team-image {
            width: 160px;
            height: 160px;
            object-fit: cover;
            border-radius: 50%;
            border: 5px solid #f0f9fa;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          }
          
          .expert-badge {
            position: absolute;
            bottom: 15px;
            right: 0;
            background: linear-gradient(135deg, #44c2c7 0%, #2a9d8f 100%);
            color: white;
            padding: 5px 15px;
            font-size: 0.85rem;
            font-weight: 600;
            border-radius: 20px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
          }
          
          .team-content {
            width: 100%;
            display: flex;
            flex-direction: column;
            text-align: center;
          }
          
          .team-name {
            font-size: 1.6rem;
            font-weight: 700;
            color: #2a2a2a;
            margin-bottom: 5px;
          }
          
          .team-title {
            font-size: 1.1rem;
            color: #44c2c7;
            font-weight: 600;
            margin-bottom: 5px;
          }
          
          .team-affiliation {
            font-size: 0.95rem;
            color: #777;
            margin-bottom: 20px;
            font-style: italic;
          }
          
          /* Simplified and fixed description styling */
          .team-description {
            color: #555;
            font-size: 1rem;
            line-height: 1.7;
            margin: 0 auto 25px;
            text-align: center;
            padding: 0 15px;
            max-width: 600px;
          }
          
          .expertise-section {
            margin-bottom: 25px;
            width: 100%;
          }
          
          .expertise-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: #2a9d8f;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .expertise-title::before {
            content: '';
            display: block;
            width: 24px;
            height: 24px;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232a9d8f'%3E%3Cpath d='M12 14l9-5-9-5-9 5 9 5z'/%3E%3Cpath d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z'/%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222'/%3E%3C/svg%3E") no-repeat center;
            margin-right: 8px;
          }
          
          .expertise-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
          }
          
          .expertise-tag {
            background: #f0f9fa;
            color: #2a9d8f;
            padding: 6px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 500;
          }
          
          .contact-section {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            margin-top: 10px;
          }
          
          .contact-text {
            font-size: 0.95rem;
            color: #777;
            font-weight: 500;
            margin-right: 15px;
          }
          
          .linkedin-button {
            display: flex;
            align-items: center;
            gap: 8px;
            background: #0077b5;
            color: white;
            padding: 8px 20px;
            border-radius: 20px;
            font-weight: 500;
            text-decoration: none;
            transition: all 0.3s ease;
          }
          
          .linkedin-button:hover {
            background: #00669c;
            transform: translateY(-2px);
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
            .team-grid {
              grid-template-columns: 1fr;
            }
            
            .team-card {
              padding: 30px 20px;
            }
            
            .section-title {
              font-size: 2.2rem;
            }
            
            .team-description {
              font-size: 0.95rem;
              padding: 0 10px;
            }
          }
          
          @media (max-width: 576px) {
            .team-page {
              padding: 50px 0;
            }
            
            .section-header {
              margin-bottom: 40px;
            }
            
            .section-title {
              font-size: 1.8rem;
            }
            
            .team-name {
              font-size: 1.4rem;
            }
            
            .team-image {
              width: 140px;
              height: 140px;
            }
            
            .contact-section {
              flex-direction: column;
              gap: 15px;
            }
            
            .contact-text {
              margin-right: 0;
              margin-bottom: 10px;
            }
          }
        `}
      </style>

      <div className="team-container">
        <div className="section-header">
          <h2 className="section-title">Our Research Leadership</h2>
          <p className="section-subtitle">
            Meet the dedicated experts who drive innovation at CERA MEDICAL. Our team combines 
            academic excellence with industry expertise to advance healthcare solutions.
          </p>
        </div>

        <div className="science-pattern"></div>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="team-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <div className="team-image-container">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="team-image"
                />
                <div className="expert-badge">Expert</div>
              </div>
              
              <div className="team-content">
                <h3 className="team-name">{member.name}</h3>
                <div className="team-title">{member.title}</div>
                <div className="team-affiliation">{member.affiliation}</div>
                
                {/* Description with simplified styling */}
                <p>{member.description}</p>
                
                <div className="expertise-section">
                  <h4 className="expertise-title">Expertise</h4>
                  <div className="expertise-tags">
                    {member.expertise.map((skill, idx) => (
                      <span key={idx} className="expertise-tag">{skill}</span>
                    ))}
                  </div>
                </div>
                
                <div className="contact-section">
                  <div className="contact-text">Contact:</div>
                  <a href={member.linkedin} className="linkedin-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
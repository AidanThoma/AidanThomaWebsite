import { useEffect, useState } from 'react'
import aidanImg from './assets/aidan.png'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px' })

    document.querySelectorAll('.timeline-item, .project-card, .skill-category')
      .forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header>
        <nav className="container" aria-label="Main navigation">
          <a className="logo" href="#top" onClick={closeMenu}>Aidan Thoma</a>
          <button
            className="mobile-menu-btn"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            ☰
          </button>
          <ul className={`nav-links${menuOpen ? ' active' : ''}`} id="navLinks">
            <li><a href="#about" onClick={closeMenu}>About</a></li>
            <li><a href="#education" onClick={closeMenu}>Education</a></li>
            <li><a href="#experience" onClick={closeMenu}>Experience</a></li>
            <li><a href="#skills" onClick={closeMenu}>Skills</a></li>
            <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
            <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
          </ul>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container">
            <img src={aidanImg} alt="Aidan Thoma" className="hero-photo" />
            <h1>Aidan Thoma</h1>
            <p>Computer Science Student | Infrastructure Support Specialist | Cybersecurity Enthusiast</p>
            <div className="hero-links">
              <a href="#contact" className="btn btn-primary">Get In Touch</a>
              <a href="https://github.com/AidanThoma" target="_blank" rel="noreferrer" className="btn btn-primary">View GitHub</a>
            </div>
          </div>
        </section>

        <section id="about">
          <div className="container">
            <h2 className="section-title">About Me</h2>
            <div className="about-content">
              <p>I'm a Computer Science student at Drake University with a focus on Cybersecurity, Data Analytics, and Information Systems. I am currently working as an Infrastructure Support Specialist at Drake while maintaining a 3.6 GPA.</p>
              <p>I enjoy learning how networking and systems function through hands-on work, including managing a self-hosted Proxmox environment and contributing to cyber defense challenges. My focus includes networking, cloud services, system administration, and security operations.</p>
            </div>
          </div>
        </section>

        <section id="education">
          <div className="container">
            <h2 className="section-title">Education</h2>
            <div className="timeline-item">
              <h3>Drake University</h3>
              <div className="timeline-meta">
                <span>📍 Des Moines, IA</span>
                <span>📅 Projected Graduation: May 2027</span>
                <span>📊 GPA: 3.6</span>
              </div>
              <p><strong>Bachelor of Science in Computer Science</strong></p>
              <p>Minor in Cybersecurity, Data Analytics, and Information Systems</p>
              <p><strong>Relevant Coursework:</strong> Object Oriented Programming, Cyber Security, Data Structures, Network and Database Management, Machine Learning</p>
            </div>
          </div>
        </section>

        <section id="experience">
          <div className="container">
            <h2 className="section-title">Experience</h2>
            <div className="timeline-item">
              <h3>Infrastructure Support Specialist</h3>
              <div className="timeline-meta">
                <span>🏢 Drake University</span>
                <span>📅 June 2025 - Present</span>
                <span>📍 Des Moines, IA</span>
              </div>
              <ul>
                <li>Provide technical support across both systems and networking teams, resolving tickets related to hardware, software, and network connectivity while ensuring minimal downtime for end users.</li>
                <li>Contribute to infrastructure projects involving Azure cloud services, Cisco network services, scripting, and network troubleshooting to enhance system performance and efficiency.</li>
              </ul>
            </div>
            <div className="timeline-item">
              <h3>Network Engineer Intern</h3>
              <div className="timeline-meta">
                <span>🏢 Heartland Business Systems</span>
                <span>📅 May - August 2026</span>
                <span>📍 Des Moines, IA</span>
              </div>
              <ul>
                <li>Managed enterprise wireless and switching infrastructure for multiple consulting clients using Aruba Central, including a network supporting 30,000+ connected clients.</li>
                <li>Configured and provisioned switches and access points, handling both physical installation and cloud-based management through Aruba Central.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="skills">
          <div className="container">
            <h2 className="section-title">Technical Skills</h2>
            <div className="skills-grid">
              <div className="skill-category">
                <h3>Programming Languages</h3>
                <ul>
                  <li>Python</li><li>PowerShell</li><li>SQL</li><li>Java</li>
                  <li>C/C++</li><li>MIPS Assembly</li><li>HTML, CSS, and JavaScript</li>
                </ul>
              </div>
              <div className="skill-category">
                <h3>Tools & Technologies</h3>
                <ul>
                  <li>Git & GitHub</li><li>Azure Cloud Services</li><li>AWS</li>
                  <li>Proxmox</li><li>Cloudflare</li><li>Aruba Central</li>
                  <li>Firewalls & Network Monitoring</li><li>Microsoft Entra ID & Intune</li>
                </ul>
              </div>
              <div className="skill-category">
                <h3>Core Competencies</h3>
                <ul>
                  <li>Networking & Infrastructure</li><li>Cybersecurity</li>
                  <li>System Administration</li><li>Cloud Computing</li>
                  <li>Technical Support</li><li>Microsoft Office Specialist Excel Associate</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="projects">
          <div className="container">
            <h2 className="section-title">Projects</h2>
            <div className="projects-grid">
              <div className="project-card">
                <h3>Home Lab Virtualization Server</h3>
                <div className="project-date">June 2025 - Present</div>
                <p>Repurposed legacy hardware into a Proxmox-based virtualization environment. Designed a custom subnet with Pi-hole, firewall rules, and multiple VMs and containers while implementing role-based access controls.</p>
              </div>
              <div className="project-card">
                <h3>Cyber Security Club / ICEAGE CDC/CTF</h3>
                <div className="project-date">December 2024 - Present</div>
                <p>Represented Drake University in the ICEAGE CDC/CTF, performing system hardening, service availability monitoring, and incident response. Earned 2nd place in the Community College division.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="container">
            <h2 className="section-title">Get In Touch</h2>
            <div className="contact-grid">
              <div className="contact-item"><div className="contact-icon">📧</div><h3>Email</h3><a href="mailto:aidan.thoma@drake.edu">aidan.thoma@drake.edu</a></div>
              <div className="contact-item"><div className="contact-icon">💼</div><h3>LinkedIn</h3><a href="https://linkedin.com/in/aidan-thoma" target="_blank" rel="noreferrer">linkedin.com/in/aidan-thoma</a></div>
              <div className="contact-item"><div className="contact-icon">💻</div><h3>GitHub</h3><a href="https://github.com/AidanThoma" target="_blank" rel="noreferrer">github.com/AidanThoma</a></div>
              <div className="contact-item"><div className="contact-icon">📄</div><h3>Resume</h3><a href="/Aidan%20Thoma%20Resume.pdf" download="Aidan Thoma Resume.pdf">Download Resume</a></div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2026 Aidan Thoma. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default App

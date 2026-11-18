import { useEffect } from 'react'
import ParticleBackground from './ParticleBackground'
import './HomeLabPage.css'

function HomeLabPage() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'My Homelab | Aidan Thoma'

    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <div className="homelab-site">
      <header>
        <nav className="container" aria-label="Homelab navigation">
          <a className="logo" href="/">Aidan Thoma</a>
          <a className="homelab-home-link" href="/">
            <span aria-hidden="true">←</span> Back to portfolio
          </a>
        </nav>
      </header>

      <main className="homelab-page" id="top">
        <section className="homelab-hero">
          <ParticleBackground />
          <div className="container">
            <p className="homelab-eyebrow">Self-hosted infrastructure</p>
            <h1>My Homelab</h1>
            <p className="homelab-intro">
              A look at the services I run to manage, secure, and monitor my home lab.
            </p>
          </div>
        </section>

        <section className="homelab-about">
          <div className="container">
            <h2 className="section-title">About the Lab</h2>
            <div className="homelab-about-copy">
              <p>
                Built on repurposed hardware, my homelab is a Proxmox-based
                environment where I explore virtualization, networking, and
                security hands-on. It includes the Proxmox host itself along
                with the virtual machines and containers I use to run services.
              </p>
              <p>
                The setup gives me a place to experiment with secure remote
                access, local DNS, and monitoring. The sections below highlight
                some of the tools and services that make it work.
              </p>
            </div>
          </div>
        </section>

        <section className="homelab-features">
          <div className="container">
            <h2 className="section-title">What I Run</h2>
            <div className="homelab-feature-list">
              <article className="homelab-feature">
                <div className="homelab-feature-copy">
                  <p className="homelab-feature-label">Access &amp; security</p>
                  <h3>Zero Trust Access</h3>
                  <p>
                    Cloudflare Access protects my Proxmox login with an email
                    one-time code, adding an identity check before I can reach
                    the management interface.
                  </p>
                </div>
                <img
                  className="homelab-screenshot"
                  src="/homelab/Zero%20Trust.png"
                  alt="Cloudflare Access email one-time-code sign-in page for Proxmox"
                  loading="lazy"
                />
              </article>

              <article className="homelab-feature">
                <div className="homelab-feature-copy">
                  <p className="homelab-feature-label">Remote connectivity</p>
                  <h3>Cloudflare Tunnels</h3>
                  <p>
                    Cloudflare Tunnels let me reach my Proxmox (PVE)
                    environment, including the host itself as well as its VMs
                    and containers, from outside my home network.
                  </p>
                </div>
                <div className="homelab-tunnel-visual" aria-hidden="true">
                  <span>Outside my home network</span>
                  <span className="homelab-tunnel-line" />
                  <strong>Cloudflare Tunnel</strong>
                  <span className="homelab-tunnel-line" />
                  <span>Proxmox (PVE) environment</span>
                  <small>Host, VMs &amp; containers</small>
                </div>
              </article>

              <article className="homelab-feature">
                <div className="homelab-feature-copy">
                  <p className="homelab-feature-label">Network services</p>
                  <h3>AdGuard Home DNS</h3>
                  <p>
                    AdGuard Home runs as my local DNS server, making it easier
                    to manage name resolution across my home network.
                  </p>
                </div>
                <img
                  className="homelab-screenshot"
                  src="/homelab/dns.png"
                  alt="AdGuard Home dashboard showing local DNS statistics"
                  loading="lazy"
                />
              </article>

              <article className="homelab-feature">
                <div className="homelab-feature-copy">
                  <p className="homelab-feature-label">Monitoring &amp; AI</p>
                  <h3>AI Homelab Assistant</h3>
                  <p>
                    An Open WebUI container hosts an assistant with a tool that
                    queries my homelab logs and sends the results to a
                    Cloudflare-hosted model. It can also pull statistics from
                    my monitoring stack.
                  </p>
                </div>
                <img
                  className="homelab-screenshot"
                  src="/homelab/AI%20Homelab%20Assistant.png"
                  alt="AI assistant response summarizing Proxmox and monitoring stack statistics"
                  loading="lazy"
                />
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2026 Aidan Thoma. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default HomeLabPage

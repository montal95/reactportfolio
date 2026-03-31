import { Phone, Mail, MapPin } from 'react-feather';
import { contactInfo } from '@/lib/data/database';
import ContactForm from '@/app/components/ContactForm';

export default function Contact() {
  const { phoneNumbers, emailAddress, address } = contactInfo;

  return (
    <section
      className="page-section contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="page-container">
        <h2 className="section-title" id="contact-heading">
          Contact <span className="section-title-accent">Me</span>
        </h2>

        <div className="contact-grid">
          {/* ── Form ─────────────────────────────────────────────────── */}
          <div className="contact-form-side">
            <h3 className="contact-sub-heading">Get In Touch</h3>
            <ContactForm />
          </div>

          {/* ── Sidebar ──────────────────────────────────────────────── */}
          <aside className="contact-sidebar" aria-label="Contact information">
            {phoneNumbers.length > 0 && (
              <div className="contact-info-block">
                <span className="contact-info-icon" aria-hidden="true">
                  <Phone size={18} />
                </span>
                <div className="contact-info-content">
                  <h4 className="contact-info-title">Phone</h4>
                  {phoneNumbers.map((num) => (
                    <a
                      key={num}
                      href={`tel:${num.replace(/\D/g, '')}`}
                      className="contact-info-value"
                    >
                      {num}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {emailAddress.length > 0 && (
              <div className="contact-info-block">
                <span className="contact-info-icon" aria-hidden="true">
                  <Mail size={18} />
                </span>
                <div className="contact-info-content">
                  <h4 className="contact-info-title">Email</h4>
                  {emailAddress.map((em) => (
                    <a
                      key={em}
                      href={`mailto:${em}`}
                      className="contact-info-value"
                    >
                      {em}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {address && (
              <div className="contact-info-block">
                <span className="contact-info-icon" aria-hidden="true">
                  <MapPin size={18} />
                </span>
                <div className="contact-info-content">
                  <h4 className="contact-info-title">Location</h4>
                  <p className="contact-info-value">{address}</p>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

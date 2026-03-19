import React, { useState } from "react";
import { contactInfo } from "../data/db/database";
import * as Icon from "react-feather";
import Sectiontitle from "../components/Sectiontitle";
import Layout from "../components/Layout";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
  [key: string]: string;
}

function Contact(): React.JSX.Element {
  const { phoneNumbers, emailAddress, address } = contactInfo;
  const [formdata, setFormdata] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const requiredFields = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "subject", label: "Subject" },
    { key: "message", label: "Message" },
  ];

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    // Honeypot: hidden field filled only by bots — silently discard
    if (formdata.website) {
      setError(false);
      setFormdata({ name: "", email: "", subject: "", message: "", website: "" });
      setMessage("You message has been sent!!!");
      return;
    }

    const missing = requiredFields.find((field) => !formdata[field.key]);
    if (missing) {
      setError(true);
      setMessage(`${missing.label} is required`);
      return;
    }

    setError(false);
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "contact",
          name: formdata.name,
          email: formdata.email,
          subject: formdata.subject,
          message: formdata.message,
          website: formdata.website,
        }).toString(),
      });
      if (response.ok) {
        setFormdata({ name: "", email: "", subject: "", message: "", website: "" });
        setMessage("You message has been sent!!!");
      } else {
        setError(true);
        setMessage("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError(true);
      setMessage("Something went wrong. Please try again.");
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormdata({
      ...formdata,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  const numberFormatter = (number: string): string => {
    const phnNumber = number;
    return phnNumber;
  };

  const handleAlerts = () => {
    if (!message) return null;
    const alertType = error ? "alert-danger" : "alert-success";
    return <div className={`alert ${alertType} mt-4`}>{message}</div>;
  };

  return (
    <Layout>
      <div className="mi-contact-area mi-section mi-padding-top mi-padding-bottom">
        <div className="container">
          <Sectiontitle title="Contact Me" />
          <div className="row">
            <div className="col-lg-6">
              <div className="mi-contact-formwrapper">
                <h4>Get In Touch</h4>
                <form
                  action="#"
                  className="mi-form mi-contact-form"
                  onSubmit={submitHandler}
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <div className="mi-form-field">
                    <label htmlFor="contact-form-name">Enter your name*</label>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="name"
                      id="contact-form-name"
                      value={formdata.name}
                    />
                  </div>
                  <div className="mi-form-field">
                    <label htmlFor="contact-form-email">
                      Enter your email*
                    </label>
                    <input
                      onChange={handleChange}
                      type="email"
                      name="email"
                      id="contact-form-email"
                      value={formdata.email}
                    />
                  </div>
                  <div className="mi-form-field">
                    <label htmlFor="contact-form-subject">
                      Enter your subject*
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="subject"
                      id="contact-form-subject"
                      value={formdata.subject}
                    />
                  </div>
                  <div className="mi-form-field">
                    <label htmlFor="contact-form-message">
                      Enter your Message*
                    </label>
                    <textarea
                      onChange={handleChange}
                      name="message"
                      id="contact-form-message"
                      cols={30}
                      rows={6}
                      value={formdata.message}
                    ></textarea>
                  </div>
                  {/* Honeypot — hidden from humans, filled by bots */}
                  <div className="mi-form-field mi-form-honeypot">
                    <label htmlFor="contact-form-website">Website</label>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="website"
                      id="contact-form-website"
                      value={formdata.website}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  <div className="mi-form-field">
                    <button className="mi-button" type="submit">
                      Send Mail
                    </button>
                  </div>
                </form>
                {handleAlerts()}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mi-contact-info">
                {!phoneNumbers ? null : (
                  <div className="mi-contact-infoblock">
                    <span className="mi-contact-infoblock-icon">
                      <Icon.Phone />
                    </span>
                    <div className="mi-contact-infoblock-content">
                      <h6>Phone</h6>
                      {phoneNumbers.map((phoneNumber) => (
                        <p key={phoneNumber}>
                          <a href={numberFormatter(phoneNumber)}>
                            {phoneNumber}
                          </a>
                        </p>
                      ))}
                    </div>
                  </div>
                )}
                {!emailAddress ? null : (
                  <div className="mi-contact-infoblock">
                    <span className="mi-contact-infoblock-icon">
                      <Icon.Mail />
                    </span>
                    <div className="mi-contact-infoblock-content">
                      <h6>Email</h6>
                      {emailAddress.map((email) => (
                        <p key={email}>
                          <a href={`mailto:${email}`}>{email}</a>
                        </p>
                      ))}
                    </div>
                  </div>
                )}
                {!phoneNumbers ? null : (
                  <div className="mi-contact-infoblock">
                    <span className="mi-contact-infoblock-icon">
                      <Icon.MapPin />
                    </span>
                    <div className="mi-contact-infoblock-content">
                      <h6>Address</h6>
                      <p>{address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;

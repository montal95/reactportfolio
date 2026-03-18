import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import Socialicons from "../components/Socialicons";
import Layout from "../components/Layout";

function Home(){
  const [information, setInformation] = useState("");

  const initParticles = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particleOptions = {
    particles: {
      number: {
        value: 160,
        density: {
          enable: false
        }
      },
      color: {
        value: "#ffffff"
      },
      opacity: {
        value: 0.1
      },
      size: {
        value: 5,
        random: true,
        animation: {
          speed: 4,
          minimumValue: 0.3
        }
      },
      links: {
        enable: false
      },
      move: {
        random: true,
        speed: 1,
        direction: "top",
        outModes: { default: "out" }
      }
    }
  };
  useEffect(() =>{
    axios.get('/api/information')
    .then( response => {
      setInformation(response.data);
    })
  }, [])
  return (
    <Layout>
      <div className="mi-home-area mi-padding-section">
        <Particles
          id="tsparticles"
          className="mi-home-particle"
          init={initParticles}
          options={particleOptions}
        />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-12">
              <div className="mi-home-content">
                <h1>
                  Hi, I am <span className="color-theme">{information.name}</span>
                </h1>
                <p>{information.aboutContent}</p>
                <Socialicons bordered />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;

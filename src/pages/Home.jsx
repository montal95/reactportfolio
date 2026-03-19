import React, { useState, useEffect } from "react";
import { information } from "../data/db/database";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Socialicons from "../components/Socialicons";
import Layout from "../components/Layout";

function Home(){
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const paramConfig = {
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

  return (
    <Layout>
      <div className="mi-home-area mi-padding-section">
        {init && (
          <Particles
            className="mi-home-particle"
            options={paramConfig}
          />
        )}
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

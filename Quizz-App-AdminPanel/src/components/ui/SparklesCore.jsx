import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const SparklesCore = ({ id, background, className }) => {
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    return (
        <Particles
            id={id}
            init={particlesInit}
            className={className}
            options={{
                background: {
                    color: {
                        value: background || "transparent",
                    },
                },
                fpsLimit: 60,
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        enable: false,
                    },
                    collisions: {
                        enable: false,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: true,
                        speed: 0.5,
                        straight: false,
                    },
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            area: 800,
                        },
                    },
                    opacity: {
                        value: 0.6,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 3 },
                    },
                },
                detectRetina: true,
            }}
        />
    );
};

export default SparklesCore;

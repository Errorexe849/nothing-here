document.addEventListener('DOMContentLoaded', () => {
    // error exe Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorTrail = document.querySelector('.cursor-trail');
    const interactiveElements = document.querySelectorAll('a, button, .cyber-btn');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let trailX = window.innerWidth / 2;
    let trailY = window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // error exe Immediate cursor
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    // error exe Smooth trail
    const animateTrail = () => {
        const dx = mouseX - trailX;
        const dy = mouseY - trailY;

        trailX += dx * 0.15;
        trailY += dy * 0.15;

        cursorTrail.style.left = `${trailX}px`;
        cursorTrail.style.top = `${trailY}px`;

        requestAnimationFrame(animateTrail);
    };

    animateTrail();

    // error exe Hover states
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });
    });

    // error exe View Counter Logic (Simulated using LocalStorage)
    const viewCountEl = document.getElementById('view-count');
    if (viewCountEl) {
        // Retrieve views from localStorage, or start at a base number
        let views = localStorage.getItem('profile_views_v2');
        if (!views) {
            views = 1; // Starter number
        } else {
            views = parseInt(views) + 1; // Increment by 1 each refresh
        }
        localStorage.setItem('profile_views_v2', views);

        // Format with commas
        viewCountEl.textContent = views.toLocaleString();
    }

    // error premium Card 3D Parallax Effect
    const card = document.querySelector('.card');
    
    // Desktop Mouse Move
    document.addEventListener('mousemove', (e) => {
        if (!card) return;
        let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        card.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    document.addEventListener('mouseleave', () => {
        if (!card) return;
        card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
    });

    // Mobile Touch Move
    document.addEventListener('touchmove', (e) => {
        if (!card || e.touches.length === 0) return;
        let touch = e.touches[0];
        let xAxis = (window.innerWidth / 2 - touch.pageX) / 25;
        let yAxis = (window.innerHeight / 2 - touch.pageY) / 25;
        card.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    document.addEventListener('touchend', () => {
        if (!card) return;
        card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
    });

    // Mobile Tilt (Device Orientation)
    window.addEventListener('deviceorientation', (e) => {
        if (!card) return;
        // gamma is left-to-right tilt in degrees
        // beta is front-to-back tilt in degrees
        let xAxis = e.gamma ? e.gamma / 1.5 : 0; 
        let yAxis = e.beta ? (e.beta - 40) / 1.5 : 0; // offset beta by 40deg (average holding angle)
        
        // Clamp the rotation so the card doesn't flip over
        xAxis = Math.max(-25, Math.min(25, xAxis));
        yAxis = Math.max(-25, Math.min(25, yAxis));

        card.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    //  enter screen snow particle
    if (document.getElementById("snow-particles")) {
        tsParticles.load("snow-particles", {
            background: { color: { value: "transparent" } },
            particles: {
                color: { value: "#ffffff" },
                move: {
                    direction: "bottom",
                    enable: true,
                    outModes: { default: "out" },
                    speed: 1.5,
                    straight: false,
                },
                number: {
                    density: { enable: true, area: 800 },
                    value: 40,
                },
                opacity: { value: { min: 0.1, max: 0.8 } },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 4 } },
            }
        });
    }

    //  error exe spider particle
    tsParticles.load("tsparticles", {
        background: {
            color: {
                value: "transparent",
            },
        },
        fpsLimit: 120,
        interactivity: {
            detectsOn: "window",
            events: {
                onClick: {
                    enable: true,
                    mode: "repulse",
                },
                onHover: {
                    enable: true,
                    mode: ["grab"],
                },
            },
            modes: {
                grab: {
                    distance: 180,
                    links: {
                        opacity: 0.6,
                        color: "#45fcfcff"
                    },
                },
                repulse: {
                    distance: 150,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: ["#ad00ff", "#00e5ff"], // Purple and Cyan
            },
            links: {
                color: "#ad00ff", // Purple links
                distance: 150,
                enable: true,
                opacity: 0.25,
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: true,
                speed: 1.2,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 80, // Number of particles
            },
            opacity: {
                value: 0.6,
            },
            shape: {
                type: "triangle",
            },
            size: {
                value: { min: 1, max: 2.5 },
            },
        },
        detectRetina: true,
    });

    // Notification Toast Logic
    const toast = document.getElementById('discord-toast');
    const closeToast = document.getElementById('close-toast');

    if (toast && closeToast) {
        let isClosed = false;
        let showCount = 0;

        const loopToast = () => {
            if (isClosed || showCount >= 3) return;

            // Stay hidden for 5 seconds
            setTimeout(() => {
                if (isClosed || showCount >= 3) return;
                toast.classList.add('show');
                showCount++;

                // Stay visible for 3 seconds
                setTimeout(() => {
                    if (isClosed) return;
                    toast.classList.remove('show');

                    // Start cycle again
                    if (showCount < 5) {
                        loopToast();
                    } else {
                        isClosed = true;
                    }
                }, 3000);
            }, 5000);
        };

        // Start the loop
        loopToast();

        // Close permanently on click
        closeToast.addEventListener('click', () => {
            isClosed = true;
            toast.classList.remove('show');
        });

        // Add to interactive elements for cursor
        closeToast.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        closeToast.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });
    }

    // Lanyard Discord Presence Logic
    const DISCORD_ID = '1347542628794892308';
    const discordPresence = document.getElementById('discord-card');
    const avatarEl = document.getElementById('discord-avatar');
    const mainProfilePic = document.getElementById('main-profile-pic');
    const mainDecorationEl = document.getElementById('main-profile-decoration');
    const discordDecorationEl = document.getElementById('discord-decoration');
    const statusEl = document.getElementById('discord-status');
    const displayNameEl = document.getElementById('discord-display-name');
    const customStatusEl = document.getElementById('discord-custom-status');
    const activityEl = document.getElementById('discord-activity');

    if (discordPresence && avatarEl) {
        discordPresence.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        discordPresence.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });

        const fetchPresence = async () => {
            try {
                const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
                const { success, data } = await res.json();

                if (success && data) {
                    // Update Status Indicator
                    statusEl.className = `status-indicator ${data.discord_status}`;

                    // Update Avatar
                    if (data.discord_user.avatar) {
                        const ext = data.discord_user.avatar.startsWith('a_') ? 'gif' : 'png';
                        const avatarUrl = `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${data.discord_user.avatar}.${ext}?size=128`;
                        avatarEl.src = avatarUrl;
                        if (mainProfilePic) mainProfilePic.src = avatarUrl;
                    } else {
                        const defaultAvatar = parseInt(data.discord_user.discriminator) % 5 || 0;
                        const avatarUrl = `https://cdn.discordapp.com/embed/avatars/${defaultAvatar}.png`;
                        avatarEl.src = avatarUrl;
                        if (mainProfilePic) mainProfilePic.src = avatarUrl;
                    }

                    // Update Avatar Decoration
                    if (data.discord_user.avatar_decoration_data) {
                        const asset = data.discord_user.avatar_decoration_data.asset;
                        const decUrl = `https://cdn.discordapp.com/avatar-decoration-presets/${asset}.png?size=128`;
                        if (mainDecorationEl) {
                            mainDecorationEl.src = decUrl;
                            mainDecorationEl.classList.remove('hidden');
                        }
                        if (discordDecorationEl) {
                            discordDecorationEl.src = decUrl;
                            discordDecorationEl.classList.remove('hidden');
                        }
                    } else {
                        if (mainDecorationEl) mainDecorationEl.classList.add('hidden');
                        if (discordDecorationEl) discordDecorationEl.classList.add('hidden');
                    }

                    // Update Name
                    displayNameEl.textContent = data.discord_user.global_name || data.discord_user.display_name || data.discord_user.username;

                    // Update Custom Status
                    let statusText = '';
                    if (data.activities && data.activities.length > 0) {
                        const customActivity = data.activities.find(a => a.type === 4);
                        if (customActivity) {
                            if (customActivity.emoji) {
                                statusText += customActivity.emoji.id ?
                                    `<img src="https://cdn.discordapp.com/emojis/${customActivity.emoji.id}.${customActivity.emoji.animated ? 'gif' : 'png'}?size=16" class="status-emoji" />` :
                                    `<span class="status-emoji-text">${customActivity.emoji.name}</span>`;
                            }
                            if (customActivity.state) {
                                statusText += ` ${customActivity.state}`;
                            }
                        }
                    }
                    customStatusEl.innerHTML = statusText || '';

                    // Update Activity / Spotify
                    const otherActivity = data.activities.find(a => a.type !== 4);
                    if (data.listening_to_spotify && data.spotify) {
                        activityEl.innerHTML = `<i class="fa-brands fa-spotify spotify-icon"></i> Listening to <b>${data.spotify.song}</b> by ${data.spotify.artist}`;
                        activityEl.style.display = 'inline-block';
                    } else if (otherActivity) {
                        activityEl.textContent = `Playing ${otherActivity.name}`;
                        activityEl.style.display = 'inline-block';
                    } else {
                        activityEl.style.display = 'none';
                    }
                } else {
                    customStatusEl.innerHTML = `<span style="color:var(--neon-purple)">Join discord.gg/lanyard to enable live updates!</span>`;
                }
            } catch (err) {
                console.error('Error fetching Discord presence:', err);
                customStatusEl.textContent = 'Presence unavailable';
            }
        };

        fetchPresence();
        setInterval(fetchPresence, 10000); // 10s refresh
    }

    // Enter Screen & Music Logic
    const enterScreen = document.getElementById('enter-screen');
    const bgMusic = document.getElementById('bg-music');
    const musicPlay = document.getElementById('music-play');
    const musicPrev = document.getElementById('music-prev');
    const musicToggle = document.getElementById('music-toggle');
    const musicNext = document.getElementById('music-next');
    const playIcon = musicPlay ? musicPlay.querySelector('i') : null;
    const musicIcon = musicToggle ? musicToggle.querySelector('i') : null;
    const volumeSlider = document.getElementById('volume-slider');

    const tracks = ['bg-music.mp3', 'bg-music-2.mp3', 'bg-music-3.mp3'];
    let currentTrackIndex = 0;

    if (enterScreen && bgMusic) {
        // Play music and hide enter screen on click
        enterScreen.addEventListener('click', () => {
            enterScreen.classList.add('hidden');
            bgMusic.volume = volumeSlider ? parseFloat(volumeSlider.value) : 0.5; // Start at volume slider val
            bgMusic.play().catch(e => console.log('Audio play failed', e));

            // Request device orientation permission for iOS 13+
            if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                DeviceOrientationEvent.requestPermission().catch(console.error);
            }
        });
    }

    if (musicPlay && bgMusic && playIcon) {
        // Add interactive hover state for custom cursor
        musicPlay.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        musicPlay.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });

        musicPlay.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play().catch(e => console.log('Audio play failed', e));
            } else {
                bgMusic.pause();
            }
        });

        bgMusic.addEventListener('play', () => {
            playIcon.className = 'fa-solid fa-pause';
        });

        bgMusic.addEventListener('pause', () => {
            playIcon.className = 'fa-solid fa-play';
        });
    }

    if (musicToggle && bgMusic && musicIcon) {
        // Add interactive hover state for custom cursor
        musicToggle.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        musicToggle.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });

        musicToggle.addEventListener('click', () => {
            if (bgMusic.muted) {
                bgMusic.muted = false;
                if (bgMusic.volume === 0) {
                    musicIcon.className = 'fa-solid fa-volume-xmark';
                } else if (bgMusic.volume < 0.5) {
                    musicIcon.className = 'fa-solid fa-volume-low';
                } else {
                    musicIcon.className = 'fa-solid fa-volume-high';
                }
            } else {
                bgMusic.muted = true;
                musicIcon.className = 'fa-solid fa-volume-xmark';
            }
        });
    }

    if (musicPrev && bgMusic) {
        musicPrev.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        musicPrev.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });

        musicPrev.addEventListener('click', () => {
            currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
            const wasPaused = bgMusic.paused;
            bgMusic.src = tracks[currentTrackIndex];
            bgMusic.load();
            if (!wasPaused) {
                bgMusic.play().catch(e => console.log('Audio play failed', e));
            }
        });
    }

    if (musicNext && bgMusic) {
        musicNext.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        musicNext.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });

        musicNext.addEventListener('click', () => {
            currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
            const wasPaused = bgMusic.paused;
            bgMusic.src = tracks[currentTrackIndex];
            bgMusic.load();
            if (!wasPaused) {
                bgMusic.play().catch(e => console.log('Audio play failed', e));
            }
        });

        // Auto play next track when current ends
        bgMusic.addEventListener('ended', () => {
            currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
            bgMusic.src = tracks[currentTrackIndex];
            bgMusic.load();
            bgMusic.play().catch(e => console.log('Audio play failed', e));
        });
    }

    if (volumeSlider && bgMusic && musicIcon) {
        volumeSlider.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        volumeSlider.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });

        volumeSlider.addEventListener('input', (e) => {
            const vol = parseFloat(e.target.value);
            bgMusic.volume = vol;

            if (vol > 0 && bgMusic.muted) {
                bgMusic.muted = false;
            }

            if (!bgMusic.muted) {
                if (vol === 0) {
                    musicIcon.className = 'fa-solid fa-volume-xmark';
                } else if (vol < 0.5) {
                    musicIcon.className = 'fa-solid fa-volume-low';
                } else {
                    musicIcon.className = 'fa-solid fa-volume-high';
                }
            }
        });
    }
});

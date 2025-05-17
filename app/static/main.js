document.addEventListener("DOMContentLoaded", () => {
  // Declare global variables for libraries
  let particlesJS, AOS, gsap, ScrollTrigger

  // Preloader
  const preloader = document.querySelector(".preloader")

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.style.opacity = "0"
      setTimeout(() => {
        preloader.style.display = "none"

        // Start animations after preloader is gone
        animateHomeElements()

        // 確保贊助商跑馬燈開始運行
        initSponsorMarquee()
      }, 500)
    }, 1500)
  })

  // 初始化贊助商跑馬燈
  function initSponsorMarquee() {
    const sponsorCarousel = document.getElementById("sponsorCarousel")
    if (sponsorCarousel) {
      // 複製贊助商卡片以創建連續循環效果
      const originalCards = sponsorCarousel.innerHTML
      sponsorCarousel.innerHTML = originalCards + originalCards

      // 設置跑馬燈動畫
      let scrollPosition = 0
      const scrollSpeed = 1 // 每幀移動的像素數
      let isPaused = false

      function animateMarquee() {
        if (!isPaused) {
          scrollPosition += scrollSpeed

          // 當第一組卡片滾動出視圖時重置位置
          if (scrollPosition >= sponsorCarousel.scrollWidth / 2) {
            scrollPosition = 0
          }

          sponsorCarousel.style.transform = `translateX(-${scrollPosition}px)`
        }
        requestAnimationFrame(animateMarquee)
      }

      // 啟動動畫
      requestAnimationFrame(animateMarquee)

      // 滑鼠懸停時暫停動畫和放大效果
      const sponsorCards = document.querySelectorAll(".sponsor-card")
      sponsorCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          isPaused = true
          // Apply 3x scale directly
          card.style.transform = "scale(3)"
          card.style.zIndex = "1000"
          card.style.boxShadow = "0 30px 70px rgba(0, 123, 255, 0.7)"
          card.style.border = "2px solid rgba(0, 198, 255, 0.9)"
          
          // Add spotlight effect
          if (!card.querySelector(".spotlight")) {
            const spotlight = document.createElement("div")
            spotlight.className = "spotlight"
            spotlight.style.position = "absolute"
            spotlight.style.top = "0"
            spotlight.style.left = "0"
            spotlight.style.width = "100%"
            spotlight.style.height = "100%"
            spotlight.style.background = "radial-gradient(circle at center, rgba(255, 255, 255, 0.8), transparent 70%)"
            spotlight.style.opacity = "0"
            spotlight.style.transition = "opacity 0.3s ease"
            spotlight.style.borderRadius = "20px"
            spotlight.style.pointerEvents = "none"
            spotlight.style.zIndex = "2"
            card.appendChild(spotlight)

            // Animate spotlight
            setTimeout(() => {
              spotlight.style.opacity = "1"
            }, 50)
          }
        })

        card.addEventListener("mouseleave", () => {
          isPaused = false
          card.style.transform = "scale(1)"
          card.style.zIndex = "1"
          card.style.boxShadow = ""
          card.style.border = ""
          
          // Remove spotlight
          const spotlight = card.querySelector(".spotlight")
          if (spotlight) {
            spotlight.style.opacity = "0"
            setTimeout(() => {
              if (spotlight.parentNode === card) {
                card.removeChild(spotlight)
              }
            }, 300)
          }
        })
      })
    }
  }

  // Initialize particles.js
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#00c6ff",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#00c6ff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    })
  }

  // Matrix Canvas Effect
  const canvas = document.getElementById("matrix-canvas")
  if (canvas) {
    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Characters to display - using 1 and 0 for the binary effect
    const chars = "10"
    const fontSize = 14
    const columns = canvas.width / fontSize

    // Array to store the y position of each column
    const drops = []
    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    function drawMatrix() {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text color and font
      ctx.fillStyle = "#00c6ff"
      ctx.font = `${fontSize}px monospace`

      // Loop through each drop
      for (let i = 0; i < drops.length; i++) {
        // Get random character (only 1 or 0)
        const text = chars.charAt(Math.floor(Math.random() * chars.length))

        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Move the drop down
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    // Run the animation
    setInterval(drawMatrix, 50)

    // Resize canvas when window is resized
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Reset drops
      for (let i = 0; i < columns; i++) {
        drops[i] = 1
      }
    })
  }

  // Initialize AOS animation library
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 50,
      delay: 0,
      disable: "mobile",
    })
  }

  // Custom cursor
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px"
      cursorFollower.style.top = e.clientY + "px"
    }, 100)
  })

  document.addEventListener("mousedown", () => {
    cursor.style.width = "8px"
    cursor.style.height = "8px"
    cursorFollower.style.width = "40px"
    cursorFollower.style.height = "40px"
  })

  document.addEventListener("mouseup", () => {
    cursor.style.width = "10px"
    cursor.style.height = "10px"
    cursorFollower.style.width = "30px"
    cursorFollower.style.height = "30px"
    cursorFollower.style.borderColor = "rgba(0, 123, 255, 0.3)"
  })

  // Add hover effect to links and buttons
  const hoverElements = document.querySelectorAll("a, button, .work-card, .intro-card, .sponsor-card")

  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.style.width = "0"
      cursor.style.height = "0"
      cursorFollower.style.width = "50px"
      cursorFollower.style.height = "50px"
      cursorFollower.style.borderColor = "rgba(0, 123, 255, 0.6)"
    })

    element.addEventListener("mouseleave", () => {
      cursor.style.width = "10px"
      cursor.style.height = "10px"
      cursorFollower.style.width = "30px"
      cursorFollower.style.height = "30px"
      cursorFollower.style.borderColor = "rgba(0, 123, 255, 0.3)"
    })
  })

  // Page transition effect
  const pageTransition = document.querySelector(".page-transition")
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const target = this.getAttribute("href")

      pageTransition.style.transform = "translateY(0)"

      setTimeout(() => {
        document.querySelector(target).scrollIntoView({
          behavior: "smooth",
        })

        setTimeout(() => {
          pageTransition.style.transform = "translateY(100%)"
        }, 500)
      }, 500)
    })
  })

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileMenu = document.querySelector(".mobile-menu")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      this.classList.toggle("active")
      mobileMenu.classList.toggle("active")

      if (this.classList.contains("active")) {
        this.querySelector("span:nth-child(1)").style.transform = "translateY(9px) rotate(45deg)"
        this.querySelector("span:nth-child(2)").style.opacity = "0"
        this.querySelector("span:nth-child(3)").style.transform = "translateY(-9px) rotate(-45deg)"
      } else {
        this.querySelector("span:nth-child(1)").style.transform = "none"
        this.querySelector("span:nth-child(2)").style.opacity = "1"
        this.querySelector("span:nth-child(3)").style.transform = "none"
      }
    })
  }

  // Close mobile menu when clicking a link
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      mobileMenuBtn.classList.remove("active")
      mobileMenuBtn.querySelector("span:nth-child(1)").style.transform = "none"
      mobileMenuBtn.querySelector("span:nth-child(2)").style.opacity = "1"
      mobileMenuBtn.querySelector("span:nth-child(3)").style.transform = "none"
    })
  })

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar")
  const sections = document.querySelectorAll(".section")
  const logoText = document.querySelector(".logo-text")

  function onScroll() {
    const scrollPos = window.scrollY + 100
    let activeSection = null

    sections.forEach((section) => {
      const top = section.offsetTop
      const bottom = top + section.offsetHeight
      const id = section.getAttribute("id")

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active")
          }
        })
        activeSection = section
      }
    })

    if (activeSection) {
      const navColor = activeSection.dataset.navColor || "light"

      if (navColor === "dark") {
        navbar.classList.add("dark")
      } else {
        navbar.classList.remove("dark")
      }

      if (navColor === "transparent") {
        navbar.style.backgroundColor = "transparent"
        navbar.style.boxShadow = "none"
      }

      // Hide logo text when scrolling past home section
      const homeBottom = document.querySelector("#home").getBoundingClientRect().bottom
      if (homeBottom <= 100) {
        logoText.classList.add("hidden")
      } else {
        logoText.classList.remove("hidden")
      }
    }
  }

  window.addEventListener("scroll", onScroll)
  onScroll() // Run on page load

  // Works filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn")
  const workCards = document.querySelectorAll(".work-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      button.classList.add("active")

      // Filter work cards
      const filter = button.dataset.filter

      // Add animation to cards
      workCards.forEach((card) => {
        card.style.opacity = "0"
        card.style.transform = "scale(0.8)"

        setTimeout(() => {
          if (filter === "all" || card.dataset.category === filter) {
            card.style.display = "block"
            setTimeout(() => {
              card.style.opacity = "1"
              card.style.transform = "scale(1)"
            }, 50)
          } else {
            card.style.display = "none"
          }
        }, 300)
      })
    })
  })

  // Auto-click first filter button on page load
  const firstCategoryButton = document.querySelector('.filter-btn[data-filter="category1"]')
  if (firstCategoryButton) {
    firstCategoryButton.click()
  }

  // Exhibition map zoom functionality
  const mapImage = document.querySelector(".exhibition-map-img")
  const zoomIn = document.querySelector(".zoom-in")
  const zoomOut = document.querySelector(".zoom-out")
  const zoomReset = document.querySelector(".zoom-reset")

  let scale = 1

  if (zoomIn && zoomOut && zoomReset && mapImage) {
    zoomIn.addEventListener("click", () => {
      scale += 0.1
      mapImage.style.transform = `scale(${scale})`
    })

    zoomOut.addEventListener("click", () => {
      if (scale > 0.5) {
        scale -= 0.1
        mapImage.style.transform = `scale(${scale})`
      }
    })

    zoomReset.addEventListener("click", () => {
      scale = 1
      mapImage.style.transform = `scale(${scale})`
    })
  }

  // Intro section parallax effect
  const introCards = document.querySelectorAll(".intro-card")
  introCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const moveX = (x - centerX) / 20
      const moveY = (y - centerY) / 20

      card.style.transform = `translateY(-5px) perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`

      const cardIcon = card.querySelector(".card-icon")
      if (cardIcon) {
        cardIcon.style.transform = `translateX(${moveX * 2}px) translateY(${moveY * 2}px)`
      }
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(-5px)"
      const cardIcon = card.querySelector(".card-icon")
      if (cardIcon) {
        cardIcon.style.transform = "translateY(-5px) scale(1.1)"
      }
    })
  })

  // Transport map interactive pins
  const mapPins = document.querySelectorAll(".map-pin")
  const transportMap = document.querySelector(".transport-map")

  if (transportMap && mapPins.length > 0) {
    mapPins.forEach((pin, index) => {
      pin.addEventListener("mouseenter", () => {
        // Create tooltip if it doesn't exist
        if (!pin.querySelector(".pin-tooltip")) {
          const tooltip = document.createElement("div")
          tooltip.className = "pin-tooltip"
          tooltip.textContent = `地點 ${index + 1}`
          pin.appendChild(tooltip)
        }

        // Show tooltip
        const tooltip = pin.querySelector(".pin-tooltip")
        tooltip.style.opacity = "1"
        tooltip.style.transform = "translateY(-10px)"
      })

      pin.addEventListener("mouseleave", () => {
        const tooltip = pin.querySelector(".pin-tooltip")
        if (tooltip) {
          tooltip.style.opacity = "0"
          tooltip.style.transform = "translateY(0)"
        }
      })
    })
  }

  // Game buttons hover effect
  const gameButtons = document.querySelectorAll(".game-button")
  gameButtons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      const gameIcon = button.querySelector(".game-icon")
      if (gameIcon) {
        gameIcon.style.transform = "scale(1.2) rotate(10deg)"
        gameIcon.style.color = "#ffffff"
      }

      // Add particles effect
      const particles = 12
      for (let i = 0; i < particles; i++) {
        const particle = document.createElement("span")
        particle.className = "game-particle"

        // Random position, size and animation duration
        const size = Math.random() * 8 + 4
        const posX = Math.random() * 100
        const posY = Math.random() * 100
        const duration = Math.random() * 1 + 1
        const delay = Math.random() * 0.5

        particle.style.width = `${size}px`
        particle.style.height = `${size}px`
        particle.style.left = `${posX}%`
        particle.style.top = `${posY}%`
        particle.style.animationDuration = `${duration}s`
        particle.style.animationDelay = `${delay}s`

        button.appendChild(particle)

        // Remove particle after animation
        setTimeout(
          () => {
            if (particle.parentNode === button) {
              button.removeChild(particle)
            }
          },
          (duration + delay) * 1000,
        )
      }
    })
  })

  // FAQ section interactive buttons
  const faqButtons = document.querySelectorAll(".faq-link-button")
  faqButtons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      const icon = button.querySelector("i")
      if (icon) {
        icon.style.transform = "rotate(15deg) scale(1.2)"
        icon.style.color = "#007bff"
      }

      // Add ripple effect
      const ripple = document.createElement("span")
      ripple.className = "faq-ripple"
      button.appendChild(ripple)

      setTimeout(() => {
        if (ripple.parentNode === button) {
          button.removeChild(ripple)
        }
      }, 1000)
    })

    button.addEventListener("mouseleave", () => {
      const icon = button.querySelector("i")
      if (icon) {
        icon.style.transform = "none"
      }
    })
  })

  // About section text animation
  const aboutText = document.querySelector(".about-text")
  if (aboutText) {
    aboutText.addEventListener("mouseenter", () => {
      const techCircle = aboutText.querySelector(".tech-circle")
      if (techCircle) {
        techCircle.style.opacity = "0.8"
        techCircle.style.transform = "scale(1.2)"
      }

      const techLines = aboutText.querySelectorAll(".tech-line-h, .tech-line-v")
      techLines.forEach((line) => {
        line.style.opacity = "0.8"
        line.style.width = line.classList.contains("tech-line-h") ? "150px" : "1px"
        line.style.height = line.classList.contains("tech-line-v") ? "150px" : "1px"
      })
    })

    aboutText.addEventListener("mouseleave", () => {
      const techCircle = aboutText.querySelector(".tech-circle")
      if (techCircle) {
        techCircle.style.opacity = "0.5"
        techCircle.style.transform = "none"
      }

      const techLines = aboutText.querySelectorAll(".tech-line-h, .tech-line-v")
      techLines.forEach((line) => {
        line.style.opacity = "0.5"
        line.style.width = line.classList.contains("tech-line-h") ? "100px" : "1px"
        line.style.height = line.classList.contains("tech-line-v") ? "100px" : "1px"
      })
    })
  }

  // GSAP animations
  function animateHomeElements() {
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger)

      // Animate home section elements
      const homeTimeline = gsap.timeline()

      homeTimeline
        .from(".home-title", {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
        })
        .from(
          ".home-subtitle",
          {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.7",
        )
        .from(
          ".tech-line",
          {
            width: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.7",
        )
        .from(
          ".home-cta",
          {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.7",
        )
        .from(
          ".social-buttons",
          {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.7",
        )
        .from(
          ".circuit-line, .circuit-node",
          {
            opacity: 0,
            scale: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
          },
          "-=0.7",
        )
        .from(
          ".floating-cube, .floating-sphere",
          {
            opacity: 0,
            scale: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
          },
          "-=0.7",
        )

      // Add more dynamic animations to the matrix canvas
      gsap.to("#matrix-canvas", {
        opacity: 0.2,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // Enhanced animations for tech elements
      gsap.to(".floating-cube", {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1
      });

      gsap.to(".floating-sphere", {
        scale: 1.2,
        duration: 4,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });

      // Add scroll-triggered animations for all sections
      gsap.utils.toArray(".section").forEach((section) => {
        // Animate section background shapes
        const shapes = section.querySelectorAll(".shape");
        if (shapes.length) {
          gsap.from(shapes, {
            opacity: 0,
            scale: 0.5,
            duration: 1.5,
            stagger: 0.2,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none none",
            },
          });
        }
        
        // Animate tech corners in each section
        const corners = section.querySelectorAll(".tech-corner");
        if (corners.length) {
          gsap.from(corners, {
            width: 0,
            height: 0,
            duration: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none none",
            },
          });
        }
      });
    }
  }

  // Set all elements visible by default
  gsap.set(
    ".section-bg-shapes .shape, .tech-corner, .intro-card, .work-card, .faq-link-button, .sponsor-card, .tech-grid",
    {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  )

  // Add scroll-triggered animations for section titles
  gsap.utils.toArray(".section-title").forEach((title) => {
    gsap.from(title, {
      opacity: 0,
      x: -50,
      duration: 1,
      scrollTrigger: {
        trigger: title.parentElement,
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none none",
      },
    })
  })

  // Add scroll-triggered animations for section backgrounds
  gsap.utils.toArray(".section").forEach((section) => {
    const shapes = section.querySelectorAll(".shape")
    gsap.from(shapes, {
      opacity: 0,
      scale: 0.5,
      duration: 1.5,
      stagger: 0.2,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none none",
      },
    })
  })

  // 添加更多視覺效果到各個部分
  // 為介紹卡片添加滾動觸發動畫
  gsap.utils.toArray(".intro-card").forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      rotation: index % 2 === 0 ? -5 : 5,
      duration: 1,
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none none",
      },
    })
  })

  // 為作品卡片添加滾動觸發動畫
  gsap.utils.toArray(".work-card").forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      scale: 0.8,
      y: 30,
      duration: 0.8,
      delay: index * 0.1,
      scrollTrigger: {
        trigger: ".works-grid",
        start: "top 70%",
        end: "top 40%",
        toggleActions: "play none none none",
      },
    })
  })

  // 為交通資訊添加動畫
  gsap.from(".transport-text", {
    opacity: 0,
    x: -50,
    duration: 1,
    scrollTrigger: {
      trigger: ".transport-container",
      start: "top 70%",
      end: "top 40%",
      toggleActions: "play none none none",
    },
  })

  gsap.from(".transport-map", {
    opacity: 0,
    x: 50,
    duration: 1,
    scrollTrigger: {
      trigger: ".transport-container",
      start: "top 70%",
      end: "top 40%",
      toggleActions: "play none none none",
    },
  })

  // 為遊戲按鈕添加動畫
  gsap.utils.toArray(".game-button").forEach((button, index) => {
    gsap.from(button, {
      opacity: 0,
      scale: 0.5,
      duration: 0.8,
      delay: index * 0.2,
      scrollTrigger: {
        trigger: ".games-container",
        start: "top 70%",
        end: "top 40%",
        toggleActions: "play none none none",
      },
    })
  })

  // 為FAQ按鈕添加動畫
  gsap.utils.toArray(".faq-link-button").forEach((button, index) => {
    gsap.from(button, {
      opacity: 0,
      x: index % 2 === 0 ? -50 : 50,
      duration: 0.8,
      delay: index * 0.15,
      scrollTrigger: {
        trigger: ".faq-buttons",
        start: "top 70%",
        end: "top 40%",
        toggleActions: "play none none none",
      },
    })
  })

  // 為展場地圖添加動畫
  gsap.from(".exhibition-map", {
    opacity: 0,
    scale: 0.9,
    duration: 1,
    scrollTrigger: {
      trigger: ".map-container",
      start: "top 70%",
      end: "top 40%",
      toggleActions: "play none none none",
    },
  })

  // 為贊助商區域添加動畫
  gsap.from(".sponsor-scroll-area", {
    opacity: 0,
    y: 30,
    duration: 1,
    scrollTrigger: {
      trigger: ".sponsor-scroll-area",
      start: "top 80%",
      end: "top 50%",
      toggleActions: "play none none none",
    },
  })
    }
}

// Enhance sponsor card hover effect
function enhanceSponsorCards() {
  const sponsorCards = document.querySelectorAll(".sponsor-card")

  sponsorCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      // Create spotlight effect
      if (!card.querySelector(".spotlight")) {
        \
        const spotlight = document.createElement("div")
        spotlight.className = "spotlight"
        spotlight.style.position = "absolute"
        spotlight.style.top = "0"
        spotlight.style.left = "0"
        spotlight.style.width = "100%"
        spotlight.style.height = "100%"
        spotlight.style.background = "radial-gradient(circle at center, rgba(255, 255, 255, 0.8), transparent 70%)"
        spotlight.style.opacity = "0"
        spotlight.style.transition = "opacity 0.3s ease"
        spotlight.style.borderRadius = "20px"
        spotlight.style.pointerEvents = "none"
        spotlight.style.zIndex = "2"
        card.appendChild(spotlight)

        // Animate spotlight
        setTimeout(() => {
          spotlight.style.opacity = "1"
        }, 50)
      }

      // Scale up dramatically
      card.style.transform = "scale(3)"
      card.style.zIndex = "100"
      card.style.boxShadow = "0 30px 70px rgba(0, 123, 255, 0.7)"
      card.style.border = "2px solid rgba(0, 198, 255, 0.9)"
    })

    card.addEventListener("mouseleave", () => {
      // Remove spotlight
      const spotlight = card.querySelector(".spotlight")
      if (spotlight) {
        spotlight.style.opacity = "0"
        setTimeout(() => {
          if (spotlight.parentNode === card) {
            card.removeChild(spotlight)
          }
        }, 300)
      }

      // Reset card
      card.style.transform = "scale(1)"
      card.style.zIndex = "1"
      card.style.boxShadow = ""
      card.style.border = ""
    })
  })
}

// Call the function when document is ready
document.addEventListener("DOMContentLoaded", () => {
  // Other initialization code...

  // Call the enhanced sponsor cards function
  enhanceSponsorCards()
})

// 立即初始化贊助商跑馬燈
initSponsorMarquee()
})

// Call the function when document is ready
document.addEventListener("DOMContentLoaded", () =>
{
  // Other initialization code...

  // Call the enhanced sponsor cards function
  enhanceSponsorCards()
}
)

// 添加一個函數確保所有內容在頁面加載時可見
window.addEventListener("load", () =>
{
  // 確保所有 AOS 元素可見
  document.querySelectorAll("[data-aos]").forEach((el) => {
    el.classList.add("aos-animate")
  })

  // 確保所有卡片和元素可見
  document.querySelectorAll(".intro-card, .work-card, .faq-link-button, .sponsor-card, .tech-grid").forEach((el) => {
    el.style.opacity = "1"
    el.style.transform = "translateY(0) scale(1)"
  })

  // 手動移除預載器
  setTimeout(() => {
    const preloader = document.querySelector(".preloader")
    if (preloader) {
      preloader.style.opacity = "0"
      setTimeout(() => {
        if (preloader) {
          preloader.style.display = "none"
        }
      }, 500)
    }
  }, 1500)
}
)

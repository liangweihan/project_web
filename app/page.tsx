"use client"

import { useEffect } from "react"
import Head from "next/head"

export default function Home() {
  useEffect(() => {
    // Create a function to load scripts and return a Promise
    const loadScriptAsync = (src: string): Promise<HTMLScriptElement> => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script")
        script.src = src
        script.async = true
        script.onload = () => resolve(script)
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
        document.body.appendChild(script)
      })
    }

    // Load all necessary scripts
    const loadAllScripts = async () => {
      try {
        // First load all libraries
        await loadScriptAsync("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js")
        await loadScriptAsync("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js")
        await loadScriptAsync("https://unpkg.com/aos@next/dist/aos.js")
        await loadScriptAsync("https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js")
        await loadScriptAsync("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js")

        // Finally load our custom script
        await loadScriptAsync("/static/main.js")

        // Manually remove preloader
        setTimeout(() => {
          const preloader = document.querySelector(".preloader") as HTMLElement
          if (preloader) {
            preloader.style.opacity = "0"
            setTimeout(() => {
              if (preloader) {
                preloader.style.display = "none"
              }
            }, 500)
          }
        }, 1500)

        // Initialize AOS
        if (typeof window !== "undefined" && (window as any).AOS) {
          ;(window as any).AOS.init({
            duration: 1000,
            once: false,
            offset: 50,
            delay: 0,
            disable: "mobile",
          })
        }

        // Ensure all images are correctly loaded
        const preloadImages = () => {
          const imageUrls = [
            "/static/fb.png",
            "/static/IG.png",
            "/static/map.png",
            "/static/work1.jpg",
            "/static/work2.jpg",
            "/static/work3.jpg",
            "/static/work4.jpg",
            "/static/work5.jpg",
            "/static/Exhibition Photos.png",
          ]

          imageUrls.forEach((url) => {
            const img = new Image()
            img.src = url
            console.log(`Preloading image: ${url}`)
          })
        }

        preloadImages()

        // Manually initialize sponsor marquee
        const initSponsorMarquee = () => {
          const sponsorCarousel = document.getElementById("sponsorCarousel")
          if (sponsorCarousel) {
            // Ensure original cards are duplicated
            const originalCards = sponsorCarousel.innerHTML
            sponsorCarousel.innerHTML = originalCards + originalCards

            // Set up marquee animation
            let scrollPosition = 0
            const scrollSpeed = 1 // pixels per frame
            let isPaused = false

            function animateMarquee() {
              if (!isPaused) {
                scrollPosition -= scrollSpeed // move from right to left

                // Reset position when first set of cards is scrolled out of view
                const carouselWidth = sponsorCarousel.scrollWidth / 2
                if (Math.abs(scrollPosition) >= carouselWidth) {
                  scrollPosition = 0
                }

                sponsorCarousel.style.transform = `translateX(${scrollPosition}px)`
              }
              requestAnimationFrame(animateMarquee)
            }

            // Start animation
            requestAnimationFrame(animateMarquee)

            // Pause hover animation
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
                  spotlight.style.background =
                    "radial-gradient(circle at center, rgba(255, 255, 255, 0.8), transparent 70%)"
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

        // Ensure DOM is fully loaded before initializing marquee
        setTimeout(initSponsorMarquee, 2000)

        // Fix mobile menu button
        const fixMobileMenu = () => {
          const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
          const mobileMenu = document.querySelector(".mobile-menu")

          if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener("click", () => {
              mobileMenu.classList.toggle("active")
              mobileMenuBtn.classList.toggle("active")

              if (mobileMenu.classList.contains("active")) {
                const spans = mobileMenuBtn.querySelectorAll("span")
                if (spans.length >= 3) {
                  spans[0].style.transform = "translateY(9px) rotate(45deg)"
                  spans[1].style.opacity = "0"
                  spans[2].style.transform = "translateY(-9px) rotate(-45deg)"
                }
              } else {
                const spans = mobileMenuBtn.querySelectorAll("span")
                if (spans.length >= 3) {
                  spans[0].style.transform = "none"
                  spans[1].style.opacity = "1"
                  spans[2].style.transform = "none"
                }
              }
            })
          }
        }

        // Fix mobile menu
        setTimeout(fixMobileMenu, 1000)

        // Initialize Matrix Canvas (1010 animation)
        const initMatrixCanvas = () => {
          const canvas = document.getElementById("matrix-canvas") as HTMLCanvasElement
          if (canvas) {
            const ctx = canvas.getContext("2d")
            if (ctx) {
              canvas.width = window.innerWidth
              canvas.height = window.innerHeight

              // Only use 1 and 0 characters
              const chars = "10"
              const fontSize = 14
              const columns = canvas.width / fontSize

              // Store y position for each column
              const drops: number[] = []
              for (let i = 0; i < columns; i++) {
                drops[i] = 1
              }

              function drawMatrix() {
                // Semi-transparent black background for fade effect
                ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
                ctx.fillRect(0, 0, canvas.width, canvas.height)

                // Set text color and font
                ctx.fillStyle = "#00c6ff"
                ctx.font = `${fontSize}px monospace`

                // Loop through each column
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

              console.log("Matrix canvas initialized")
            }
          }
        }

        // Initialize Matrix Canvas
        setTimeout(initMatrixCanvas, 1000)
      } catch (error) {
        console.error("Error loading scripts:", error)
      }
    }

    loadAllScripts()

    // Cleanup function
    return () => {
      // Clean up scripts
      const scripts = document.querySelectorAll(
        'script[src*="cdnjs"], script[src*="unpkg"], script[src="/static/main.js"]',
      )
      scripts.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      })
    }
  }, [])

  return (
    <>
      <Head>
        <title>Tech Odyssey</title>
        <meta name="description" content="Tech Odyssey: 未來之旅 - 探索科技與人文的無限可能" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700&display=swap"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/three-dots@0.2.0/dist/three-dots.min.css" />
      </Head>

      <div
        dangerouslySetInnerHTML={{
          __html: `
        <!-- Preloader -->
        <div class="preloader">
            <div class="preloader-content">
                <div class="logo-preloader">LOGO</div>
                <div class="loading-text">LOADING</div>
                <div class="dot-pulse"></div>
            </div>
        </div>

        <!-- Particle Background -->
        <div id="particles-js"></div>

        <!-- Custom Cursor -->
        <div class="cursor"></div>
        <div class="cursor-follower"></div>

        <!-- Page Transition -->
        <div class="page-transition"></div>

        <!-- Navbar -->
        <nav class="navbar">
            <div class="navbar-bg"></div>
            <div class="logo-container">
                <div class="logo">LOGO</div>
                <div class="logo-text">
                    <div>115 TAHRD</div>
                    <div>畢業專展</div>
                </div>
            </div>
            <div class="nav-links"></div>
            <ul>
                <li><a href="#home" class="active nav-link">首頁</a></li>
                <li><a href="#intro" class="nav-link">專展介紹</a></li>
                <li><a href="#works" class="nav-link">作品集</a></li>
                <li><a href="#info" class="nav-link">交通資訊</a></li>
                <li><a href="#about" class="nav-link">關於科技系</a></li>
                <li><a href="#games" class="nav-link">互動遊戲</a></li>
                <li><a href="#map" class="nav-link">展場地圖</a></li>
                <li><a href="#faq" class="nav-link">FAQ</a></li>
                <li><a href="#manufacturer" class="nav-link">贊助廠商</a></li>
            </ul>
            <div class="mobile-menu-btn">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>

        <!-- Mobile Menu -->
        <div class="mobile-menu">
            <ul>
                <li><a href="#home" class="mobile-nav-link">首頁</a></li>
                <li><a href="#intro" class="mobile-nav-link">專展介紹</a></li>
                <li><a href="#works" class="mobile-nav-link">作品集</a></li>
                <li><a href="#info" class="mobile-nav-link">交通資訊</a></li>
                <li><a href="#about" class="mobile-nav-link">關於科技系</a></li>
                <li><a href="#games" class="mobile-nav-link">互動遊戲</a></li>
                <li><a href="#map" class="mobile-nav-link">展場地圖</a></li>
                <li><a href="#faq" class="mobile-nav-link">FAQ</a></li>
                <li><a href="#manufacturer" class="mobile-nav-link">贊助廠商</a></li>
            </ul>
        </div>

        <!-- Home Section -->
        <section id="home" class="section home-section" data-nav-color="transparent">
            <div class="home-content">
                <div class="home-title-container">
                    <h1 class="home-title glitch" data-text="Tech Odyssey：未來之旅">Tech Odyssey：未來之旅</h1>
                    <div class="home-subtitle">探索科技與人文的無限可能</div>
                    <div class="tech-line"></div>
                </div>
                
                <div class="home-cta">
                    <a href="#intro" class="cta-button">
                        <span>探索專展</span>
                        <svg class="cta-arrow" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </a>
                </div>
                
                <div class="social-buttons">
                    <a href="https://www.facebook.com/你的FB連結" target="_blank" class="social-btn">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://www.instagram.com/你的IG連結" target="_blank" class="social-btn">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="#" class="social-btn">
                        <i class="fab fa-youtube"></i>
                    </a>
                </div>
            </div>
            
            <div class="tech-elements">
                <div class="circuit-lines">
                    <div class="circuit-line cl-1"></div>
                    <div class="circuit-line cl-2"></div>
                    <div class="circuit-line cl-3"></div>
                    <div class="circuit-node cn-1"></div>
                    <div class="circuit-node cn-2"></div>
                    <div class="circuit-node cn-3"></div>
                </div>
                <div class="floating-elements">
                    <div class="floating-cube cube-1"></div>
                    <div class="floating-cube cube-2"></div>
                    <div class="floating-cube cube-3"></div>
                    <div class="floating-sphere sphere-1"></div>
                    <div class="floating-sphere sphere-2"></div>
                </div>
                <div class="tech-grid"></div>
            </div>
            
            <div class="footer-text">
                <p>2025 國立臺灣師範大學<br>科技應用與人力資源發展學系</p>
            </div>
            
            <div class="scroll-indicator">
                <div class="mouse">
                    <div class="wheel"></div>
                </div>
                <div class="arrow">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            
            <div class="home-bg-shapes">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
                <div class="shape shape-3"></div>
            </div>
            
            <canvas id="matrix-canvas"></canvas>
        </section>

        <!-- Intro Section -->
        <section id="intro" class="section intro-section" data-nav-color="light">
            <div class="section-title" data-aos="fade-right" data-aos-delay="0" data-aos-once="false"> • 專展介紹</div>
            <div class="intro-container">
                <div class="intro-card rounded-box" data-aos="fade-up" data-aos-delay="0" data-aos-once="false">
                    <div class="card-icon"><i class="fas fa-lightbulb"></i></div>
                    <div class="card-glow"></div>
                    <h3>關於專展</h3>
                    <p>
                        一堆文字一堆文字一堆文字一堆文字一堆文字一堆文字一堆文字一堆文字一堆文字一堆文字...
                    </p>
                    <div class="card-decoration"></div>
                    <div class="tech-corner top-left"></div>
                    <div class="tech-corner top-right"></div>
                    <div class="tech-corner bottom-left"></div>
                    <div class="tech-corner bottom-right"></div>
                </div>
                <div class="intro-card rounded-box" data-aos="fade-up" data-aos-delay="0" data-aos-once="false">
                    <div class="card-icon"><i class="fas fa-brain"></i></div>
                    <div class="card-glow"></div>
                    <h3>專展理念</h3>
                    <p>
                        一堆文字一堆文字一堆文字一堆文字一堆文字一堆文字一堆文字一堆文字一堆文字一堆文字...
                    </p>
                    <div class="card-decoration"></div>
                    <div class="tech-corner top-left"></div>
                    <div class="tech-corner top-right"></div>
                    <div class="tech-corner bottom-left"></div>
                    <div class="tech-corner bottom-right"></div>
                </div>
            </div>
            <div class="section-bg-shapes">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
            </div>
            <div class="tech-grid intro-grid"></div>
        </section>

        <!-- Works Section -->
        <section id="works" class="section works-section" data-nav-color="light">
            <div class="section-title" data-aos="fade-right" data-aos-delay="0" data-aos-once="false"> • 作品集</div>
            <div class="works-filter" data-aos="fade-up" data-aos-delay="0" data-aos-once="false">
                <button class="filter-btn active" data-filter="category1">分類一</button>
                <button class="filter-btn" data-filter="category2">分類二</button>
                <button class="filter-btn" data-filter="category3">分類三</button>
                <button class="filter-btn" data-filter="category4">分類四</button>
                <button class="filter-btn" data-filter="category5">分類五</button>
            </div>
            <div class="works-grid" data-aos="fade-up" data-aos-delay="0" data-aos-once="false">
                <a href="work-detail.html" class="work-card" data-category="category1">
                    <div class="work-image">
                        <img src="/static/images/work1.jpg" alt="作品1">
                        <div class="work-overlay">
                            <div class="overlay-content">
                                <i class="fas fa-eye"></i>
                                <span>查看詳情</span>
                            </div>
                        </div>
                    </div>
                    <div class="work-description">
                        <h4>作品標題</h4>
                        <p>我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字</p>
                    </div>
                    <div class="tech-corner top-left"></div>
                    <div class="tech-corner top-right"></div>
                    <div class="tech-corner bottom-left"></div>
                    <div class="tech-corner bottom-right"></div>
                </a>
                <a href="work-detail.html" class="work-card" data-category="category2">
                    <div class="work-image">
                        <img src="/static/images/work2.jpg" alt="作品2">
                        <div class="work-overlay">
                            <div class="overlay-content">
                                <i class="fas fa-eye"></i>
                                <span>查看詳情</span>
                            </div>
                        </div>
                    </div>
                    <div class="work-description">
                        <h4>作品標題</h4>
                        <p>我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字</p>
                    </div>
                    <div class="tech-corner top-left"></div>
                    <div class="tech-corner top-right"></div>
                    <div class="tech-corner bottom-left"></div>
                    <div class="tech-corner bottom-right"></div>
                </a>
                <a href="work-detail.html" class="work-card" data-category="category3">
                    <div class="work-image">
                        <img src="/static/images/work3.jpg" alt="作品3">
                        <div class="work-overlay">
                            <div class="overlay-content">
                                <i class="fas fa-eye"></i>
                                <span>查看詳情</span>
                            </div>
                        </div>
                    </div>
                    <div class="work-description">
                        <h4>作品標題</h4>
                        <p>我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字</p>
                    </div>
                    <div class="tech-corner top-left"></div>
                    <div class="tech-corner top-right"></div>
                    <div class="tech-corner bottom-left"></div>
                    <div class="tech-corner bottom-right"></div>
                </a>
                <a href="work-detail.html" class="work-card" data-category="category4">
                    <div class="work-image">
                        <img src="/static/images/work4.jpg" alt="作品4">
                        <div class="work-overlay">
                            <div class="overlay-content">
                                <i class="fas fa-eye"></i>
                                <span>查看詳情</span>
                            </div>
                        </div>
                    </div>
                    <div class="work-description">
                        <h4>作品標題</h4>
                        <p>我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字</p>
                    </div>
                    <div class="tech-corner top-left"></div>
                    <div class="tech-corner top-right"></div>
                    <div class="tech-corner bottom-left"></div>
                    <div class="tech-corner bottom-right"></div>
                </a>
                <a href="work-detail.html" class="work-card" data-category="category5">
                    <div class="work-image">
                        <img src="/static/images/work5.jpg" alt="作品5">
                        <div class="work-overlay">
                            <div class="overlay-content">
                                <i class="fas fa-eye"></i>
                                <span>查看詳情</span>
                            </div>
                        </div>
                    </div>
                    <div class="work-description">
                        <h4>作品標題</h4>
                        <p>我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字</p>
                    </div>
                    <div class="tech-corner top-left"></div>
                    <div class="tech-corner top-right"></div>
                    <div class="tech-corner bottom-left"></div>
                    <div class="tech-corner bottom-right"></div>
                </a>
            </div>
            <div class="works-instruction" data-aos="fade-up" data-aos-delay="0" data-aos-once="false">
                <p>點選圖片後跳到另一個頁面有詳細組別介紹</p>
            </div>
            <div class="section-bg-shapes">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
            </div>
            <div class="tech-grid works-grid-bg"></div>
        </section>

        <!-- Transport Section -->
        <section id="info" class="section transport-section" data-nav-color="light">
            <div class="section-title" data-aos="fade-right"> • 交通資訊</div>
            <div class="transport-container">
                <div class="transport-text" data-aos="fade-right" data-aos-delay="0" data-aos-once="false">
                    <p>
                        <strong>時間</strong>
                        2024年12月06日(五) 13:00 ~ 19:00 ／ 2024年12月07日(六) 08:30 ~ 15:30
                    </p>
                    <p>
                        <strong>地址</strong>
                        台北市大安區和平東路一段129號 綜210 展演廳
                    </p>
                    <p>
                        <strong>交通方式</strong>
                        1. 由捷運古亭站出發：中和新蘆線(橘線)、松山新店線(綠線) 出站：5號出口<br>
                        步行：約十分鐘可抵達圖書館校區綜合大樓，入口位於師大路與和平東路交叉口附近，依照指示地貼進入大樓後，前往2樓210會議室。<br><br>
                        2. 由捷運台電大樓站出發：松山新店線(綠線) 出站：3號出口<br>
                        步行：從師大路直行約十分鐘，可抵達圖書館校區綜合大樓，入口位於師大路直行約十分鐘，可抵達圖書館校區綜合大樓，入口位於師大路與和平東路交叉口附近，依照指示地貼進入大樓後，前往2樓210會議室。
                    </p>
                </div>
                <div class="transport-map rounded-box" data-aos="fade-left" data-aos-delay="0" data-aos-once="false">
                    <div class="map-hologram">
                        <div class="hologram-scan"></div>
                    </div>
                    <img src="/static/images/map.png" alt="交通地圖" class="map-image">
                    <div class="map-decoration"></div>
                    <div class="map-pins">
                        <div class="map-pin pin-1">
                            <div class="pin-dot"></div>
                            <div class="pin-pulse"></div>
                        </div>
                        <div class="map-pin pin-2">
                            <div class="pin-dot"></div>
                            <div class="pin-pulse"></div>
                        </div>
                    </div>
                    <div class="tech-corner top-left"></div>
                    <div class="tech-corner top-right"></div>
                    <div class="tech-corner bottom-left"></div>
                    <div class="tech-corner bottom-right"></div>
                </div>
            </div>
            <div class="section-bg-shapes">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
            </div>
            <div class="tech-grid info-grid"></div>
        </section>

        <!-- About Section -->
        <section id="about" class="section about-section" data-nav-color="light">
            <div class="section-title" data-aos="fade-right"> • 關於科技系</div>
            <div class="about-container">
                <div class="about-text rounded-box" data-aos="fade-up" data-aos-delay="0" data-aos-once="false">
                    <div class="about-decoration">
                        <div class="tech-circle"></div>
                        <div class="tech-line-h"></div>
                        <div class="tech-line-v"></div>
                    </div>
                    <p>
                        好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂
                        字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多
                        ⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好
                        多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字
                        好多⽂字<br><br>
                        好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂
                        字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多
                        ⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好
                        多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字好多⽂字
                        好多⽂字
                    </p>
                    <div class="tech-corner top-left"></div>
                    <div class="tech-corner top-right"></div>
                    <div class="tech-corner bottom-left"></div>
                    <div class="tech-corner bottom-right"></div>
                </div>
            </div>
            <div class="section-bg-shapes">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
                <div class="shape shape-3"></div>
            </div>
            <div class="tech-grid about-grid"></div>
        </section>

        <!-- Games Section -->
        <section id="games" class="section games-section" data-nav-color="light">
            <div class="section-title" data-aos="fade-right"> • 互動遊戲</div>
            <div class="games-container" data-aos="fade-up" data-aos-delay="0" data-aos-once="false">
                <a href="game1.html" class="game-button btn">
                    <div class="game-icon"><i class="fas fa-gamepad"></i></div>
                    <span>遊戲一</span>
                    <div class="btn-bg"></div>
                    <div class="btn-glitch"></div>
                    <div class="tech-corner top-left"></div>
                    <div class="tech-corner top-right"></div>
                    <div class="tech-corner bottom-left"></div>
                    <div class="tech-corner bottom-right"></div>
                </a>
                <a href="game2.html" class="game-button btn">
                    <div class="game-icon"><i class="fas fa-puzzle-piece"></i></div>
                    <span>遊戲二</span>
                    <div class="btn-bg"></div>
                    <div class="btn-glitch"></div>
                    <div class="tech-corner top-left"></div>
                    <div class="tech-corner top-right"></div>
                    <div class="tech-corner bottom-left"></div>
                    <div class="tech-corner bottom-right"></div>
                </a>
                <a href="game3.html" class="game-button btn">
                    <div class="game-icon"><i class="fas fa-dice"></i></div>
                    <span>遊戲三</span>
                    <div class="btn-bg"></div>
                    <div class="btn-glitch"></div>
                    <div class="tech-corner top-left"></div>
                    <div class="tech-corner top-right"></div>
                    <div class="tech-corner bottom-left"></div>
                    <div class="tech-corner bottom-right"></div>
                </a>
            </div>
            <div class="section-bg-shapes">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
            </div>
            <div class="tech-grid games-grid"></div>
        </section>

        <!-- Map Section -->
        <section id="map" class="section map-section" data-nav-color="light">
            <div class="section-title" data-aos="fade-right"> • 展場地圖</div>
            <div class="map-container" data-aos="fade-up" data-aos-delay="0" data-aos-once="false">
                <div class="exhibition-map rounded-box">
                    <div class="map-hologram">
                        <div class="hologram-scan"></div>
                    </div>
                    <img src="/static/images/Exhibition Photos.png" alt="展場地圖圖片" class="exhibition-map-img">
                    <div class="map-overlay">
                        <div class="map-zoom-controls">
                            <button class="zoom-in"><i class="fas fa-plus"></i></button>
                            <button class="zoom-out"><i class="fas fa-minus"></i></button>
                            <button class="zoom-reset"><i class="fas fa-sync-alt"></i></button>
                        </div>
                    </div>
                    <div class="tech-corner top-left"></div>
                    <div class="tech-corner top-right"></div>
                    <div class="tech-corner bottom-left"></div>
                    <div class="tech-corner bottom-right"></div>
                </div>
            </div>
            <div class="section-bg-shapes">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
            </div>
            <div class="tech-grid map-grid"></div>
        </section>

        <!-- FAQ Section -->
        <section id="faq" class="section faq-section" data-nav-color="light">
            <div class="section-title" data-aos="fade-right"> • FAQ</div>
            <div class="faq-buttons" data-aos="fade-up" data-aos-delay="0" data-aos-once="false">
                <a href="faq1.html" class="faq-link-button rounded-box">
                    <i class="fas fa-question-circle"></i>
                    <span>一個問題</span>
                    <div class="tech-corner top-left"></div>
                    <div class="tech-corner top-right"></div>
                    <div class="tech-corner bottom-left"></div>
                    <div class="tech-corner bottom-right"></div>
                </a>
                <a href="faq2.html" class="faq-link-button rounded-box">
                    <i class="fas fa-question-circle"></i>
                    <span>兩個問題</span>
                    <div class="tech-corner top-left"></div>
                    <div class="tech-corner top-right"></div>
                    <div class="tech-corner bottom-left"></div>
                    <div class="tech-corner bottom-right"></div>
                </a>
                <a href="faq3.html" class="faq-link-button rounded-box">
                    <i class="fas fa-question-circle"></i>
                    <span>三個問題</span>
                    <div class="tech-corner top-left"></div>
                    <div class="tech-corner top-right"></div>
                    <div class="tech-corner bottom-left"></div>
                    <div class="tech-corner bottom-right"></div>
                </a>
            </div>
            <div class="section-bg-shapes">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
            </div>
            <div class="tech-grid faq-grid"></div>
        </section>

        <!-- Manufacturer Section -->
        <section id="manufacturer" class="section manufacturer-section" data-nav-color="light">
            <div class="section-title" data-aos="fade-right"> • 贊助廠商</div>
            <div class="sponsor-scroll-area" data-aos="fade-up" data-aos-delay="0" data-aos-once="false">
                <div class="carousel" id="sponsorCarousel">
                    <div class="sponsor-card rounded-box">
                        <div class="sponsor-logo">贊助一</div>
                        <div class="tech-corner top-left"></div>
                        <div class="tech-corner top-right"></div>
                        <div class="tech-corner bottom-left"></div>
                        <div class="tech-corner bottom-right"></div>
                    </div>
                    <div class="sponsor-card rounded-box">
                        <div class="sponsor-logo">贊助二</div>
                        <div class="tech-corner top-left"></div>
                        <div class="tech-corner top-right"></div>
                        <div class="tech-corner bottom-left"></div>
                        <div class="tech-corner bottom-right"></div>
                    </div>
                    <div class="sponsor-card rounded-box">
                        <div class="sponsor-logo">贊助三</div>
                        <div class="tech-corner top-left"></div>
                        <div class="tech-corner top-right"></div>
                        <div class="tech-corner bottom-left"></div>
                        <div class="tech-corner bottom-right"></div>
                    </div>
                    <div class="sponsor-card rounded-box">
                        <div class="sponsor-logo">贊助四</div>
                        <div class="tech-corner top-left"></div>
                        <div class="tech-corner top-right"></div>
                        <div class="tech-corner bottom-left"></div>
                        <div class="tech-corner bottom-right"></div>
                    </div>
                    <div class="sponsor-card rounded-box">
                        <div class="sponsor-logo">贊助五</div>
                        <div class="tech-corner top-left"></div>
                        <div class="tech-corner top-right"></div>
                        <div class="tech-corner bottom-left"></div>
                        <div class="tech-corner bottom-right"></div>
                    </div>
                    <div class="sponsor-card rounded-box">
                        <div class="sponsor-logo">贊助六</div>
                        <div class="tech-corner top-left"></div>
                        <div class="tech-corner top-right"></div>
                        <div class="tech-corner bottom-left"></div>
                        <div class="tech-corner bottom-right"></div>
                    </div>
                    <div class="sponsor-card rounded-box">
                        <div class="sponsor-logo">贊助七</div>
                        <div class="tech-corner top-left"></div>
                        <div class="tech-corner top-right"></div>
                        <div class="tech-corner bottom-left"></div>
                        <div class="tech-corner bottom-right"></div>
                    </div>
                    <div class="sponsor-card rounded-box">
                        <div class="sponsor-logo">贊助八</div>
                        <div class="tech-corner top-left"></div>
                        <div class="tech-corner top-right"></div>
                        <div class="tech-corner bottom-left"></div>
                        <div class="tech-corner bottom-right"></div>
                    </div>
                </div>
            </div>
            <div class="manufacturer-logo rounded-box">LOGO</div>
            <div class="manufacturer-footer-text">
                <p>2025 國立臺灣師範大學 科技應用與人力資源發展學系<br>115級畢業專題成果網站</p>
            </div>
            <div class="social-buttons manufacturer-social">
                <a href="https://www.facebook.com/你的FB連結" target="_blank" class="social-btn">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.instagram.com/你的IG連結" target="_blank" class="social-btn">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="#" class="social-btn">
                    <i class="fab fa-youtube"></i>
                </a>
            </div>
            <div class="section-bg-shapes">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
                <div class="shape shape-3"></div>
            </div>
            <div class="tech-grid manufacturer-grid"></div>
        </section>
      `,
        }}
      />
      <link rel="stylesheet" href="/static/style.css" />
      <link rel="stylesheet" href="/static/enhanced-animations.css" />
      <link rel="stylesheet" href="/static/style-fixes.css" />
      <link rel="stylesheet" href="/static/critical-fixes.css" />
    </>
  )
}

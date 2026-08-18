/* =========================================================
   KCYF যুক্তি দেখাই — PUBLIC SPEAKING COMPETITION 2026
   MAIN JAVASCRIPT

   CLEAN MASTER VERSION

   Includes:
   01. DOM Initialization
   02. Preloader
   03. Mobile Navigation
   04. Official Banner Slider
   05. FAQ Accordion
   06. Smooth Navigation
   07. Scroll Reveal
   08. Active Navigation
   09. Dynamic Gallery
   10. Gallery Lightbox
   11. Console Branding
   ========================================================= */


/* =========================================================
   01. DOM INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initPreloader();

    initMobileNavigation();

    initBannerSlider();

    initFAQ();

    initSmoothNavigation();

    initScrollReveal();

    initActiveNavigation();

    initGallery();


});


/* =========================================================
   02. PRELOADER
   ========================================================= */

function initPreloader() {

    const preloader =
        document.querySelector(".preloader");

    if (!preloader) {
        return;
    }

    const minimumDisplayTime = 900;

    const startTime = performance.now();


    window.addEventListener(
        "load",
        () => {

            const elapsed =
                performance.now() - startTime;

            const remaining =
                Math.max(
                    0,
                    minimumDisplayTime - elapsed
                );


            setTimeout(() => {

                preloader.classList.add(
                    "loaded"
                );

            }, remaining);

        },
        {
            once: true
        }
    );

}

/* =========================================================
   03. MOBILE NAVIGATION
   ========================================================= */

function initMobileNavigation() {

    const menuToggle =
        document.querySelector(
            ".mobile-menu-toggle"
        );


    const mobileNav =
        document.querySelector(
            ".mobile-nav"
        );


    if (
        !menuToggle ||
        !mobileNav
    ) {
        return;
    }


    /* -----------------------------------------------------
       OPEN / CLOSE MENU
       ----------------------------------------------------- */

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                menuToggle.classList.toggle(
                    "active"
                );


            mobileNav.classList.toggle(
                "active"
            );


            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
                    ? "true"
                    : "false"
            );


            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        }
    );


    /* -----------------------------------------------------
       CLOSE AFTER CLICKING LINK
       ----------------------------------------------------- */

    const mobileLinks =
        mobileNav.querySelectorAll("a");


    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                menuToggle.classList.remove(
                    "active"
                );


                mobileNav.classList.remove(
                    "active"
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                document.body.classList.remove(
                    "menu-open"
                );

            }
        );

    });


    /* -----------------------------------------------------
       ESCAPE TO CLOSE
       ----------------------------------------------------- */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape"
            ) {
                return;
            }


            menuToggle.classList.remove(
                "active"
            );


            mobileNav.classList.remove(
                "active"
            );


            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );


            document.body.classList.remove(
                "menu-open"
            );

        }
    );

}


/* =========================================================
   04. OFFICIAL BANNER SLIDER
   ========================================================= */

function initBannerSlider() {

    const slider =
        document.querySelector(
            ".official-banner-slider"
        );


    if (!slider) {
        return;
    }


    const slides =
        slider.querySelectorAll(
            ".banner-slide"
        );


    const dots =
        slider.querySelectorAll(
            ".banner-dot"
        );


    const prevButton =
        slider.querySelector(
            ".banner-prev"
        );


    const nextButton =
        slider.querySelector(
            ".banner-next"
        );


    const currentCounter =
        slider.querySelector(
            ".banner-current"
        );


    const progress =
        slider.querySelector(
            ".banner-progress span"
        );


    /* -----------------------------------------------------
       SAFETY CHECK
       ----------------------------------------------------- */

    if (!slides.length) {
        return;
    }


    /* -----------------------------------------------------
       SETTINGS
       ----------------------------------------------------- */

    const SLIDE_DURATION =
        6000;


    let currentIndex =
        0;


    let autoSlide = null;


    /* -----------------------------------------------------
       UPDATE SLIDE
       ----------------------------------------------------- */

    function showSlide(index) {

        currentIndex =
            (
                index +
                slides.length
            ) %
            slides.length;


        slides.forEach(
            (slide, i) => {

                slide.classList.toggle(
                    "active",
                    i === currentIndex
                );

            }
        );


        dots.forEach(
            (dot, i) => {

                dot.classList.toggle(
                    "active",
                    i === currentIndex
                );

            }
        );


        if (currentCounter) {

            currentCounter.textContent =
                String(
                    currentIndex + 1
                ).padStart(2, "0");

        }


        restartProgress();

    }


    /* -----------------------------------------------------
       PROGRESS BAR
       ----------------------------------------------------- */

    function restartProgress() {

        if (!progress) {
            return;
        }


        progress.style.transition =
            "none";


        progress.style.width =
            "0%";


        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                progress.style.transition =
                    `width ${SLIDE_DURATION}ms linear`;


                progress.style.width =
                    "100%";

            });

        });

    }


    /* -----------------------------------------------------
       NEXT
       ----------------------------------------------------- */

    function nextSlide() {

        showSlide(
            currentIndex + 1
        );

    }


    /* -----------------------------------------------------
       PREVIOUS
       ----------------------------------------------------- */

    function previousSlide() {

        showSlide(
            currentIndex - 1
        );

    }


    /* -----------------------------------------------------
       START AUTO SLIDE
       ----------------------------------------------------- */

    function startAutoSlide() {

        clearInterval(
            autoSlide
        );


        autoSlide =
            setInterval(
                nextSlide,
                SLIDE_DURATION
            );

    }


    /* -----------------------------------------------------
       STOP AUTO SLIDE
       ----------------------------------------------------- */

    function stopAutoSlide() {

        clearInterval(
            autoSlide
        );

    }


    /* -----------------------------------------------------
       RESTART AUTO SLIDE
       ----------------------------------------------------- */

    function restartAutoSlide() {

        stopAutoSlide();

        startAutoSlide();

    }


    /* -----------------------------------------------------
       NEXT BUTTON
       ----------------------------------------------------- */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                nextSlide();

                restartAutoSlide();

            }
        );

    }


    /* -----------------------------------------------------
       PREVIOUS BUTTON
       ----------------------------------------------------- */

    if (prevButton) {

        prevButton.addEventListener(
            "click",
            () => {

                previousSlide();

                restartAutoSlide();

            }
        );

    }


    /* -----------------------------------------------------
       DOT NAVIGATION
       ----------------------------------------------------- */

    dots.forEach(
        (dot, index) => {

            dot.addEventListener(
                "click",
                () => {

                    showSlide(index);

                    restartAutoSlide();

                }
            );

        }
    );


    /* -----------------------------------------------------
       PAUSE ON HOVER
       ----------------------------------------------------- */

    slider.addEventListener(
        "mouseenter",
        stopAutoSlide
    );


    slider.addEventListener(
        "mouseleave",
        startAutoSlide
    );


    /* -----------------------------------------------------
       PAUSE ON MOBILE TOUCH
       ----------------------------------------------------- */

    slider.addEventListener(
        "touchstart",
        stopAutoSlide,
        {
            passive: true
        }
    );


    slider.addEventListener(
        "touchend",
        startAutoSlide,
        {
            passive: true
        }
    );


    /* -----------------------------------------------------
       KEYBOARD NAVIGATION
       ----------------------------------------------------- */

    document.addEventListener(
        "keydown",
        event => {

            /*
             * Only react to arrow keys when
             * the banner is reasonably visible.
             */

            const rect =
                slider.getBoundingClientRect();


            const visible =
                rect.bottom > 0 &&
                rect.top <
                window.innerHeight;


            if (!visible) {
                return;
            }


            if (
                event.key === "ArrowRight"
            ) {

                nextSlide();

                restartAutoSlide();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                previousSlide();

                restartAutoSlide();

            }

        }
    );


    /* -----------------------------------------------------
       INITIALIZE
       ----------------------------------------------------- */

    showSlide(0);

    startAutoSlide();

}


/* =========================================================
   05. FAQ ACCORDION
   ========================================================= */

function initFAQ() {

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    if (!faqItems.length) {
        return;
    }


    faqItems.forEach(
        item => {

            const question =
                item.querySelector(
                    ".faq-question"
                );


            if (!question) {
                return;
            }


            question.addEventListener(
                "click",
                () => {

                    const isActive =
                        item.classList.contains(
                            "active"
                        );


                    /* -------------------------------------
                       CLOSE OTHER QUESTIONS
                       ------------------------------------- */

                    faqItems.forEach(
                        otherItem => {

                            if (
                                otherItem ===
                                item
                            ) {
                                return;
                            }


                            otherItem.classList.remove(
                                "active"
                            );


                            const otherQuestion =
                                otherItem.querySelector(
                                    ".faq-question"
                                );


                            if (
                                otherQuestion
                            ) {

                                otherQuestion.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );

                            }

                        }
                    );


                    /* -------------------------------------
                       TOGGLE CURRENT QUESTION
                       ------------------------------------- */

                    item.classList.toggle(
                        "active",
                        !isActive
                    );


                    question.setAttribute(
                        "aria-expanded",
                        !isActive
                            ? "true"
                            : "false"
                    );

                }
            );

        }
    );

}


/* =========================================================
   06. SMOOTH NAVIGATION
   ========================================================= */

function initSmoothNavigation() {

    const navigationLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    navigationLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        }
    );

}


/* =========================================================
   07. SCROLL REVEAL
   ========================================================= */

/* =========================================================
   07. MOBILE-SAFE SCROLL REVEAL
   ---------------------------------------------------------
   PERFORMANCE VERSION

   Goals:
   - Prevent white/unloaded sections
   - Reveal content BEFORE it reaches viewport
   - Avoid excessive IntersectionObserver work
   - Reveal only once
   - Give iPhone Safari more rendering time
   - Keep existing reveal CSS/animations
   ========================================================= */

function initScrollReveal() {

    const revealElements =
        document.querySelectorAll(".reveal");


    /* -----------------------------------------------------
       SAFETY CHECK
       ----------------------------------------------------- */

    if (!revealElements.length) {
        return;
    }


    /* -----------------------------------------------------
       REDUCED MOTION
       ----------------------------------------------------- */

    const reduceMotion =
        window.matchMedia &&
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reduceMotion) {

        revealElements.forEach(element => {

            element.classList.add("revealed");

        });

        return;
    }


    /* -----------------------------------------------------
       FALLBACK
       ----------------------------------------------------- */

    if (!("IntersectionObserver" in window)) {

        revealElements.forEach(element => {

            element.classList.add("revealed");

        });

        return;
    }


    /* -----------------------------------------------------
       MOBILE DETECTION
       ----------------------------------------------------- */

    const isMobile =
        window.matchMedia(
            "(max-width: 900px)"
        ).matches;


    /* -----------------------------------------------------
       OBSERVER SETTINGS
       -----------------------------------------------------

       We intentionally reveal elements BEFORE they enter
       the screen.

       Mobile gets a larger preload distance because
       iPhone Safari needs more time to render content.
       ----------------------------------------------------- */

    const rootMargin =
        isMobile
            ? "0px 0px 350px 0px"
            : "0px 0px 250px 0px";


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const element =
                        entry.target;


                    /* -------------------------------------
                       REVEAL
                       ------------------------------------- */

                    element.classList.add(
                        "revealed"
                    );


                    /* -------------------------------------
                       STOP OBSERVING
                       ------------------------------------- */

                    observer.unobserve(
                        element
                    );

                });

            },
            {
                root: null,

                rootMargin: rootMargin,

                threshold: 0
            }
        );


    /* -----------------------------------------------------
       OBSERVE ELEMENTS
       ----------------------------------------------------- */

    revealElements.forEach(element => {

        /*
         * If the element is already inside or close to
         * the viewport, reveal it immediately.
         */

        const rect =
            element.getBoundingClientRect();


        const preloadDistance =
            isMobile
                ? 500
                : 350;


        const isNearViewport =
            rect.top <
                window.innerHeight +
                preloadDistance &&
            rect.bottom >
                -preloadDistance;


        if (isNearViewport) {

            element.classList.add(
                "revealed"
            );

            return;
        }


        observer.observe(
            element
        );

    });


    /* -----------------------------------------------------
       SAFETY PASS
       -----------------------------------------------------

       Safari can occasionally delay IntersectionObserver
       callbacks while scrolling quickly.

       This lightweight check catches elements that have
       entered the preload area.
       ----------------------------------------------------- */

    let ticking = false;


    function checkNearbyElements() {

        if (ticking) {
            return;
        }


        ticking = true;


        requestAnimationFrame(() => {

            const preloadDistance =
                isMobile
                    ? 600
                    : 400;


            revealElements.forEach(
                element => {

                    if (
                        element.classList.contains(
                            "revealed"
                        )
                    ) {
                        return;
                    }


                    const rect =
                        element.getBoundingClientRect();


                    if (
                        rect.top <
                            window.innerHeight +
                            preloadDistance
                    ) {

                        element.classList.add(
                            "revealed"
                        );

                        observer.unobserve(
                            element
                        );

                    }

                }
            );


            ticking = false;

        });

    }


    /* -----------------------------------------------------
       SCROLL LISTENER
       -----------------------------------------------------

       Passive = browser can keep scrolling smoothly.
       requestAnimationFrame prevents excessive work.
       ----------------------------------------------------- */

    window.addEventListener(
        "scroll",
        checkNearbyElements,
        {
            passive: true
        }
    );


    /* -----------------------------------------------------
       INITIAL CHECK
       ----------------------------------------------------- */

    checkNearbyElements();

}
/* =========================================================
   08. ACTIVE NAVIGATION
   ========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            '.nav-links a[href^="#"]'
        );


    if (
        !sections.length ||
        !navLinks.length
    ) {
        return;
    }


    if (
        !("IntersectionObserver" in window)
    ) {
        return;
    }


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const currentId =
                            entry.target.id;


                        navLinks.forEach(
                            link => {

                                link.classList.toggle(
                                    "active",
                                    link.getAttribute(
                                        "href"
                                    ) ===
                                    `#${currentId}`
                                );

                            }
                        );

                    }
                );

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(
        section => {

            sectionObserver.observe(
                section
            );

        }
    );

}


/* =========================================================
   09. DYNAMIC IMAGE GALLERY — OPTIMIZED VERSION
   ---------------------------------------------------------
   Automatic gallery discovery without manually listing images.

   Put photos inside:

   assets/gallery/

   Naming:

   gallery-01.jpg
   gallery-02.jpg
   gallery-03.jpg
   ...

   Features:
   - No HTML editing required
   - No JSON/manifest required
   - No 500 simultaneous requests
   - Progressive discovery
   - Mobile/iPhone friendly
   - Load More support
   - View All support
   - Lightbox
   - Touch swipe
   ========================================================= */

function initGallery() {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const galleryGrid =
        document.getElementById("galleryGrid");

    const galleryCount =
        document.getElementById("galleryCount");

    const galleryLoadMore =
        document.getElementById("galleryLoadMore");

    const galleryLoadMoreWrap =
        document.getElementById("galleryLoadMoreWrap");

    const galleryEmpty =
        document.getElementById("galleryEmpty");

    const galleryViewAll =
        document.getElementById("galleryViewAll");


    /* =====================================================
       LIGHTBOX ELEMENTS
       ===================================================== */

    const lightbox =
        document.getElementById("galleryLightbox");

    const lightboxImage =
        document.getElementById("galleryLightboxImage");

    const lightboxClose =
        document.getElementById("galleryLightboxClose");

    const lightboxPrev =
        document.getElementById("galleryLightboxPrev");

    const lightboxNext =
        document.getElementById("galleryLightboxNext");

    const lightboxCounter =
        document.getElementById("galleryLightboxCounter");


    /* =====================================================
       SAFETY CHECK
       ===================================================== */

    if (!galleryGrid) {
        return;
    }


    /* =====================================================
       SETTINGS
       ===================================================== */

    const GALLERY_FOLDER =
        "assets/gallery/";

    const GALLERY_PREFIX =
        "gallery-";

    const GALLERY_EXTENSION =
        ".jpg";


    /*
     * Number of images checked in one batch.
     *
     * IMPORTANT:
     * We no longer check hundreds of images at once.
     */

    const BATCH_SIZE = 15;


    /*
     * Maximum possible image number.
     *
     * This is only a safety limit.
     *
     * It does NOT create 500 requests at once.
     */

    const MAX_IMAGES = 500;


    /*
     * How many missing files in a row
     * should make us assume the gallery has ended.
     *
     * Example:
     *
     * gallery-01 → exists
     * gallery-02 → exists
     * gallery-03 → exists
     * gallery-04 → missing
     * gallery-05 → missing
     * gallery-06 → missing
     *
     * We don't need to continue forever.
     */

    const CONSECUTIVE_MISSING_LIMIT = 15;


    /*
     * Number visible initially.
     */

    const INITIAL_VISIBLE = 12;


    /*
     * Number added when Load More is clicked.
     */

    const LOAD_MORE_AMOUNT = 12;


    /* =====================================================
       STATE
       ===================================================== */

    let galleryImages = [];

    let visibleCount = INITIAL_VISIBLE;

    let currentLightboxIndex = 0;

    let nextImageNumber = 1;

    let consecutiveMissing = 0;

    let discoveryFinished = false;

    let discoveryRunning = false;


    /* =====================================================
       CREATE IMAGE PATH
       ===================================================== */

    function getImagePath(number) {

        return (
            GALLERY_FOLDER +
            GALLERY_PREFIX +
            String(number).padStart(2, "0") +
            GALLERY_EXTENSION
        );

    }


    /* =====================================================
       CHECK ONE IMAGE
       ===================================================== */

    function checkImage(src) {

        return new Promise(resolve => {

            const image = new Image();

            let completed = false;


            function finish(exists) {

                if (completed) {
                    return;
                }

                completed = true;

                resolve({
                    exists,
                    src
                });

            }


            image.onload = () => {
                finish(true);
            };


            image.onerror = () => {
                finish(false);
            };


            image.src = src;

        });

    }


    /* =====================================================
       UPDATE GALLERY COUNT
       ===================================================== */

    function updateGalleryCount() {

        if (!galleryCount) {
            return;
        }

        galleryCount.textContent =
            galleryImages.length;

    }


    /* =====================================================
       CREATE GALLERY CARD
       ===================================================== */

    function createGalleryCard(image, index) {

        const card =
            document.createElement("button");


        card.type = "button";


        card.className =
            "gallery-card";


        card.setAttribute(
            "aria-label",
            `View gallery photo ${index + 1}`
        );


        /* -------------------------------------------------
           IMAGE
           ------------------------------------------------- */

        const imageElement =
            document.createElement("img");


        imageElement.src =
            image.src;


        imageElement.alt =
            `যুক্তি দেখাই gallery photo ${index + 1}`;


        /*
         * Browser handles the actual loading.
         *
         * We don't force every image to load immediately.
         */

        imageElement.loading = "lazy";

        imageElement.decoding = "async";


        /* -------------------------------------------------
           OVERLAY
           ------------------------------------------------- */

        const overlay =
            document.createElement("span");


        overlay.className =
            "gallery-card-overlay";


        /* -------------------------------------------------
           NUMBER
           ------------------------------------------------- */

        const number =
            document.createElement("span");


        number.className =
            "gallery-card-number";


        number.textContent =
            String(index + 1).padStart(2, "0");


        /* -------------------------------------------------
           VIEW LABEL
           ------------------------------------------------- */

        const view =
            document.createElement("span");


        view.className =
            "gallery-card-view";


        view.textContent =
            "VIEW";


        /* -------------------------------------------------
           BUILD
           ------------------------------------------------- */

        overlay.appendChild(number);

        overlay.appendChild(view);

        card.appendChild(imageElement);

        card.appendChild(overlay);


        /* -------------------------------------------------
           LIGHTBOX
           ------------------------------------------------- */

        card.addEventListener("click", () => {

            openLightbox(index);

        });


        return card;

    }


    /* =====================================================
       RENDER GALLERY
       ===================================================== */

    function renderGallery() {

        galleryGrid.innerHTML = "";


        const imagesToShow =
            galleryImages.slice(
                0,
                visibleCount
            );


        imagesToShow.forEach(
            (image, index) => {

                galleryGrid.appendChild(
                    createGalleryCard(
                        image,
                        index
                    )
                );

            }
        );


        updateGalleryCount();


        /* -------------------------------------------------
           EMPTY STATE
           ------------------------------------------------- */

        if (
            galleryImages.length === 0 &&
            discoveryFinished
        ) {

            galleryGrid.hidden = true;


            if (galleryEmpty) {
                galleryEmpty.hidden = false;
            }

        } else {

            galleryGrid.hidden = false;


            if (galleryEmpty) {
                galleryEmpty.hidden = true;
            }

        }


        /* -------------------------------------------------
           LOAD MORE
           ------------------------------------------------- */

        if (galleryLoadMoreWrap) {

            /*
             * Hide Load More when:
             *
             * - all currently discovered images are visible
             * AND
             * - discovery has finished
             */

            if (
                discoveryFinished &&
                visibleCount >= galleryImages.length
            ) {

                galleryLoadMoreWrap.hidden = true;

            } else {

                galleryLoadMoreWrap.hidden = false;

            }

        }


        /* -------------------------------------------------
           VIEW ALL
           ------------------------------------------------- */

        if (galleryViewAll) {

            galleryViewAll.hidden =
                galleryImages.length === 0;

        }

    }


    /* =====================================================
       ADD NEW DISCOVERED IMAGE
       ===================================================== */

    function addDiscoveredImage(src, number) {

        /*
         * Prevent duplicates.
         */

        const alreadyExists =
            galleryImages.some(
                image =>
                    image.src === src
            );


        if (alreadyExists) {
            return;
        }


        galleryImages.push({

            number: number,

            src: src

        });


        /*
         * If the gallery was previously empty,
         * immediately show the first image.
         */

        if (galleryImages.length === 1) {

            visibleCount =
                Math.min(
                    INITIAL_VISIBLE,
                    galleryImages.length
                );

            renderGallery();

        }


        /*
         * If more images are discovered while
         * the user already has the gallery open,
         * update the count without aggressively
         * rebuilding the page.
         */

        updateGalleryCount();

    }


    /* =====================================================
       PROGRESSIVE IMAGE DISCOVERY
       ===================================================== */

    async function discoverNextBatch() {

        /*
         * Prevent duplicate discovery loops.
         */

        if (
            discoveryRunning ||
            discoveryFinished
        ) {

            return;

        }


        discoveryRunning = true;


        try {

            const checks = [];


            /*
             * Create only a SMALL number of requests.
             */

            for (
                let i = 0;
                i < BATCH_SIZE &&
                nextImageNumber <= MAX_IMAGES;
                i++
            ) {

                const number =
                    nextImageNumber++;


                checks.push({

                    number,

                    promise:
                        checkImage(
                            getImagePath(
                                number
                            )
                        )

                });

            }


            /*
             * Wait only for this small batch.
             */

            const results =
                await Promise.all(
                    checks.map(
                        item =>
                            item.promise.then(
                                result => ({
                                    ...result,
                                    number:
                                        item.number
                                })
                            )
                    )
                );


            /*
             * Process results.
             */

            results.forEach(result => {

                if (result.exists) {

                    consecutiveMissing = 0;


                    addDiscoveredImage(
                        result.src,
                        result.number
                    );

                } else {

                    consecutiveMissing++;

                }

            });


            /*
             * Stop if enough consecutive
             * images are missing.
             *
             * This prevents endless searching.
             */

            if (
                consecutiveMissing >=
                CONSECUTIVE_MISSING_LIMIT
            ) {

                discoveryFinished = true;

            }


            /*
             * Stop at hard safety limit.
             */

            if (
                nextImageNumber >
                MAX_IMAGES
            ) {

                discoveryFinished = true;

            }


            /*
             * Update UI.
             */

            renderGallery();


            /*
             * Continue in the background.
             *
             * setTimeout gives the browser time
             * to render/paint between batches.
             */

            if (!discoveryFinished) {

                setTimeout(
                    () => {

                        discoveryRunning = false;

                        discoverNextBatch();

                    },
                    100
                );

                return;

            }

        } catch (error) {

            console.warn(
                "KCYF Gallery discovery error:",
                error
            );

            discoveryFinished = true;

        }


        discoveryRunning = false;


        renderGallery();


        console.log(
            "KCYF Gallery:",
            galleryImages.length,
            "images found."
        );

    }


    /* =====================================================
       LOAD MORE
       ===================================================== */

    if (galleryLoadMore) {

        galleryLoadMore.addEventListener(
            "click",
            () => {

                visibleCount +=
                    LOAD_MORE_AMOUNT;


                visibleCount =
                    Math.min(
                        visibleCount,
                        galleryImages.length
                    );


                renderGallery();


                /*
                 * If the user has reached all currently
                 * discovered photos and discovery is still
                 * running, continue discovering.
                 */

                if (
                    !discoveryFinished &&
                    visibleCount >=
                        galleryImages.length
                ) {

                    discoverNextBatch();

                }

            }
        );

    }


    /* =====================================================
       VIEW ALL
       ===================================================== */

    if (galleryViewAll) {

        galleryViewAll.addEventListener(
            "click",
            () => {

                visibleCount =
                    galleryImages.length;


                renderGallery();


                galleryGrid.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });


                /*
                 * Continue discovering more images
                 * if the scanner hasn't finished.
                 */

                if (!discoveryFinished) {

                    discoverNextBatch();

                }

            }
        );

    }


    /* =====================================================
       LIGHTBOX
       ===================================================== */

    function openLightbox(index) {

        if (
            !lightbox ||
            !lightboxImage ||
            !galleryImages.length
        ) {

            return;

        }


        currentLightboxIndex =
            index;


        updateLightbox();


        lightbox.classList.add(
            "is-open"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "gallery-lightbox-open"
        );

    }


    /* =====================================================
       UPDATE LIGHTBOX
       ===================================================== */

    function updateLightbox() {

        if (
            !galleryImages.length ||
            !lightboxImage
        ) {

            return;

        }


        const image =
            galleryImages[
                currentLightboxIndex
            ];


        if (!image) {
            return;
        }


        lightboxImage.src =
            image.src;


        lightboxImage.alt =
            `যুক্তি দেখাই gallery photo ${
                currentLightboxIndex + 1
            }`;


        if (lightboxCounter) {

            lightboxCounter.textContent =
                `${String(
                    currentLightboxIndex + 1
                ).padStart(2, "0")} / ${
                    String(
                        galleryImages.length
                    ).padStart(2, "0")
                }`;

        }

    }


    /* =====================================================
       CLOSE LIGHTBOX
       ===================================================== */

    function closeLightbox() {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove(
            "is-open"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "gallery-lightbox-open"
        );

    }


    /* =====================================================
       CLOSE BUTTON
       ===================================================== */

    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    /* =====================================================
       NEXT
       ===================================================== */

    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            () => {

                if (
                    !galleryImages.length
                ) {

                    return;

                }


                currentLightboxIndex =
                    (
                        currentLightboxIndex +
                        1
                    ) %
                    galleryImages.length;


                updateLightbox();

            }
        );

    }


    /* =====================================================
       PREVIOUS
       ===================================================== */

    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            () => {

                if (
                    !galleryImages.length
                ) {

                    return;

                }


                currentLightboxIndex =
                    (
                        currentLightboxIndex -
                        1 +
                        galleryImages.length
                    ) %
                    galleryImages.length;


                updateLightbox();

            }
        );

    }


    /* =====================================================
       BACKDROP CLOSE
       ===================================================== */

    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target === lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* =====================================================
       KEYBOARD CONTROLS
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox ||
                !lightbox.classList.contains(
                    "is-open"
                )
            ) {

                return;

            }


            if (
                event.key === "Escape"
            ) {

                closeLightbox();

            }


            if (
                event.key === "ArrowRight"
            ) {

                if (lightboxNext) {
                    lightboxNext.click();
                }

            }


            if (
                event.key === "ArrowLeft"
            ) {

                if (lightboxPrev) {
                    lightboxPrev.click();
                }

            }

        }
    );


    /* =====================================================
       TOUCH SWIPE
       ===================================================== */

    let touchStartX = 0;

    let touchEndX = 0;


    if (lightbox) {

        lightbox.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.changedTouches[0]
                        .screenX;

            },
            {
                passive: true
            }
        );


        lightbox.addEventListener(
            "touchend",
            event => {

                touchEndX =
                    event.changedTouches[0]
                        .screenX;


                const difference =
                    touchStartX -
                    touchEndX;


                if (
                    Math.abs(difference) < 50
                ) {

                    return;

                }


                if (
                    difference > 0
                ) {

                    if (lightboxNext) {
                        lightboxNext.click();
                    }

                } else {

                    if (lightboxPrev) {
                        lightboxPrev.click();
                    }

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       INITIAL GALLERY STATE
       ===================================================== */

    galleryGrid.setAttribute(
        "aria-busy",
        "true"
    );


    if (galleryEmpty) {
        galleryEmpty.hidden = true;
    }


    if (galleryLoadMoreWrap) {
        galleryLoadMoreWrap.hidden = true;
    }


    if (galleryViewAll) {
        galleryViewAll.hidden = true;
    }


    /*
     * Start discovery AFTER the browser gets a chance
     * to render the main page.
     *
     * This is particularly helpful on mobile Safari.
     */

    requestAnimationFrame(() => {

        setTimeout(() => {

            galleryGrid.removeAttribute(
                "aria-busy"
            );

            discoverNextBatch();

        }, 150);

    });

}

/* =========================================================
   11. MOBILE BODY SCROLL CONTROL
   ========================================================= */

(function addMobileMenuStyle() {

    const style =
        document.createElement(
            "style"
        );


    style.textContent = `

        @media (max-width: 900px) {

            body.menu-open {
                overflow: hidden;
            }

        }

    `;


    document.head.appendChild(
        style
    );

})();


/* =========================================================
   12. CONSOLE BRANDING
   ========================================================= */

console.log(
    "%cKCYF যুক্তি দেখাই — Public Speaking Competition 2026",
    "font-size: 16px; font-weight: 700;"
);


console.log(
    "%cভাবুন। যুক্তি দিন। প্রকাশ করুন।",
    "font-size: 13px;"
);

/* =========================================================
   13. OFFICIAL ANNOUNCEMENTS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const announcementsList =
        document.getElementById("announcementsList");

    const announcementsEmpty =
        document.getElementById("announcementsEmpty");


    // -------------------------------------------------------
    // Check whether announcements exist
    // -------------------------------------------------------

    if (!announcementsList || !announcementsEmpty) {
        return;
    }


    const updateAnnouncementState = () => {

        const announcements =
            announcementsList.querySelectorAll(
                ".announcement-item"
            );


        if (announcements.length > 0) {

            announcementsEmpty.style.display = "none";

        } else {

            announcementsEmpty.style.display = "flex";

        }

    };


    // -------------------------------------------------------
    // Initial state
    // -------------------------------------------------------

    updateAnnouncementState();


    // -------------------------------------------------------
    // Watch for dynamically added announcements
    // -------------------------------------------------------

    const announcementObserver =
        new MutationObserver(() => {

            updateAnnouncementState();

        });


    announcementObserver.observe(
        announcementsList,
        {
            childList: true,
            subtree: true
        }
    );

});


/* =========================================================
   END — 13. OFFICIAL ANNOUNCEMENTS
   ========================================================= */
   /* =========================================================
   14. PRIZE SHOWCASE
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {

    const prizeGrid =
        document.getElementById("prizeShowcaseGrid");

    const prizeEmpty =
        document.getElementById("prizeShowcaseEmpty");


    // -------------------------------------------------------
    // Safety check
    // -------------------------------------------------------

    if (!prizeGrid || !prizeEmpty) {
        return;
    }


    // -------------------------------------------------------
    // Update showcase visibility
    // -------------------------------------------------------

    const updatePrizeShowcase = () => {

        const prizeImages =
            prizeGrid.querySelectorAll(
                ".prize-showcase-item"
            );


        if (prizeImages.length > 0) {

            prizeEmpty.style.display = "none";

        } else {

            prizeEmpty.style.display = "flex";

        }

    };


    // -------------------------------------------------------
    // Initial state
    // -------------------------------------------------------

    updatePrizeShowcase();


    // -------------------------------------------------------
    // Watch for newly added prize images
    // -------------------------------------------------------

    const prizeObserver =
        new MutationObserver(() => {

            updatePrizeShowcase();

        });


    prizeObserver.observe(
        prizeGrid,
        {
            childList: true,
            subtree: true
        }
    );

});


/* =========================================================
   END — 14. PRIZE SHOWCASE
   ========================================================= */
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

function initScrollReveal() {

    const revealElements =
        document.querySelectorAll(".reveal");


    if (!revealElements.length) {
        return;
    }


    /* -----------------------------------------------------
       SAFETY FALLBACK
       ----------------------------------------------------- */

    if (!("IntersectionObserver" in window)) {

        revealElements.forEach(element => {

            element.classList.add("revealed");

        });

        return;
    }


    /* -----------------------------------------------------
       OBSERVER
       ----------------------------------------------------- */

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    /* -----------------------------------------
                       REVEAL ONCE
                       ----------------------------------------- */

                    entry.target.classList.add(
                        "revealed"
                    );


                    /*
                     * IMPORTANT:
                     * Once revealed, stop observing it.
                     *
                     * This prevents the element from
                     * becoming hidden again when the user
                     * scrolls back upward.
                     */

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                /*
                 * Start animation slightly before
                 * the element reaches the screen.
                 */

                root: null,

                rootMargin:
                    "0px 0px -8% 0px",

                threshold: 0.01
            }
        );


    /* -----------------------------------------------------
       OBSERVE EVERYTHING
       ----------------------------------------------------- */

    revealElements.forEach(element => {

        observer.observe(element);

    });


    /* -----------------------------------------------------
       SAFETY CHECK
       -----------------------------------------------------
       
       If an element is already visible when JS
       initializes, reveal it immediately.
       
       This prevents the "white until scroll"
       problem.
       */

    requestAnimationFrame(() => {

        revealElements.forEach(element => {

            if (
                element.classList.contains(
                    "revealed"
                )
            ) {
                return;
            }


            const rect =
                element.getBoundingClientRect();


            const visible =
                rect.top <
                    window.innerHeight &&
                rect.bottom > 0;


            if (visible) {

                element.classList.add(
                    "revealed"
                );

                observer.unobserve(
                    element
                );

            }

        });

    });

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
   09. DYNAMIC IMAGE GALLERY
   =========================================================

   IMPORTANT:

   Add images to:

   assets/gallery/

   Use:

   gallery-01.jpg
   gallery-02.jpg
   gallery-03.jpg
   ...
   gallery-100.jpg
   gallery-101.jpg
   ...

   No HTML editing is required.

   Missing images are ignored.

   The gallery can support hundreds of images.
   ========================================================= */

function initGallery() {


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const galleryGrid =
        document.getElementById(
            "galleryGrid"
        );


    const galleryCount =
        document.getElementById(
            "galleryCount"
        );


    const galleryLoadMore =
        document.getElementById(
            "galleryLoadMore"
        );


    const galleryLoadMoreWrap =
        document.getElementById(
            "galleryLoadMoreWrap"
        );


    const galleryEmpty =
        document.getElementById(
            "galleryEmpty"
        );


    const galleryViewAll =
        document.getElementById(
            "galleryViewAll"
        );


    /* =====================================================
       LIGHTBOX ELEMENTS
       ===================================================== */

    const lightbox =
        document.getElementById(
            "galleryLightbox"
        );


    const lightboxImage =
        document.getElementById(
            "galleryLightboxImage"
        );


    const lightboxClose =
        document.getElementById(
            "galleryLightboxClose"
        );


    const lightboxPrev =
        document.getElementById(
            "galleryLightboxPrev"
        );


    const lightboxNext =
        document.getElementById(
            "galleryLightboxNext"
        );


    const lightboxCounter =
        document.getElementById(
            "galleryLightboxCounter"
        );


    /* =====================================================
       SAFETY CHECK
       ===================================================== */

    if (
        !galleryGrid
    ) {

        return;

    }


    /* =====================================================
       GALLERY SETTINGS
       ===================================================== */

    const GALLERY_FOLDER =
        "assets/gallery/";


    const GALLERY_PREFIX =
        "gallery-";


    const GALLERY_EXTENSION =
        ".jpg";


    /*
     * Maximum supported gallery images.
     *
     * 500 is more than enough for the event website.
     */

    const MAX_IMAGES =
        500;


    /*
     * Number shown initially.
     */

    const INITIAL_VISIBLE =
        12;


    /*
     * Number added per Load More.
     */

    const LOAD_MORE_AMOUNT =
        12;


    /* =====================================================
       STATE
       ===================================================== */

    let galleryImages = [];


    let visibleCount =
        INITIAL_VISIBLE;


    let currentLightboxIndex =
        0;


    /* =====================================================
       CREATE IMAGE PATH
       ===================================================== */

    function getImagePath(number) {

        return (
            GALLERY_FOLDER +
            GALLERY_PREFIX +
            String(number).padStart(
                2,
                "0"
            ) +
            GALLERY_EXTENSION
        );

    }


    /* =====================================================
       CHECK WHETHER IMAGE EXISTS
       ===================================================== */

    function checkImage(src) {

        return new Promise(
            resolve => {

                const image =
                    new Image();


                image.onload =
                    () => {

                        resolve({
                            exists: true,
                            src: src
                        });

                    };


                image.onerror =
                    () => {

                        resolve({
                            exists: false,
                            src: src
                        });

                    };


                image.src =
                    src;

            }
        );

    }


    /* =====================================================
       FIND AVAILABLE IMAGES
       =====================================================

       The browser cannot directly list files inside
       a folder on a static website.

       Therefore we test the expected filenames.

       Existing images are added.
       Missing images are ignored.

       So there are NEVER blank cards.
       ===================================================== */

    async function discoverImages() {

        const imageChecks = [];


        for (
            let number = 1;
            number <= MAX_IMAGES;
            number++
        ) {

            imageChecks.push(
                checkImage(
                    getImagePath(
                        number
                    )
                )
            );

        }


        const results =
            await Promise.all(
                imageChecks
            );


        return results
            .map(
                (result, index) => {

                    if (
                        !result.exists
                    ) {
                        return null;
                    }


                    return {

                        number:
                            index + 1,

                        src:
                            result.src

                    };

                }
            )
            .filter(Boolean);

    }


    /* =====================================================
       CREATE GALLERY CARD
       ===================================================== */

    function createGalleryCard(
        image,
        index
    ) {

        const card =
            document.createElement(
                "button"
            );


        card.type =
            "button";


        card.className =
            "gallery-card";


        card.setAttribute(
            "aria-label",
            `View gallery photo ${
                index + 1
            }`
        );


        /* -----------------------------------------------
           IMAGE
           ----------------------------------------------- */

        const imageElement =
            document.createElement(
                "img"
            );


        imageElement.src =
            image.src;


        imageElement.alt =
            `যুক্তি দেখাই gallery photo ${
                index + 1
            }`;


        imageElement.loading =
            "lazy";


        imageElement.decoding =
            "async";


        /* -----------------------------------------------
           OVERLAY
           ----------------------------------------------- */

        const overlay =
            document.createElement(
                "span"
            );


        overlay.className =
            "gallery-card-overlay";


        /* -----------------------------------------------
           NUMBER
           ----------------------------------------------- */

        const number =
            document.createElement(
                "span"
            );


        number.className =
            "gallery-card-number";


        number.textContent =
            String(
                index + 1
            ).padStart(
                2,
                "0"
            );


        /* -----------------------------------------------
           VIEW LABEL
           ----------------------------------------------- */

        const view =
            document.createElement(
                "span"
            );


        view.className =
            "gallery-card-view";


        view.textContent =
            "VIEW";


        /* -----------------------------------------------
           BUILD CARD
           ----------------------------------------------- */

        overlay.appendChild(
            number
        );


        overlay.appendChild(
            view
        );


        card.appendChild(
            imageElement
        );


        card.appendChild(
            overlay
        );


        /* -----------------------------------------------
           OPEN LIGHTBOX
           ----------------------------------------------- */

        card.addEventListener(
            "click",
            () => {

                openLightbox(
                    index
                );

            }
        );


        return card;

    }


    /* =====================================================
       RENDER GALLERY
       ===================================================== */

    function renderGallery() {

        galleryGrid.innerHTML =
            "";


        const imagesToShow =
            galleryImages.slice(
                0,
                visibleCount
            );


        imagesToShow.forEach(
            (
                image,
                index
            ) => {

                galleryGrid.appendChild(
                    createGalleryCard(
                        image,
                        index
                    )
                );

            }
        );


        /* -----------------------------------------------
           PHOTO COUNT
           ----------------------------------------------- */

        if (galleryCount) {

            galleryCount.textContent =
                galleryImages.length;

        }


        /* -----------------------------------------------
           LOAD MORE
           ----------------------------------------------- */

        if (
            galleryLoadMoreWrap
        ) {

            galleryLoadMoreWrap.hidden =
                visibleCount >=
                galleryImages.length;

        }

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


                renderGallery();

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

            }
        );

    }


    /* =====================================================
       10. GALLERY LIGHTBOX
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
                ).padStart(
                    2,
                    "0"
                )} / ${String(
                    galleryImages.length
                ).padStart(
                    2,
                    "0"
                )}`;

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
       LIGHTBOX CLOSE BUTTON
       ===================================================== */

    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    /* =====================================================
       LIGHTBOX NEXT
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
       LIGHTBOX PREVIOUS
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
       LIGHTBOX BACKDROP
       ===================================================== */

    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* =====================================================
       LIGHTBOX KEYBOARD CONTROLS
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
       LIGHTBOX TOUCH SWIPE
       ===================================================== */

    let touchStartX =
        0;


    let touchEndX =
        0;


    if (lightbox) {

        lightbox.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.changedTouches[
                        0
                    ].screenX;

            },
            {
                passive: true
            }
        );


        lightbox.addEventListener(
            "touchend",
            event => {

                touchEndX =
                    event.changedTouches[
                        0
                    ].screenX;


                const difference =
                    touchStartX -
                    touchEndX;


                if (
                    Math.abs(
                        difference
                    ) < 50
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
       INITIALIZE GALLERY
       ===================================================== */

    async function initializeGallery() {

        galleryGrid.setAttribute(
            "aria-busy",
            "true"
        );


        galleryImages =
            await discoverImages();


        galleryGrid.removeAttribute(
            "aria-busy"
        );


        console.log(
            "KCYF Gallery:",
            galleryImages.length,
            "images found."
        );


        /* -----------------------------------------------
           NO IMAGES
           ----------------------------------------------- */

        if (
            galleryImages.length === 0
        ) {

            galleryGrid.hidden =
                true;


            if (
                galleryLoadMoreWrap
            ) {

                galleryLoadMoreWrap.hidden =
                    true;

            }


            if (
                galleryViewAll
            ) {

                galleryViewAll.hidden =
                    true;

            }


            if (galleryEmpty) {

                galleryEmpty.hidden =
                    false;

            }


            if (galleryCount) {

                galleryCount.textContent =
                    "0";

            }


            return;

        }


        /* -----------------------------------------------
           IMAGES FOUND
           ----------------------------------------------- */

        galleryGrid.hidden =
            false;


        if (galleryEmpty) {

            galleryEmpty.hidden =
                true;

        }


        if (galleryViewAll) {

            galleryViewAll.hidden =
                false;

        }


        visibleCount =
            Math.min(
                INITIAL_VISIBLE,
                galleryImages.length
            );


        renderGallery();

    }


    initializeGallery();

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
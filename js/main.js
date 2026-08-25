/* =========================================================
   UNSCROLLED
   MAIN JAVASCRIPT
========================================================= */



/* =========================================================
   1. FEATURED INFINITE SLIDER
========================================================= */

const sliderTrack = document.getElementById("sliderTrack");
const prevButton = document.getElementById("sliderPrev");
const nextButton = document.getElementById("sliderNext");

if (sliderTrack && prevButton && nextButton) {

    const originalSlides = Array.from(
        sliderTrack.querySelectorAll(".featured-slide")
    );

    const firstClone = originalSlides[0].cloneNode(true);

    const lastClone =
        originalSlides[
            originalSlides.length - 1
        ].cloneNode(true);


    firstClone.classList.add("clone");
    lastClone.classList.add("clone");


    sliderTrack.appendChild(firstClone);

    sliderTrack.insertBefore(
        lastClone,
        originalSlides[0]
    );


    const allSlides =
        sliderTrack.querySelectorAll(".featured-slide");


    let currentSlide = 1;
    let isMoving = false;


    sliderTrack.style.transition = "none";

    sliderTrack.style.transform =
        `translateX(-${currentSlide * 100}%)`;



    /* NEXT */

    nextButton.addEventListener("click", function () {

        if (isMoving) {
            return;
        }

        isMoving = true;

        currentSlide++;

        sliderTrack.style.transition =
            "transform 0.6s ease";

        sliderTrack.style.transform =
            `translateX(-${currentSlide * 100}%)`;

    });



    /* PREVIOUS */

    prevButton.addEventListener("click", function () {

        if (isMoving) {
            return;
        }

        isMoving = true;

        currentSlide--;

        sliderTrack.style.transition =
            "transform 0.6s ease";

        sliderTrack.style.transform =
            `translateX(-${currentSlide * 100}%)`;

    });



    /* INFINITE RESET */

    sliderTrack.addEventListener(
        "transitionend",
        function () {

            isMoving = false;


            if (
                currentSlide ===
                allSlides.length - 1
            ) {

                sliderTrack.style.transition =
                    "none";

                currentSlide = 1;

                sliderTrack.style.transform =
                    `translateX(-${currentSlide * 100}%)`;

            }


            if (currentSlide === 0) {

                sliderTrack.style.transition =
                    "none";

                currentSlide =
                    allSlides.length - 2;

                sliderTrack.style.transform =
                    `translateX(-${currentSlide * 100}%)`;

            }

        }
    );

}



/* =========================================================
   2. SEARCH DATA
========================================================= */

const searchData = [

    {
        title: "Offline",
        type: "category",
        keywords: [
            "offline",
            "phone",
            "digital",
            "screen",
            "scroll",
            "mindfulness"
        ],
        url: "pages/offline.html"
    },

    {
        title: "Wellbeing",
        type: "category",
        keywords: [
            "wellbeing",
            "health",
            "food",
            "movement",
            "sport",
            "mindfulness"
        ],
        url: "pages/wellbeing.html"
    },

    {
        title: "Creative",
        type: "category",
        keywords: [
            "creative",
            "creativity",
            "art",
            "books",
            "hobbies",
            "collections"
        ],
        url: "pages/creative.html"
    },

    {
        title: "About",
        type: "page",
        keywords: [
            "about",
            "doli",
            "unscrolled"
        ],
        url: "about.html"
    },

    {
        title: "Blog post title here",
        type: "post",
        keywords: [
            "blog",
            "post",
            "offline"
        ],
        url: "posts/sample-post.html"
    }

];



/* =========================================================
   3. ROOT PATH
========================================================= */

function getRootPrefix() {

    const path =
        window.location.pathname.toLowerCase();


    if (
        path.includes("/pages/") ||
        path.includes("/posts/") ||
        path.includes("/labels/")
    ) {

        return "../";

    }

    return "";

}


const rootPrefix = getRootPrefix();



/* =========================================================
   4. COMPACT SEARCH
========================================================= */

const searchButton =
    document.querySelector(".search-button");


if (searchButton) {

    /*
       Make navigation the positioning parent
    */

    const navigation =
        searchButton.closest(".main-navigation");


    navigation.style.position = "relative";



    /* SEARCH WRAPPER */

    const searchWrapper =
        document.createElement("div");


    searchWrapper.className =
        "compact-search";


    searchWrapper.innerHTML = `

        <input
            class="compact-search-input"
            type="search"
            placeholder=""
            autocomplete="off"
            aria-label="Search site"
        >

        <div
            class="compact-search-results"
        ></div>

    `;


    navigation.appendChild(
        searchWrapper
    );



    /* =====================================================
       SEARCH CSS
    ====================================================== */

    const style =
        document.createElement("style");


    style.textContent = `

        .compact-search {
            position: absolute;

            top: 50%;
            right: 32px;

            transform:
                translateY(-50%);

            z-index: 100;

            display: flex;
            align-items: center;

            width: 0;

            opacity: 0;

            pointer-events: none;

            transition:
                width 0.25s ease,
                opacity 0.2s ease;
        }


        .compact-search.is-open {
            width: 280px;

            opacity: 1;

            pointer-events: auto;
        }


        .compact-search-input {
            width: 100%;
            height: 28px;

            padding: 0 10px;

            background-color: #F6EADC;

            border: none;

            outline: none;

            font-family:
                "DM Mono",
                monospace;

            font-size: 11px;

            color: #000000;
        }


        .compact-search-results {
            position: absolute;

            top: calc(100% + 6px);
            left: 0;

            width: 100%;

            background-color: #F6EADC;

            box-shadow:
                0 6px 16px rgba(0,0,0,0.08);

            display: none;
        }


        .compact-search-results.has-results {
            display: block;
        }


        .compact-search-result {
            display: block;

            padding: 10px;

            border-bottom:
                1px solid rgba(0,0,0,0.12);

            font-family:
                "DM Mono",
                monospace;

            font-size: 11px;

            color: #000000;

            text-decoration: none;
        }


        .compact-search-result:last-child {
            border-bottom: none;
        }


        .compact-search-result:hover {
            background-color: #DCCBB6;
        }


        .compact-search-empty {
            padding: 10px;

            font-family:
                "DM Mono",
                monospace;

            font-size: 11px;
        }


        @media (max-width: 700px) {

            .compact-search.is-open {
                width: 180px;
            }

        }

    `;


    document.head.appendChild(style);



    const searchInput =
        searchWrapper.querySelector(
            ".compact-search-input"
        );


    const searchResults =
        searchWrapper.querySelector(
            ".compact-search-results"
        );



    /* =====================================================
       OPEN / CLOSE
    ====================================================== */

    searchButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            const isOpen =
                searchWrapper.classList.contains(
                    "is-open"
                );


            if (isOpen) {

                closeCompactSearch();

            }

            else {

                searchWrapper.classList.add(
                    "is-open"
                );


                setTimeout(
                    function () {

                        searchInput.focus();

                    },
                    150
                );

            }

        }
    );



    function closeCompactSearch() {

        searchWrapper.classList.remove(
            "is-open"
        );


        searchInput.value = "";


        searchResults.innerHTML = "";


        searchResults.classList.remove(
            "has-results"
        );

    }



    /* CLICK OUTSIDE */

    document.addEventListener(
        "click",
        function (event) {

            if (
                !searchWrapper.contains(event.target) &&
                !searchButton.contains(event.target)
            ) {

                closeCompactSearch();

            }

        }
    );



    /* ESC */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeCompactSearch();

            }

        }
    );



    /* =====================================================
       SEARCH
    ====================================================== */

    searchInput.addEventListener(
        "input",
        function () {

            const query =
                searchInput.value
                    .trim()
                    .toLowerCase();


            searchResults.innerHTML = "";


            if (!query) {

                searchResults.classList.remove(
                    "has-results"
                );

                return;

            }



            const matches =
                searchData.filter(
                    function (item) {

                        const searchableText = [

                            item.title,

                            item.type,

                            ...item.keywords

                        ]
                            .join(" ")
                            .toLowerCase();


                        return searchableText.includes(
                            query
                        );

                    }
                );



            searchResults.classList.add(
                "has-results"
            );



            if (matches.length === 0) {

                searchResults.innerHTML = `

                    <div
                        class="compact-search-empty"
                    >
                        no results
                    </div>

                `;

                return;

            }



            matches.forEach(
                function (item) {

                    const result =
                        document.createElement(
                            "a"
                        );


                    result.className =
                        "compact-search-result";


                    result.href =
                        rootPrefix + item.url;


                    result.textContent =
                        item.title;


                    searchResults.appendChild(
                        result
                    );

                }
            );

        }
    );

}



/* =========================================================
   5. LOAD MORE
   Temporary
========================================================= */

const latestLoadMore =
    document.getElementById(
        "latestLoadMore"
    );


if (latestLoadMore) {

    latestLoadMore.addEventListener(
        "click",
        function () {

            console.log(
                "More posts will appear here later."
            );

        }
    );

}
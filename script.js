document.addEventListener("DOMContentLoaded", () => {
    const countdown = document.querySelector("#launch-countdown");
    const themeToggles = document.querySelectorAll(".theme-toggle");
    const searchInput = document.querySelector("#site-search");
    const searchResults = document.querySelector("#search-results");
    const savedTheme = localStorage.getItem("astrex-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    function updateThemeButtons() {
        const isDark = document.body.classList.contains("dark-mode");
        themeToggles.forEach((button) => {
            button.textContent = isDark ? "Light" : "Dark";
            button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
        });
    }

    themeToggles.forEach((button) => {
        button.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem("astrex-theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
            updateThemeButtons();
        });
    });

    updateThemeButtons();

    if (searchInput && searchResults) {
        const searchItems = [
            {
                category: "Mission",
                title: "Nexus I",
                text: "Crewed SFS mission deploying DOJ military satellites and testing thin rockets in orbit.",
                url: "../index.html"
            },
            {
                category: "Build",
                title: "How Rockets Are Built",
                text: "Mission planning, structure, staging, engines, crew checks, and launch readiness.",
                url: "build.html"
            },
            {
                category: "Roadmap",
                title: "SRS 91 Satellite Return",
                text: "Light rocket mission landed successfully and gathered the satellite after launch.",
                url: "roadmap.html"
            },
            {
                category: "Orbit",
                title: "Orbit Notes",
                text: "Apoapsis, periapsis, circularization, thin-rocket stability, and satellite deployment timing.",
                url: "orbit.html"
            },
            {
                category: "Space",
                title: "Astrex Space Goals",
                text: "Satellites, stations, Moon return plans, Mars goals, and Nexus IV target work.",
                url: "space.html"
            },
            {
                category: "News",
                title: "Nexus I Final Tests Set For May 1",
                text: "Launch plans still stand, with final launch tests scheduled for tomorrow, May 1, 2026.",
                url: "news.html"
            },
            {
                category: "News",
                title: "Nexus I Gas Canister Failure",
                text: "A gas canister failure delayed the Nexus I launch target to May 29 at 5:30 PM Eastern.",
                url: "news.html"
            },
            {
                category: "News",
                title: "Nexus I Medium Fuel Tank Issue",
                text: "A medium fuel tank issue may delay the launch, but Astrex hopes the May window holds.",
                url: "news.html"
            },
            {
                category: "News",
                title: "Nexus I Orbit And Engine Test",
                text: "Engine response, orbit insertion behavior, May launch confidence, and flight readiness.",
                url: "news.html"
            },
            {
                category: "Streaming",
                title: "Astrex Streaming",
                text: "ISS live feed, Nexus orbit test launch and landing replay, and future launch footage.",
                url: "streaming.html"
            }
        ];

        function renderResults(query = "") {
            const normalized = query.trim().toLowerCase();
            const matches = searchItems.filter((item) => {
                const haystack = `${item.category} ${item.title} ${item.text}`.toLowerCase();
                return !normalized || haystack.includes(normalized);
            });

            if (!matches.length) {
                searchResults.innerHTML = `<p class="search-empty">No Astrex results found for "${query}".</p>`;
                return;
            }

            searchResults.innerHTML = matches.map((item) => `
                <a class="search-result" href="${item.url}">
                    <span>${item.category}</span>
                    <strong>${item.title}</strong>
                    <p>${item.text}</p>
                </a>
            `).join("");
        }

        searchInput.addEventListener("input", () => renderResults(searchInput.value));
        renderResults();
    }

    if (!countdown) {
        return;
    }

    const launchDate = new Date("2026-05-29T17:30:00-04:00");

    function renderCountdown() {
        const now = new Date();
        const remaining = launchDate - now;

        if (remaining <= 0) {
            countdown.innerHTML = "<span><b>Launch</b> Window Open</span>";
            countdown.classList.add("launched");
            return;
        }

        const seconds = Math.floor(remaining / 1000);
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        countdown.innerHTML = `
            <span><b>${days}</b> Days</span>
            <span><b>${hours}</b> Hours</span>
            <span><b>${minutes}</b> Minutes</span>
            <span><b>${secs}</b> Seconds</span>
        `;
    }

    renderCountdown();
    setInterval(renderCountdown, 1000);
});

document.addEventListener("DOMContentLoaded", () => {
    const countdown = document.querySelector("#launch-countdown");

    if (!countdown) {
        return;
    }

    const launchDate = new Date("2026-05-24T17:30:00-04:00");

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

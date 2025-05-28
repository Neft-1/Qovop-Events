document.addEventListener("DOMContentLoaded", () => {
    const menuButtons = document.querySelectorAll(".menu-item");
    const sections = document.querySelectorAll(".content");
    const headContainer = document.querySelector(".headcontainer");
    const main = document.querySelector("main");
    const h1 = document.querySelector("h1");
    const logo = document.querySelector(".logo"); // <- ajouté
    let h1Clone = h1.cloneNode(true); // Pour le réinsérer plus tard

    let isActivated = false;
    let currentSectionId = null;

    // Fonction pour ajuster dynamiquement le padding-top de <main>
    function adjustMainPadding() {
        const header = document.querySelector("header");
        const headerHeight = header.offsetHeight;
        main.style.paddingTop = `${headerHeight}px`;
    }

    const observer = new MutationObserver(adjustMainPadding);
    observer.observe(headContainer, {
        childList: true,
        subtree: true
    });

    window.addEventListener("resize", adjustMainPadding);
    adjustMainPadding();

    menuButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-target");
            const targetSection = document.getElementById(targetId);

            // Clic sur le même bouton = retour accueil
            if (isActivated && targetId === currentSectionId) {
                document.body.classList.remove("active");
                currentSectionId = null;
                isActivated = false;

                menuButtons.forEach(btn => btn.classList.remove("active-button"));

                if (!document.querySelector("h1")) {
                    headContainer.insertBefore(h1Clone, headContainer.querySelector("nav"));
                    h1Clone = h1Clone.cloneNode(true);
                }

                sections.forEach(section => {
                    section.classList.remove("visible");
                    setTimeout(() => {
                        section.style.display = "none";
                    }, 300);
                });

                return;
            }

            if (!isActivated) {
                document.body.classList.add("active");
                isActivated = true;
            }

            currentSectionId = targetId;

            const h1Element = document.querySelector("h1");
            if (h1Element) {
                h1Element.remove();
            }

            menuButtons.forEach(btn => {
                if (btn === button) {
                    btn.classList.add("active-button");
                } else {
                    btn.classList.remove("active-button");
                }
            });

            sections.forEach(section => {
                if (section.id !== targetId) {
                    section.classList.remove("visible");
                    setTimeout(() => {
                        section.style.display = "none";
                    }, 300);
                }
            });

            setTimeout(() => {
                targetSection.style.display = "block";
                requestAnimationFrame(() => {
                    targetSection.classList.add("visible");
                });
            }, 300);
        });
    });

    // Clique sur le logo = retour à l'accueil si une section est visible
    logo.addEventListener("click", () => {
        if (!isActivated) return;

        document.body.classList.remove("active");
        currentSectionId = null;
        isActivated = false;

        menuButtons.forEach(btn => btn.classList.remove("active-button"));

        if (!document.querySelector("h1")) {
            headContainer.insertBefore(h1Clone, headContainer.querySelector("nav"));
            h1Clone = h1Clone.cloneNode(true);
        }

        sections.forEach(section => {
            section.classList.remove("visible");
            setTimeout(() => {
                section.style.display = "none";
            }, 300);
        });
    });
});
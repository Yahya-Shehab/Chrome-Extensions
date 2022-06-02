function removeInjectionAmazon() {
    try {
        document.querySelector('html').removeChild(document.querySelector(".darkThemeInject"));
    } catch (e) {
    }
}
removeInjectionAmazon();
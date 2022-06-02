function removeInjectionGoogle() {
    try {
        document.querySelector('html').removeChild(document.querySelector(".darkThemeInject"));
    } catch (e) {
    }
}
removeInjectionGoogle();
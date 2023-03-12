const loadingProgressBar = (setCount, file) => (
    setInterval(() => {
        setCount((oldProgress) => {
            if (!file.length && oldProgress === 100) {
                return 0;
            } else if (100 >= oldProgress) {
                return Math.trunc(Math.min(oldProgress + Math.random() * 10, 100));
            }
        });
    }, 400)
)

export default loadingProgressBar;
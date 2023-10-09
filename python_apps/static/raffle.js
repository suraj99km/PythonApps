document.addEventListener('DOMContentLoaded', function () {
    const reels = document.querySelectorAll('.');
    const spinButton = document.getElementById('spin-button');

    // Characters to display on the reels
    const characters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    // Function to simulate spinning of a single reel
    function spinReel(reel) {
        let currentIndex = 0;
        const maxIndex = characters.length - 1;
        const interval = setInterval(() => {
            reel.textContent = characters[currentIndex];
            currentIndex++;
            if (currentIndex > maxIndex) {
                currentIndex = 0;
            }
        }, 100); // Adjust the duration for your desired spinning speed

        // Simulate stopping after a random time (adjust for realistic effect)
        setTimeout(() => {
            clearInterval(interval);
        }, 1000); // Adjust the duration for stopping
    }

    // Function to spin all reels
    function spinAllReels() {
        reels.forEach((reel, index) => {
            setTimeout(() => {
                spinReel(reel);
            }, index * 200); // Delay each reel spin for a smooth effect
        });
    }

    // Event listener for the Spin button
    spinButton.addEventListener('click', () => {
        // Simulate AJAX request to get a random code from Django backend
        // Replace this with your actual AJAX call
        const randomCode = 'G01392010'; // Replace with the actual response

        // Split the code into individual characters and update the reels
        const codeCharacters = randomCode.split('');
        reels.forEach((reel, index) => {
            reel.textContent = codeCharacters[index];
        });

        // Start spinning animation
        spinAllReels();
    });
});

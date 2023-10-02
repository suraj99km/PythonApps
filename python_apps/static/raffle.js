// slotmachine.js
document.addEventListener("DOMContentLoaded", function () {
    // Get the selected string from the data attribute
    var slotMachineElement = document.getElementById("slot-machine");
    var selectedString = slotMachineElement.getAttribute("data-selected-string");

    // Function to update the slot machine reels
    function updateReels() {
        var reels = document.querySelectorAll('.symbol');
        var index = 0;
        
        function updateSymbol() {
            if (index < selectedString.length) {
                reels[index].textContent = selectedString[index];
                index++;
                setTimeout(updateSymbol, 500); // Adjust the delay as needed
            }
        }
        
        updateSymbol();
    }

    // Event listener for the "Spin" button
    var spinButton = document.getElementById("spin-button");
    spinButton.addEventListener("click", function () {
        updateReels();
    });
});

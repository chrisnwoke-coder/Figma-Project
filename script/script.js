
/*carousel*/
function InitCarousel() {
    let isDragging = false;
    let startX;
    let scrollLeft

    const dragStop = (elem) => {
        isDragging = false; // Stop dragging
        elem.classList.remove("dragging");
    };

    const dragging = (elem) => {
        if (!isDragging) return;
        const x = window.event.pageX || window.event.touches[0].pageX; // Get current mouse/touch position
        const walk = (x - startX) * 2; // Calculate distance moved
        elem.scrollLeft = scrollLeft - walk; // Update scroll position

        console.log(x)
        console.log(walk)
    };

    function scrollElem(parent_carousel, direction = "right"){
        const carousel = parent_carousel.querySelector('[data-carousel]');
        const clientWidth = carousel.clientWidth;
        parent_carousel.scrollLeft += direction === "left" ? -clientWidth : clientWidth;

    }


    const allCarouselParent = document.querySelectorAll("[data-carousel-parent-elem]");

    

    allCarouselParent.forEach(elem => {
        const carouselArrows = document.querySelectorAll(`[data-carousel-parent="#${elem.id}"]`);
        const parent_carousel = elem;
        const carousel = parent_carousel.querySelector('[data-carousel]');

        
        parent_carousel.addEventListener("mousedown", (event) => {
            isDragging = true;
            startX = event.pageX; 
            scrollLeft = parent_carousel.scrollLeft;
            parent_carousel.style.cursor = "grab";
        });
        parent_carousel.addEventListener("mousemove", function (){
            dragging(parent_carousel);
        });
        document.addEventListener("mouseup", function (){
            dragStop(parent_carousel);
            parent_carousel.style.cursor = "";

        });

        carouselArrows.forEach(function(_arrow){
            // Initialize ResizeObserver

            const resizeObserver = new ResizeObserver(() => {

                const direction = _arrow.dataset.carouselArrow;
                // Update scroll on arrow click
                _arrow.addEventListener("click", function() {
                    scrollElem(parent_carousel, direction);
                });
            });
            resizeObserver.observe(carousel);


        })

        

    });

    
}

InitCarousel();


/*Graph*/

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line', // Chart type
    data: {
        labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        datasets: [{
            label: '2Task',
            data: [1, 2, 1.1, 2.2, 1.5, 2, 1.9], // Data points
            borderColor: 'black', // Change line color to black
            backgroundColor: 'rgba(76, 175, 80, 0.2)', // Semi-transparent background
            borderWidth: 2,
            pointRadius: 6, // Normal point size
            pointBackgroundColor: '#546FFF', // Change point background color
            pointBorderColor: 'white', // Point border color
            pointHoverRadius: 8, // Increased size on hover
            tension: 0.4, // Curved segments for a smoother line
            fill: true // Fill the area under the line
        }]
    },
    options: {
        responsive: true, // Make the chart responsive
        maintainAspectRatio: false, // Allow height and width to adjust
        scales: {
            y: {
                beginAtZero: false, // Disable starting at zero
                min: 1, // Start from 1
                max: 3, // Maximum value
                ticks: {
                    font: {
                        size: 12,
                        weight: 'bold',
                        family: 'Plus Jakarta Sans'
                    },
                    stepSize: 1, // Step size for ticks
                    callback: function(value) {
                        return Math.round(value); // Round values for display
                    }
                },
                grid: {
                    display: false // Disable horizontal grid lines
                }
            },
            x: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)', // Light vertical grid lines
                    lineWidth: 1 // Line width for better visibility
                },
                ticks: {
                    font: {
                        size: 12,
                        weight: 'bold',
                        family: 'Plus Jakarta Sans'
                    }
                }
            }
        },
        plugins: {
            tooltip: {
                enabled: true, // Enable tooltips
                backgroundColor: 'rgba(255, 255, 255, 0.9)', // Tooltip background
                titleColor: 'black',
                bodyColor: 'black',
                borderColor: 'black', // Tooltip border color to match line color
                borderWidth: 1,
                caretSize: 5,
                padding: 10, // Add some padding inside the tooltip
                displayColors: false // Hide color box in tooltip
            },
            afterDatasetsDraw: function(chart) {
                const ctx = chart.ctx;
                const dataset = chart.data.datasets[0];
                
                ctx.save();
                ctx.font = 'bold 12px "Plus Jakarta Sans"';
                ctx.fillStyle = 'black'; // Color of the label text

                dataset.data.forEach((value, index) => {
                    if (dataset.pointBorderColor[index] !== 'transparent') {
                        const x = chart.getDatasetMeta(0).data[index].x;
                        const y = chart.getDatasetMeta(0).data[index].y - 10; // Position the label above the point
                        ctx.fillText(value.toFixed(1), x, y); // Display actual data values
                    }
                });

                ctx.restore();
            }
        }
    }
});


/*progress bar */
function createProgressBar(progressContainerId) {
    const progressContainer = document.getElementById(progressContainerId);
    const progressBar = progressContainer.querySelector('.progress-bar');
    const progressIndicator = progressContainer.querySelector('.progress-indicator');
    const progressText = progressContainer.querySelector('.progress-bar-parag p'); // Select the progress text

    // Function to update the progress bar based on the percentage value
    function updateProgressBar(percentage) {
        percentage = Math.min(Math.max(0, percentage), 100); // Clamp the value between 0 and 100
        progressBar.style.width = percentage + '%';
        progressIndicator.style.left = percentage + '%';
        progressText.textContent = Math.round(percentage) + '%';
    }

     // Initialize progress from HTML content
     const initialPercentage = parseInt(progressText.textContent, 10);
     updateProgressBar(initialPercentage); // Set initial progress based on the HTML

    // Expose a function to set progress
    return {
        setProgress: updateProgressBar
    };
}

// Create progress bar instances
const progress1 = createProgressBar('progressbar1');
const progress2 = createProgressBar('progressbar2');
const progress3 = createProgressBar('progressbar3');
const progress4 = createProgressBar('progressbar4');
const progress5 = createProgressBar('progressbar5');
const progress6 = createProgressBar('progressbar6');



/*calender*/
        const monthYear = document.getElementById('monthYear');
        const daysContainer = document.getElementById('daysContainer');
        const prevWeekButton = document.getElementById('prevWeek');
        const nextWeekButton = document.getElementById('nextWeek');

        // Start from July 10, 2024
        let currentDate = new Date(2024, 6, 10); // Month is 0-indexed (0 = January)
        let activeDate = localStorage.getItem('activeDate') || null; // Get active date from localStorage

        function renderWeek() {
            // Clear previous days
            daysContainer.innerHTML = '';

            // Update the month and year in the header
            monthYear.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

            // Calculate the start of the week (Sunday)
            const startOfWeek = new Date(currentDate);
            startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Set to previous Sunday

            // Render the days from Sunday to Saturday
            for (let i = 0; i < 7; i++) {
                const dayDiv = document.createElement('div');
                const day = new Date(startOfWeek);
                day.setDate(startOfWeek.getDate() + i);
                dayDiv.classList.add('day');

                // Create and append day name
                const dayNameDiv = document.createElement('div');
                dayNameDiv.classList.add('day-name');
                dayNameDiv.textContent = day.toLocaleString('default', { weekday: 'long' }).charAt(0).toUpperCase();


                // Create and append day date
                const dayDateDiv = document.createElement('div');
                dayDateDiv.classList.add('day-date');
                dayDateDiv.textContent = day.getDate(); // Day number

                // Append day name and date to the day div
                dayDiv.appendChild(dayNameDiv);
                dayDiv.appendChild(dayDateDiv);

                // Add click event to change background color
                dayDiv.addEventListener('click', () => {
                    // Update active date
                    activeDate = day.toDateString(); // Store the selected date
                    localStorage.setItem('activeDate', activeDate); // Save the active date in localStorage
                    // Remove 'active' class from all days
                    document.querySelectorAll('.day').forEach(d => d.classList.remove('active'));
                    // Add 'active' class to the clicked day
                    dayDiv.classList.add('active');
                });

                // Set the active class if it's the active date
                if (activeDate === day.toDateString()) {
                    dayDiv.classList.add('active');
                }

                daysContainer.appendChild(dayDiv);
            }
        }

        // Navigate to the previous week
        prevWeekButton.addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() - 7);
            renderWeek();
        });

        // Navigate to the next week
        nextWeekButton.addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() + 7);
            renderWeek();
        });

        // Initial render
        renderWeek();



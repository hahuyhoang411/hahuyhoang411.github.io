document.addEventListener('DOMContentLoaded', function() {
    const timelineContainer = document.querySelector('.timeline');

    if (timelineContainer) {
        fetch('./data/timeline.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(events => {
                timelineContainer.innerHTML = ''; // Clear existing content
                events.forEach(event => {
                    const timelineItem = document.createElement('div');
                    timelineItem.classList.add('timeline-item');

                    let contentHTML = '';
                    if (event.description) {
                        contentHTML += `<p>${event.description}</p>`;
                    }
                    if (event.descriptionItems && event.descriptionItems.length > 0) {
                        contentHTML += '<ul class="timeline-list">';
                        event.descriptionItems.forEach(item => {
                            contentHTML += `<li>${item}</li>`;
                        });
                        contentHTML += '</ul>';
                    }

                    let imageHTML = '';
                    if (event.image) {
                        imageHTML = `
                            <div class="timeline-images">
                                <img src="${event.image}" alt="${event.altText || event.title}">
                            </div>
                        `;
                    }

                    timelineItem.innerHTML = `
                        <div class="timeline-dot"></div>
                        <div class="timeline-date">${event.date}</div>
                        <div class="timeline-content">
                            <h3>${event.title}</h3>
                            ${contentHTML}
                            ${imageHTML}
                        </div>
                    `;
                    timelineContainer.appendChild(timelineItem);
                });
            })
            .catch(error => {
                console.error('Error fetching or processing timeline data:', error);
                timelineContainer.innerHTML = '<p>Error loading timeline. Please try again later.</p>';
            });
    }
}); 
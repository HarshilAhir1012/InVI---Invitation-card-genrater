// Debug log
console.log('Invitation script loaded');

// Luxurious template style map
const templateStyles = {
    'royal-gold': {
        background: 'linear-gradient(135deg, #f9d423 0%, #ff4e50 100%)',
        color: '#2d1e07',
        accent: '#bfa14c',
        shadow: '0 6px 36px rgba(191,161,76,0.25)',
        border: '2px solid #bfa14c'
    },
    'marble-elegance': {
        background: 'url(https://www.transparenttextures.com/patterns/marble.png), linear-gradient(135deg, #fff 60%, #eaeaea 100%)',
        color: '#222',
        accent: '#b2b2b2',
        shadow: '0 6px 36px rgba(178,178,178,0.18)',
        border: '2px solid #d6d6d6'
    },
    'velvet-night': {
        background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
        color: '#fff',
        accent: '#bb86fc',
        shadow: '0 6px 36px rgba(187,134,252,0.18)',
        border: '2px solid #bb86fc'
    },
    'glass-chic': {
        background: 'rgba(255,255,255,0.45)',
        color: '#222',
        accent: '#6dd5ed',
        shadow: '0 8px 32px 0 rgba(31,38,135,0.15)',
        border: '2px solid #6dd5ed',
        backdrop: true
    },
    'minimalist-black': {
        background: 'linear-gradient(135deg, #232526 0%, #000 100%)',
        color: '#fff',
        accent: '#eee',
        shadow: '0 6px 36px rgba(0,0,0,0.25)',
        border: '2px solid #eee'
    },
    'vibrant-colorful': {
        background: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
        color: '#333',
        accent: '#ff6b6b',
        shadow: '0 6px 36px rgba(255,107,107,0.2)',
        border: '2px solid #ff6b6b'
    },
    'elegant-black': {
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d3436 100%)',
        color: '#fff',
        accent: '#e0e0e0',
        shadow: '0 6px 36px rgba(0,0,0,0.3)',
        border: '2px solid #e0e0e0'
    }
};

// Main function to initialize the invitation generator
function initInvitationGenerator() {
    console.log('Initializing invitation generator...');
    
    // Get DOM elements
    const form = document.getElementById('invitation-form');
    const previewContainer = document.querySelector('.preview-placeholder');
    const templateOptions = document.querySelectorAll('.template-option');
    
    if (!form || !previewContainer || templateOptions.length === 0) {
        console.error('Required elements not found');
        return;
    }
    
    console.log('All required elements found');
    
    let selectedTemplate = 'royal-gold';
    
    // Helper function to debounce rapid updates
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }


    // Handle template selection
    templateOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove selected class from all options
            templateOptions.forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            this.classList.add('selected');
            selectedTemplate = this.getAttribute('data-template');
            generatePreview();
        });
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        generateInvitation();
    });

    // Initialize with default template
    if (templateOptions.length > 0) {
        templateOptions[0].classList.add('selected');
        selectedTemplate = templateOptions[0].getAttribute('data-template');
    }

    // Set up input event listeners
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', debounce(generatePreview, 300));
        input.addEventListener('change', debounce(generatePreview, 300));
    });

    // Generate preview of the invitation
    function generatePreview() {
        console.log('Generating preview...');
        const formData = getFormData();
        const previewHTML = createInvitationHTML(formData);
        previewContainer.innerHTML = previewHTML;
    }

    // Generate final invitation
    function generateInvitation() {
        console.log('Generating final invitation...');
        const formData = getFormData();
        
        // Basic validation
        if (!formData.eventType || !formData.hostName || !formData.eventDate || !formData.eventTime || !formData.venue) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Generate the invitation HTML
        const invitationHTML = createInvitationHTML(formData);
        
        // Replace the preview with the final invitation
        previewContainer.innerHTML = invitationHTML;
        
        // Show success message
        alert('Invitation generated successfully!');
    }

    // Get form data
    function getFormData() {
        return {
            eventType: document.getElementById('event-type').value,
            hostName: document.getElementById('host-name').value,
            eventDate: document.getElementById('event-date').value,
            eventTime: document.getElementById('event-time').value,
            venue: document.getElementById('event-venue').value,
            additionalInfo: document.getElementById('additional-info').value,
            template: selectedTemplate
        };
    }
    
    // Create HTML for the invitation
    function createInvitationHTML(formData) {
        console.log('Creating invitation with data:', formData);
        
        const { 
            eventType, 
            hostName, 
            eventDate, 
            eventTime, 
            venue, 
            additionalInfo, 
            template 
        } = formData;
        
        // Get the style for the selected template, default to royal-gold if not found
        const style = templateStyles[template] || templateStyles['royal-gold'];
        const backdrop = style.backdrop ? 'backdrop-filter: blur(8px);' : '';
        
        // Format date
        const formattedDate = eventDate ? new Date(eventDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        }) : 'Date not specified';
        
        // Format time (12-hour format)
        let formattedTime = eventTime || 'Time not specified';
        if (eventTime) {
            const [hours, minutes] = eventTime.split(':');
            const time = new Date();
            time.setHours(parseInt(hours), parseInt(minutes));
            formattedTime = time.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit', 
                hour12: true 
            });
        }
        
        // Create the invitation HTML
        return `
            <div class="invitation-card" 
                 style="
                     background: ${style.background}; 
                     color: ${style.color}; 
                     border: ${style.border}; 
                     box-shadow: ${style.shadow}; 
                     ${backdrop};
                     padding: 30px;
                     border-radius: 12px;
                     max-width: 500px;
                     margin: 0 auto;
                     font-family: 'Arial', sans-serif;
                     position: relative;
                     overflow: hidden;
                 ">
                <div class="invitation-content" style="text-align: center;">
                    <h2 class="event-type" style="
                        color: ${style.accent}; 
                        margin: 0 0 15px 0;
                        font-size: 2em;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    ">
                        ${eventType || 'Event'}
                    </h2>
                    
                    <div class="divider" style="
                        height: 2px;
                        width: 60px;
                        background: ${style.accent};
                        margin: 0 auto 20px auto;
                    "></div>
                    
                    <p class="host-name" style="
                        font-size: 1.5em;
                        margin: 0 0 20px 0;
                        font-weight: 500;
                    ">
                        Hosted by: ${hostName || 'Host Name'}
                    </p>
                    
                    <div class="event-details" style="
                        text-align: left;
                        margin: 25px 0;
                    ">
                        <div class="detail-item" style="
                            display: flex;
                            align-items: center;
                            margin-bottom: 12px;
                            font-size: 1.1em;
                        ">
                            <i class="fas fa-calendar-alt" style="
                                color: ${style.accent};
                                width: 25px;
                                text-align: center;
                                margin-right: 10px;
                            "></i>
                            <span>${formattedDate}</span>
                        </div>
                        
                        <div class="detail-item" style="
                            display: flex;
                            align-items: center;
                            margin-bottom: 12px;
                            font-size: 1.1em;
                        ">
                            <i class="fas fa-clock" style="
                                color: ${style.accent};
                                width: 25px;
                                text-align: center;
                                margin-right: 10px;
                            "></i>
                            <span>${formattedTime}</span>
                        </div>
                        
                        <div class="detail-item" style="
                            display: flex;
                            align-items: center;
                            margin-bottom: 12px;
                            font-size: 1.1em;
                        ">
                            <i class="fas fa-map-marker-alt" style="
                                color: ${style.accent};
                                width: 25px;
                                text-align: center;
                                margin-right: 10px;
                            "></i>
                            <span>${venue || 'Venue not specified'}</span>
                        </div>
                        
                        ${additionalInfo ? `
                            <div class="additional-info" style="
                                margin-top: 20px;
                                padding-top: 15px;
                                border-top: 1px solid rgba(255,255,255,0.15);
                            ">
                                <p style="margin: 0; font-style: italic;">
                                    ${additionalInfo}
                                </p>
                            </div>` 
                        : ''}
                    </div>
                    
                    <div class="invitation-footer" style="
                        margin-top: 30px;
                        padding-top: 15px;
                        border-top: 1px solid rgba(255,255,255,0.1);
                        font-size: 0.8em;
                        opacity: 0.8;
                    ">
                        Created with ❤️ using InVI
                    </div>
                </div>
            </div>
        `;
    }
    
    // Generate initial preview
    generatePreview();
}

// Start the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initInvitationGenerator);

// Debug function to check if elements exist
function checkElements() {
    console.log('Checking required elements...');
    console.log('Form:', document.getElementById('invitation-form'));
    console.log('Preview container:', document.querySelector('.preview-placeholder'));
    console.log('Template options:', document.querySelectorAll('.template-option').length);
}

// Run element check after a short delay to ensure DOM is ready
setTimeout(checkElements, 1000);
        accent: '#e0e0e0',
        shadow: '0 6px 36px rgba(0,0,0,0.3)',
        border: '2px solid #e0e0e0'
    }
};

// Main function to initialize the invitation generator
function initInvitationGenerator() {
    console.log('Initializing invitation generator...');
    
    // Get DOM elements
    const form = document.getElementById('invitation-form');
    const previewContainer = document.querySelector('.preview-placeholder');
    const templateOptions = document.querySelectorAll('.template-option');
    
    if (!form || !previewContainer || templateOptions.length === 0) {
        console.error('Required elements not found');
        return;
    }
    
    console.log('All required elements found');
    
    let selectedTemplate = 'royal-gold';
    
    // Helper function to debounce rapid updates
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    // Handle template selection
    templateOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove selected class from all options
            templateOptions.forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            this.classList.add('selected');
            selectedTemplate = this.getAttribute('data-template');
            generatePreview();
        });
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');
        generateInvitation();
    });
    
    // Initialize with default template
    if (templateOptions.length > 0) {
        templateOptions[0].classList.add('selected');
        selectedTemplate = templateOptions[0].getAttribute('data-template');
        console.log('Initial template set to:', selectedTemplate);
    }

    // Add input event listeners for live preview
    function setupFormListeners() {
        const formInputs = form.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            // Remove existing listeners to avoid duplicates
            input.removeEventListener('input', handleInput);
            input.removeEventListener('change', handleInput);
            
            // Add new listeners
            input.addEventListener('input', handleInput);
            input.addEventListener('change', handleInput);
        });
    }
    
    function handleInput() {
        debounce(generatePreview, 300)();
    }
    
    // Initial setup of form listeners
    setupFormListeners();
    
    // Also update preview when template changes
    const templateRadios = document.querySelectorAll('input[name="template"]');
    templateRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            selectedTemplate = radio.value;
            generatePreview();
        });
    });

    // Generate preview of the invitation
    function generatePreview() {
        console.log('Generating preview...');
        const formData = getFormData();
        console.log('Form data:', formData);
        
        const previewHTML = createInvitationHTML(formData);
        console.log('Generated HTML:', previewHTML);
        
        // Update the preview container
        const previewPlaceholder = document.querySelector('.preview-placeholder');
        if (previewPlaceholder) {
            console.log('Found preview placeholder, updating content...');
            previewPlaceholder.innerHTML = previewHTML;
        } else {
            console.error('Preview placeholder not found');
        }
    }

    // Generate final invitation
    function generateInvitation() {
        console.log('Generating invitation...');
        const formData = getFormData();
        
        // Ensure the selected template is included
        formData.template = selectedTemplate;
        console.log('Selected template:', selectedTemplate);
        
        // Basic validation
        if (!formData.eventType || !formData.hostName || !formData.eventDate || !formData.eventTime || !formData.venue) {
            alert('Please fill in all required fields.');
            return;
        }
        
        try {
            // Generate the invitation card using the current template
            const invitationHTML = createInvitationHTML(formData);
            console.log('Generated invitation HTML:', invitationHTML);
            
            // Replace the preview area with the final invitation
            const previewPlaceholder = document.querySelector('.preview-placeholder');
            if (previewPlaceholder) {
                previewPlaceholder.innerHTML = invitationHTML;
                console.log('Preview updated successfully');
            } else {
                console.error('Preview placeholder not found');
            }
        } catch (error) {
            console.error('Error generating invitation:', error);
            alert('An error occurred while generating the invitation. Please check the console for details.');
        }
    }
    
    // Update preview function
    function updatePreview() {
        try {
            const formData = getFormData();
            const preview = createInvitationCard(formData, true);
            previewCard.innerHTML = '';
            previewCard.appendChild(preview);
        } catch (error) {
            console.error('Error updating preview:', error);
        }
    }
    
    // Generate final invitation
    function generateInvitation() {
        const formData = getFormData();
        
        // Basic validation
        if (!formData.eventType || !formData.hostName || !formData.eventDate || !formData.eventTime || !formData.venue) {
            alert('Please fill in all required fields.');
            return;
        }
        
        const invitationCard = createInvitationCard(formData, false);
        
        // Replace preview with final card
        previewCard.innerHTML = '';
        previewCard.appendChild(invitationCard);
        
        // Show success message
        alert('Invitation generated successfully!');
    }
    
    // Get form data
    function getFormData() {
        return {
            eventType: document.getElementById('event-type').value,
            hostName: document.getElementById('host-name').value,
            eventDate: document.getElementById('event-date').value,
            eventTime: document.getElementById('event-time').value,
            venue: document.getElementById('event-venue').value,
            additionalInfo: document.getElementById('additional-info').value,
            template: selectedTemplate
        };
    }
    
    // Create invitation card HTML
    function createInvitationCard(data, isPreview) {
        const card = document.createElement('div');
        card.className = 'invitation-card';
        
        // Format date
        const formattedDate = data.eventDate ? new Date(data.eventDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        }) : 'Date';
        
        // Format time (12-hour format)
        let formattedTime = '';
        if (data.eventTime) {
            const [hours, minutes] = data.eventTime.split(':');
            const time = new Date();
            time.setHours(parseInt(hours, 10), parseInt(minutes, 10));
            formattedTime = time.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        }
        
        // Get template styles
        const templateStyles = getTemplateStyle(data.template || 'royal-gold');
        
        // Create card HTML
        card.innerHTML = `
            <div class="invitation-header" style="${templateStyles.header}">
                <h2 style="${templateStyles.title}">${data.eventType || 'Your Event'}</h2>
                <div class="divider" style="${templateStyles.divider}"></div>
            </div>
            
            <div class="invitation-body">
                <div class="host" style="${templateStyles.text}">
                    You're cordially invited to celebrate with
                </div>
                
                <h3 class="host-name" style="${templateStyles.accentText}">${data.hostName || 'Host Name'}</h3>
                
                <div class="event-details" style="${templateStyles.text}">
                    <p><i class="fas fa-calendar-alt"></i> ${formattedDate}</p>
                    <p><i class="fas fa-clock"></i> ${formattedTime || 'Time'}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${data.venue || 'Venue'}</p>
                </div>
                
                ${data.additionalInfo ? `
                <div class="additional-info" style="${templateStyles.text}; margin-top: 20px; font-style: italic;">
                    <p>${data.additionalInfo}</p>
                </div>
                ` : ''}
                
                <div class="rsvp" style="margin-top: 30px; ${templateStyles.text}">
                    <p>We look forward to celebrating with you!</p>
                    ${!isPreview ? `
                    <p style="margin-top: 15px; font-weight: 500;">
                        Please RSVP by ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                    </p>
                    ` : ''}
                </div>
            </div>
            
            <div class="invitation-footer" style="margin-top: auto; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                <p style="font-size: 0.8em; opacity: 0.8; margin: 0;">
                    Created with ❤️ using InVI
                </p>
            </div>
        `;
        
        // Apply template-specific styles
        Object.assign(card.style, templateStyles.card);
        
        return card;
    }
    
    // Get styles for each template
    function getTemplateStyle(template) {
        const styles = {
            card: {},
            header: {},
            title: {},
            divider: '',
            text: '',
            accentText: ''
        };
        
        switch(template) {
            case 'royal-gold':
                styles.card = {
                    background: 'linear-gradient(145deg, #D4AF37 0%, #F9D423 100%)',
                    color: '#2d1e07',
                    border: '1px solid rgba(255, 223, 119, 0.5)'
                };
                styles.title = 'color: #2d1e07; text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);';
                styles.accentText = 'color: #2d1e07; text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);';
                styles.text = 'color: #2d1e07;';
                styles.divider = 'background: #2d1e07; height: 2px; width: 60px; margin: 10px auto;';
                break;
                
            case 'diamond-elegance':
                styles.card = {
                    background: 'linear-gradient(145deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
                    color: '#e0f7fa',
                    border: '1px solid rgba(78, 183, 227, 0.3)'
                };
                styles.title = 'color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.3);';
                styles.accentText = 'color: #4eb7e3; text-shadow: 0 1px 2px rgba(0,0,0,0.2);';
                styles.text = 'color: #e0f7fa;';
                styles.divider = 'background: #4eb7e3; height: 2px; width: 60px; margin: 10px auto;';
                break;
                
            case 'velvet-red':
                styles.card = {
                    background: 'linear-gradient(145deg, #8B0000 0%, #FF2400 100%)',
                    color: '#fff',
                    border: '1px solid rgba(255, 100, 100, 0.3)'
                };
                styles.title = 'color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.3);';
                styles.accentText = 'color: #fff; text-shadow: 0 1px 3px rgba(0,0,0,0.5);';
                styles.text = 'color: #fff;';
                styles.divider = 'background: #fff; height: 2px; width: 60px; margin: 10px auto;';
                break;
                
            case 'emerald-green':
                styles.card = {
                    background: 'linear-gradient(145deg, #005f20 0%, #50C878 100%)',
                    color: '#fff',
                    border: '1px solid rgba(80, 200, 120, 0.3)'
                };
                styles.title = 'color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.3);';
                styles.accentText = 'color: #fff; text-shadow: 0 1px 3px rgba(0,0,0,0.3);';
                styles.text = 'color: #fff;';
                styles.divider = 'background: #fff; height: 2px; width: 60px; margin: 10px auto;';
                break;
                
            // Add more templates as needed...
            
            default:
                // Default styles
                styles.card = {
                    background: 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 100%)',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                };
                styles.title = 'color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,0.3);';
                styles.accentText = 'color: #8b6b4a; text-shadow: 0 1px 2px rgba(0,0,0,0.2);';
                styles.text = 'color: #eee;';
                styles.divider = 'background: #8b6b4a; height: 2px; width: 60px; margin: 10px auto;';
        }
        
        // Convert style objects to strings for inline styles
        const result = {};
        for (const [key, value] of Object.entries(styles)) {
            if (typeof value === 'object') {
                result[key] = Object.entries(value)
                    .map(([k, v]) => `${k}:${v}`)
                    .join(';');
            } else {
                result[key] = value;
            }
        }
        
        return result;
    }
    
    // Initialize everything
    initEventListeners();
    updatePreview();
    
    // Luxurious template style map
    const templateStyles = {
        'royal-gold': {
            background: 'linear-gradient(135deg, #f9d423 0%, #ff4e50 100%)',
            color: '#2d1e07',
            accent: '#bfa14c',
            shadow: '0 6px 36px rgba(191,161,76,0.25)',
            border: '2px solid #bfa14c'
        },
        'marble-elegance': {
            background: 'url(https://www.transparenttextures.com/patterns/marble.png), linear-gradient(135deg, #fff 60%, #eaeaea 100%)',
            color: '#222',
            accent: '#b2b2b2',
            shadow: '0 6px 36px rgba(178,178,178,0.18)',
            border: '2px solid #d6d6d6'
        },
        'velvet-night': {
            background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
            color: '#fff',
            accent: '#bb86fc',
            shadow: '0 6px 36px rgba(187,134,252,0.18)',
            border: '2px solid #bb86fc'
        },
        'glass-chic': {
            background: 'rgba(255,255,255,0.45)',
            color: '#222',
            accent: '#6dd5ed',
            shadow: '0 8px 32px 0 rgba(31,38,135,0.15)',
            border: '2px solid #6dd5ed',
            backdrop: true
        },
        'minimalist-black': {
            background: 'linear-gradient(135deg, #232526 0%, #000 100%)',
            color: '#fff',
            accent: '#eee',
            shadow: '0 6px 36px rgba(0,0,0,0.25)',
            border: '2px solid #eee'
        },
        'vibrant-colorful': {
            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
            color: '#fff',
            accent: '#ffe66d',
            shadow: '0 6px 36px rgba(255,230,109,0.18)',
            border: '2px solid #ffe66d'
        },
        'elegant-black': {
            background: 'linear-gradient(135deg, #232526 0%, #1a1a1a 100%)',
            color: '#fff',
            accent: '#ffd700',
            shadow: '0 6px 36px rgba(255,215,0,0.08)',
            border: '2px solid #ffd700'
    };
    
    switch(template) {
        case 'royal-gold':
            styles.card = {
                background: 'linear-gradient(145deg, #D4AF37 0%, #F9D423 100%)',
                color: '#2d1e07',
                border: '1px solid rgba(255, 223, 119, 0.5)'
            };
            styles.title = 'color: #2d1e07; text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);';
            styles.accentText = 'color: #2d1e07; text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);';
            styles.text = 'color: #2d1e07;';
            styles.divider = 'background: #2d1e07; height: 2px; width: 60px; margin: 10px auto;';
            break;
            
        case 'diamond-elegance':
            styles.card = {
                background: 'linear-gradient(145deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
                color: '#e0f7fa',
                border: '1px solid rgba(78, 183, 227, 0.3)'
            };
            styles.title = 'color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.3);';
            styles.accentText = 'color: #4eb7e3; text-shadow: 0 1px 2px rgba(0,0,0,0.2);';
            styles.text = 'color: #e0f7fa;';
            styles.divider = 'background: #4eb7e3; height: 2px; width: 60px; margin: 10px auto;';
            break;
            
        case 'velvet-red':
            styles.card = {
                background: 'linear-gradient(145deg, #8B0000 0%, #FF2400 100%)',
                color: '#fff',
                border: '1px solid rgba(255, 100, 100, 0.3)'
            };
            styles.title = 'color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.3);';
            styles.accentText = 'color: #fff; text-shadow: 0 1px 3px rgba(0,0,0,0.5);';
            styles.text = 'color: #fff;';
            styles.divider = 'background: #fff; height: 2px; width: 60px; margin: 10px auto;';
            break;
            
        case 'emerald-green':
            styles.card = {
                background: 'linear-gradient(145deg, #005f20 0%, #50C878 100%)',
                color: '#fff',
                border: '1px solid rgba(80, 200, 120, 0.3)'
            };
            styles.title = 'color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.3);';
            styles.accentText = 'color: #fff; text-shadow: 0 1px 3px rgba(0,0,0,0.3);';
            styles.text = 'color: #fff;';
            styles.divider = 'background: #fff; height: 2px; width: 60px; margin: 10px auto;';
            break;
            
        // Add more templates as needed...
            
        default:
            // Default styles
            styles.card = {
                background: 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 100%)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            };
            styles.title = 'color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,0.3);';
            styles.accentText = 'color: #8b6b4a; text-shadow: 0 1px 2px rgba(0,0,0,0.2);';
            styles.text = 'color: #eee;';
            styles.divider = 'background: #8b6b4a; height: 2px; width: 60px; margin: 10px auto;';
    }
    
    // Convert style objects to strings for inline styles
    const result = {};
    for (const [key, value] of Object.entries(styles)) {
        if (typeof value === 'object') {
            result[key] = Object.entries(value)
                .map(([k, v]) => `${k}:${v}`)
                .join(';');
        } else {
            result[key] = value;
        }
    }
    
    return result;
}

// Initialize everything
initEventListeners();
updatePreview();

// Luxurious template style map
const templateStyles = {
    'royal-gold': {
        background: 'linear-gradient(135deg, #f9d423 0%, #ff4e50 100%)',
        color: '#2d1e07',
        accent: '#bfa14c',
        shadow: '0 6px 36px rgba(191,161,76,0.25)',
        border: '2px solid #bfa14c'
    },
    'marble-elegance': {
        background: 'url(https://www.transparenttextures.com/patterns/marble.png), linear-gradient(135deg, #fff 60%, #eaeaea 100%)',
        color: '#222',
        accent: '#b2b2b2',
        shadow: '0 6px 36px rgba(178,178,178,0.18)',
        border: '2px solid #d6d6d6'
    },
    'velvet-night': {
        background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
        color: '#fff',
        accent: '#bb86fc',
        shadow: '0 6px 36px rgba(187,134,252,0.18)',
        border: '2px solid #bb86fc'
    },
    'glass-chic': {
        background: 'rgba(255,255,255,0.45)',
        color: '#222',
        accent: '#6dd5ed',
        shadow: '0 8px 32px 0 rgba(31,38,135,0.15)',
        border: '2px solid #6dd5ed',
        backdrop: true
    },
    'minimalist-black': {
        background: 'linear-gradient(135deg, #232526 0%, #000 100%)',
        color: '#fff',
        accent: '#eee',
        shadow: '0 6px 36px rgba(0,0,0,0.25)',
        border: '2px solid #eee'
    },
    'vibrant-colorful': {
        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
        color: '#fff',
        accent: '#ffe66d',
        shadow: '0 6px 36px rgba(255,230,109,0.18)',
        border: '2px solid #ffe66d'
    },
    'elegant-black': {
        background: 'linear-gradient(135deg, #232526 0%, #1a1a1a 100%)',
        color: '#fff',
        accent: '#ffd700',
        shadow: '0 6px 36px rgba(255,215,0,0.08)',
        border: '2px solid #ffd700'
    }
};

// Create HTML for the invitation preview
function createInvitationHTML(formData) {
    try {
        console.log('Creating invitation HTML with data:', formData);
        const { eventType, hostName, eventDate, eventTime, venue, additionalInfo, template } = formData;
        console.log('Selected template:', template);
        
        // Get the style for the selected template, default to royal-gold if not found
        const style = templateStyles[template] || templateStyles['royal-gold'];
        console.log('Using style:', style);
        
        const backdrop = style.backdrop ? 'backdrop-filter: blur(8px);' : '';
        
        // Format date
        const formattedDate = eventDate ? new Date(eventDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        }) : 'Date not specified';
        generatePreview();
        
        // Set up a mutation observer to watch for changes in the preview container
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    console.log('Preview updated');
                }
            });
        });
        
        const previewPlaceholder = document.querySelector('.preview-placeholder');
        if (previewPlaceholder) {
            observer.observe(previewPlaceholder, { childList: true, subtree: true });
        }
    }, 100);
}

// Start the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initInvitationGenerator);

// Debug function to check if elements exist
function checkElements() {
    console.log('Checking required elements...');
    console.log('Form:', document.getElementById('invitation-form'));
    console.log('Preview container:', document.querySelector('.preview-placeholder'));
    console.log('Template options:', document.querySelectorAll('.template-option').length);
}

// Run element check after a short delay to ensure DOM is ready
setTimeout(checkElements, 1000);

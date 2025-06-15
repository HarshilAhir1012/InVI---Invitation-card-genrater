// Debug log
console.log('Invitation script loaded');

// Main function to initialize the invitation generator
function initInvitationGenerator() {
    console.log('Initializing invitation generator...');
    
    // Get DOM elements
    const form = document.getElementById('invitation-form');
    const previewCard = document.getElementById('preview-card');
    const templateOptions = document.querySelectorAll('.template-option');
    
    if (!form || !previewCard || templateOptions.length === 0) {
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
    document.querySelectorAll('.template-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.template-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
            selectedTemplate = this.getAttribute('data-template');
            updatePreview();
        });
    });

    // Handle form input changes with debounce
    const debouncedUpdate = debounce(updatePreview, 300);
    form.addEventListener('input', debouncedUpdate);
    form.addEventListener('change', updatePreview);
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        generateInvitation();
    });
    
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
        if (templateStyles && templateStyles.card) {
            Object.keys(templateStyles.card).forEach(prop => {
                card.style[prop] = templateStyles.card[prop];
            });
        }
        
        return card;
    }
    
    // Get styles for each template
    function getTemplateStyle(template) {
        const styles = {
            card: {},
            header: '',
            title: '',
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
                styles.header = 'background: linear-gradient(145deg, #D4AF37 0%, #F9D423 100%); padding: 2rem;';
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
                styles.header = 'background: linear-gradient(145deg, #0f2027 0%, #203a43 50%, #2c5364 100%); padding: 2rem;';
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
                styles.header = 'background: linear-gradient(145deg, #8B0000 0%, #FF2400 100%); padding: 2rem;';
                styles.title = 'color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.3);';
                styles.accentText = 'color: #fff; text-shadow: 0 1px 3px rgba(0,0,0,0.5);';
                styles.text = 'color: #fff;';
                styles.divider = 'background: #fff; height: 2px; width: 60px; margin: 10px auto;';
                break;
                
            default:
                // Default styles
                styles.card = {
                    background: 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 100%)',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                };
                styles.header = 'background: linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 100%); padding: 2rem;';
                styles.title = 'color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,0.3);';
                styles.accentText = 'color: #8b6b4a; text-shadow: 0 1px 2px rgba(0,0,0,0.2);';
                styles.text = 'color: #eee;';
                styles.divider = 'background: #8b6b4a; height: 2px; width: 60px; margin: 10px auto;';
        }
        
        return styles;
    }
    
    // Initialize with default preview
    updatePreview();
}

// Start the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initInvitationGenerator);

// Debug function to check if elements exist
function checkElements() {
    console.log('Checking required elements...');
    console.log('Form:', document.getElementById('invitation-form'));
    console.log('Preview card:', document.getElementById('preview-card'));
    console.log('Template options:', document.querySelectorAll('.template-option').length);
}

// Run element check after a short delay to ensure DOM is ready
setTimeout(checkElements, 1000);

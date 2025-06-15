let cardCount = 1;

document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generate-message');
  const previewBtn = document.getElementById('preview-btn');
  const messageBox = document.getElementById('message');
  const previewBox = document.getElementById('invitation-preview');
  const previewActions = document.getElementById('preview-actions');
  const downloadBtn = document.getElementById('download-btn');

  // Generate AI-like Message
  generateBtn.addEventListener('click', () => {
    const eventType = document.getElementById('event-type').value;
    const hostName = document.getElementById('host-name').value;
    const eventDate = document.getElementById('event-date').value;
    const eventTime = document.getElementById('event-time').value;
    const eventVenue = document.getElementById('event-venue').value;

    if (!eventType || !hostName || !eventDate || !eventTime || !eventVenue) {
      alert('Please fill all main fields to generate a message.');
      return;
    }

    let message = "";

    switch (eventType) {
      case "wedding":
        message = `You are warmly invited to celebrate the wedding of ${hostName} on ${eventDate} at ${eventTime}, at ${eventVenue}. Your presence will make the occasion truly special.`;
        break;
      case "birthday":
        message = `Join us in celebrating ${hostName}'s birthday on ${eventDate} at ${eventTime}, held at ${eventVenue}. Come for the cake, stay for the memories!`;
        break;
      case "anniversary":
        message = `Celebrate a beautiful journey with ${hostName} on their anniversary on ${eventDate} at ${eventTime}. Venue: ${eventVenue}. Your blessings mean the world!`;
        break;
      case "corporate":
        message = `You're invited to a corporate event hosted by ${hostName} on ${eventDate} at ${eventTime}, located at ${eventVenue}. Let’s connect and grow together.`;
        break;
      case "ceremony":
        message = `Be part of a memorable ceremony with ${hostName} on ${eventDate} at ${eventTime}, happening at ${eventVenue}. Looking forward to your graceful presence.`;
        break;
      default:
        message = `Please join ${hostName} on ${eventDate} at ${eventTime} at ${eventVenue} for a special event.`;
    }

    messageBox.value = message;
  });

  // Generate Preview
  previewBtn.addEventListener('click', () => {
    const hostName = document.getElementById('host-name').value;
    const message = document.getElementById('message').value;
    const venue = document.getElementById('event-venue').value;
    const address = document.getElementById('event-address').value;
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;

    if (!hostName || !message || !venue || !address || !date || !time) {
      alert("Please fill out all fields before previewing.");
      return;
    }

    previewBox.innerHTML = `
      <div class="preview-card">
        <h3>${hostName}</h3>
        <p>${message}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Venue:</strong> ${venue}</p>
        <p><strong>Address:</strong> ${address}</p>
      </div>
    `;

    previewActions.classList.remove('hidden');
  });

  // Download Invitation as Image
  downloadBtn.addEventListener('click', () => {
    const card = document.getElementById('invitation-preview');
    html2canvas(card).then(canvas => {
      const link = document.createElement('a');
      link.download = `card${cardCount}.png`;
      link.href = canvas.toDataURL();
      link.click();
      cardCount++;
    });
  });
});

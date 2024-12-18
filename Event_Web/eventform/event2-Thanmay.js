// Replace this with your Google Apps Script URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKur3J6yS7lc47PYthvVgLhuaFAbX7-1MkZPNRAZf4Irat24m8sfN8MxkkhJShFsJr/exec';

document.getElementById('inquiryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    const statusDiv = document.getElementById('status');
    
    // Disable the submit button
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    
    // Show loading message
    statusDiv.innerHTML = '<p style="color: blue;">Submitting form...</p>';
    
    // Create FormData object
    const formData = new FormData(form);
    
    // Convert FormData to URL-encoded string
    const data = [...formData.entries()]
        .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
        .join('&');
    
    // Make the fetch request
    fetch(SCRIPT_URL, {
        redirect: 'follow',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
    .then(response => {
        statusDiv.innerHTML = '<p style="color: green;">Form submitted successfully!</p>';
        form.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        statusDiv.innerHTML = '<p style="color: red;">Error submitting form. Please try again.</p>';
    })
    .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit';
    });
});
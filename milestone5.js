var _a;
var addedSkills = [];
// Handle form submission and save data in localStorage
(_a = document.getElementById('resume-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (e) {
    e.preventDefault();
    // Check if any skills have been added before submitting
    if (addedSkills.length === 0) {
        alert("Please add at least one skill before submitting.");
        return;
    }
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var objective = document.getElementById('objective').value;
    var education = document.getElementById('education').value;
    var workExperience = document.getElementById('workexperience').value;
    var profileImageSrc = (profileImage === null || profileImage === void 0 ? void 0 : profileImage.src) || ''; // Check if image exists, fallback to empty string
    // Create an object to hold all form data
    var resumeData = {
        username: username,
        name: name,
        email: email,
        phone: phone,
        objective: objective,
        education: education,
        workExperience: workExperience,
        skills: addedSkills, // Include the skills array
        profileImage: profileImageSrc // Profile image source or empty
    };
    // Convert the object to JSON and store it in localStorage
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    // Display the form values in the resume
    displayResume(resumeData);
});
// Retrieve and display resume from localStorage on page load
window.addEventListener('load', function () {
    var storedData = localStorage.getItem('resumeData');
    if (storedData) {
        var resumeData = JSON.parse(storedData);
        displayResume(resumeData); // Display the resume if data exists
    }
});
// Display the resume data
function displayResume(resumeData) {
    document.getElementById('display-name').textContent = resumeData.name;
    document.getElementById('display-email').textContent = resumeData.email;
    document.getElementById('display-phone').textContent = resumeData.phone;
    document.getElementById('display-objective').textContent = resumeData.objective;
    document.getElementById('display-education').textContent = resumeData.education;
    document.getElementById('display-experience').textContent = resumeData.workExperience;
    // Update the skills list
    var displaySkills = document.getElementById('display-skills');
    displaySkills.innerHTML = ''; // Clear the skills list before repopulating
    resumeData.skills.forEach(function (skill) {
        var skillLi = document.createElement('li');
        skillLi.textContent = skill;
        displaySkills.appendChild(skillLi);
    });
    // Update profile image if available
    if (resumeData.profileImage) {
        document.getElementById('display-profile-image').src = resumeData.profileImage;
    }
    var shareableUrl = "".concat(window.location.origin, "/milestone5.html?username=").concat(encodeURIComponent(resumeData.username));
    var shareablelink = document.getElementById('shareable-link');
    var downloadlink = document.getElementById('download-link');
    var downloadpdf = document.getElementById('download-pdf');
    shareablelink.style.display = 'block';
    downloadlink.href = shareableUrl;
    downloadlink.textContent = shareableUrl;
    // Handle PDF download
    downloadpdf.addEventListener('click', function () {
        window.print();
    });
    document.querySelector('.resume').style.display = 'block'; // Show the resume section
}
// Skill input logic
var skillInput = document.getElementById('skill-input');
var addSkillBtn = document.getElementById('add-skill');
var skillsList = document.getElementById('skills-list');
skillInput.addEventListener('input', function () {
    addSkillBtn.disabled = !skillInput.value.trim(); // Disable the add button if input is empty
});
addSkillBtn.addEventListener('click', function () {
    var skill = skillInput.value.trim();
    if (skill) {
        addedSkills.push(skill); // Add the skill to the array
        // Append the skill to the skills list in the UI
        var li = document.createElement('li');
        li.textContent = skill;
        skillsList.appendChild(li);
        // Clear the input and disable the button
        skillInput.value = ''; // Clear input after adding the skill
        addSkillBtn.disabled = true;
    }
});
// File input logic
var fileInput = document.getElementById('file-input');
var profileImage = document.getElementById('display-profile-image');
fileInput.addEventListener('change', function (e) {
    var _a;
    var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var _a;
            profileImage.src = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result; // Update profile image
        };
        reader.readAsDataURL(file); // Read file as Data URL
    }
});

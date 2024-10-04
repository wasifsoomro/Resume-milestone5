let addedSkills: string[] = [];

// Handle form submission and save data in localStorage
document.getElementById('resume-form')?.addEventListener('submit', function (e: Event) {
    e.preventDefault();

    // Check if any skills have been added before submitting
    if (addedSkills.length === 0) {
        alert("Please add at least one skill before submitting.");
        return;
    }

    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const objective = (document.getElementById('objective') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLInputElement).value;
    const workExperience = (document.getElementById('workexperience') as HTMLInputElement).value;
    const profileImageSrc = profileImage?.src || ''; // Check if image exists, fallback to empty string

    // Create an object to hold all form data
    const resumeData = {
        username,
        name,
        email,
        phone,
        objective,
        education,
        workExperience,
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
    const storedData = localStorage.getItem('resumeData');
    if (storedData) {
        const resumeData = JSON.parse(storedData);
        displayResume(resumeData); // Display the resume if data exists
    }
});

// Display the resume data
function displayResume(resumeData: {
    username: string;
    name: string;
    email: string;
    phone: string;
    objective: string;
    education: string;
    workExperience: string;
    skills: string[];
    profileImage: string;
}) {
    (document.getElementById('display-name') as HTMLElement).textContent = resumeData.name;
    (document.getElementById('display-email') as HTMLElement).textContent = resumeData.email;
    (document.getElementById('display-phone') as HTMLElement).textContent = resumeData.phone;
    (document.getElementById('display-objective') as HTMLElement).textContent = resumeData.objective;
    (document.getElementById('display-education') as HTMLElement).textContent = resumeData.education;
    (document.getElementById('display-experience') as HTMLElement).textContent = resumeData.workExperience;
    
    // Update the skills list
    const displaySkills = document.getElementById('display-skills') as HTMLUListElement;
    displaySkills.innerHTML = ''; // Clear the skills list before repopulating
    resumeData.skills.forEach(skill => {
        const skillLi = document.createElement('li');
        skillLi.textContent = skill;
        displaySkills.appendChild(skillLi);
    });

    // Update profile image if available
    if (resumeData.profileImage) {
        (document.getElementById('display-profile-image') as HTMLImageElement).src = resumeData.profileImage;
    }

    const shareableUrl = `${window.location.origin}/milestone5.html?username=${encodeURIComponent(resumeData.username)}`;

    const shareablelink = document.getElementById('shareable-link') as HTMLDivElement;
    const downloadlink = document.getElementById('download-link') as HTMLAnchorElement;
    const downloadpdf = document.getElementById('download-pdf') as HTMLButtonElement;

    shareablelink.style.display = 'block';
    downloadlink.href = shareableUrl;
    downloadlink.textContent = shareableUrl;

    // Handle PDF download
    downloadpdf.addEventListener('click', () => {
        window.print();
    });

    (document.querySelector('.resume') as HTMLElement).style.display = 'block'; // Show the resume section
}

// Skill input logic
const skillInput = document.getElementById('skill-input') as HTMLInputElement;
const addSkillBtn = document.getElementById('add-skill') as HTMLButtonElement;
const skillsList = document.getElementById('skills-list') as HTMLUListElement;

skillInput.addEventListener('input', function () {
    addSkillBtn.disabled = !skillInput.value.trim(); // Disable the add button if input is empty
});

addSkillBtn.addEventListener('click', function () {
    const skill = skillInput.value.trim();
    if (skill) {
        addedSkills.push(skill); // Add the skill to the array

        // Append the skill to the skills list in the UI
        const li = document.createElement('li');
        li.textContent = skill;
        skillsList.appendChild(li);

        // Clear the input and disable the button
        skillInput.value = ''; // Clear input after adding the skill
        addSkillBtn.disabled = true;
    }
});

// File input logic
let fileInput = document.getElementById('file-input') as HTMLInputElement;
const profileImage = document.getElementById('display-profile-image') as HTMLImageElement;

fileInput.addEventListener('change', function (e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            profileImage.src = event.target?.result as string; // Update profile image
        };
        reader.readAsDataURL(file); // Read file as Data URL
    }
});

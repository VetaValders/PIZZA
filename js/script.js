"use strict"

document.addEventListener("click", documentActions);

function documentActions(e) {
	const targetElement = e.target;

	if (targetElement.closest('.icon-menu')) {
		document.documentElement.classList.toggle('menu-open');
	}

	if (targetElement.closest('[data-goto]')) {
		document.documentElement.classList.contains('menu-open') ?
			document.documentElement.classList.remove('menu-open') : null;


		const goTo = targetElement.closest('[data-goto]').dataset.goto;
		const goToElement = document.querySelector(goTo);
		const headerHeight = document.querySelector('.header').offsetHeight;

		if (goToElement) {
			window.scrollTo({
				top: goToElement.offsetTop - (headerHeight + 15),
				behavior: "smooth"
			});
		}
		e.preventDefault();
	}




}

document.addEventListener('DOMContentLoaded', (event) => {
    const authModal = document.getElementById('authModal');
    const authBtn = document.getElementById('authBtn');
    const closeAuth = document.getElementById('closeAuth');
    const loginToggle = document.getElementById('loginToggle');
    const registerToggle = document.getElementById('registerToggle');
    const authForm = document.getElementById('authForm');
    const authTitle = document.getElementById('authTitle');
    const authSubmit = document.getElementById('authSubmit');
    const showPassword = document.getElementById('showPassword');
    const authPassword = document.getElementById('authPassword');

    let isLogin = true;

    authBtn.onclick = () => {
        authModal.style.display = "block";
    }

    closeAuth.onclick = () => {
        authModal.style.display = "none";
    }

    window.onclick = (event) => {
        if (event.target === authModal) {
            authModal.style.display = "none";
        }
    }

    loginToggle.onclick = () => {
        isLogin = true;
       
        authSubmit.innerText = "Login";
        loginToggle.classList.add('active');
        registerToggle.classList.remove('active');
    }

    registerToggle.onclick = () => {
        isLogin = false;
       
        authSubmit.innerText = "Register";
        registerToggle.classList.add('active');
        loginToggle.classList.remove('active');
    }

    showPassword.onclick = () => {
        if (authPassword.type === "password") {
            authPassword.type = "text";
        } else {
            authPassword.type = "password";
        }
    }

    authForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        console.log("Username:", formData.get('username'));
        console.log("Password:", formData.get('password'));

        fetch(isLogin ? 'php/login.php' : 'php/register.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            if (data === 'Login successful' || data === 'Registration successful') {
                authModal.style.display = "none";
            }
        });
    });
});
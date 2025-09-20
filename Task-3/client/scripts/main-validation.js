document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('client-form');

  const nameInput = document.getElementById('name');
  const mobileInput = document.getElementById('mobile');
  const emailInput = document.getElementById('email');
  const addressInput = document.getElementById('address');

  const errors = {
    name: document.getElementById('name-error'),
    mobile: document.getElementById('mobile-error'),
    email: document.getElementById('email-error'),
    address: document.getElementById('address-error'),
  };

  function validateName(value) {
    if (!value.trim()) return 'Name is required';
    if (value.length < 3) return 'Name must be at least 3 characters';
    return '';
  }

  function validateMobile(value) {
    if (!value.trim()) return 'Mobile is required';
    if (!/^[0-9]{10,15}$/.test(value)) return 'Mobile must be 10–15 digits';
    return '';
  }

  function validateEmail(value) {
    if (!value.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email';
    return '';
  }

  function validateAddress(value) {
    if (!value.trim()) return 'Address is required';
    if (value.length < 5) return 'Address must be at least 5 characters';
    return '';
  }

  // Run validation on submit
  form.addEventListener('submit', (e) => {
    let valid = true;

    // Clear all previous errors
    Object.values(errors).forEach((errEl) => (errEl.textContent = ''));

    const nameErr = validateName(nameInput.value);
    if (nameErr) {
      errors.name.textContent = nameErr;
      valid = false;
    }

    const mobileErr = validateMobile(mobileInput.value);
    if (mobileErr) {
      errors.mobile.textContent = mobileErr;
      valid = false;
    }

    const emailErr = validateEmail(emailInput.value);
    if (emailErr) {
      errors.email.textContent = emailErr;
      valid = false;
    }

    const addressErr = validateAddress(addressInput.value);
    if (addressErr) {
      errors.address.textContent = addressErr;
      valid = false;
    }

    if (!valid) {
      e.preventDefault(); // stop form submission
    }
  });
});

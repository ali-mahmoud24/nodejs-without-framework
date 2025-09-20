const modal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-form');
const closeModalBtn = document.getElementById('close-modal');

let editingClientId = null;

// Validation helpers
function validateName(value) {
  if (!value.trim()) return 'Name is required';
  if (value.length < 3) return 'Name must be at least 3 characters';
  return '';
}

function validateMobile(value) {
  const mobile = value.trim();
  if (!mobile) return 'Mobile is required';
  if (mobile.length < 10 || mobile.length > 15)
    return 'Mobile must be 10–15 digits';
  if (isNaN(mobile)) return 'Mobile must contain only numbers';
  return '';
}

function validateEmail(value) {
  const email = value.trim();
  if (!email) return 'Email is required';
  if (!email.includes('@') || !email.includes('.'))
    return 'Enter a valid email';
  return '';
}

function validateAddress(value) {
  if (!value.trim()) return 'Address is required';
  if (value.length < 5) return 'Address must be at least 5 characters';
  return '';
}

// Hook into script.js "edit button"
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit-btn')) {
    editingClientId = e.target.dataset.id;

    // Fill modal with client data
    const parent = e.target.closest('li');
    document.getElementById('edit-name').value = parent
      .querySelector('p:nth-child(1)')
      .textContent.replace('Name: ', '');
    document.getElementById('edit-mobile').value = parent
      .querySelector('p:nth-child(2)')
      .textContent.replace('Mobile: ', '');
    document.getElementById('edit-email').value = parent
      .querySelector('p:nth-child(3)')
      .textContent.replace('Email: ', '');
    document.getElementById('edit-address').value = parent
      .querySelector('p:nth-child(4)')
      .textContent.replace('Address: ', '');

    modal.classList.remove('hidden');
  }
});

closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Handle save
editForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Clear errors
  document.querySelectorAll('.error').forEach((el) => (el.textContent = ''));

  const name = document.getElementById('edit-name').value;
  const mobile = document.getElementById('edit-mobile').value;
  const email = document.getElementById('edit-email').value;
  const address = document.getElementById('edit-address').value;

  let valid = true;

  const nameErr = validateName(name);
  if (nameErr) {
    document.getElementById('edit-name-error').textContent = nameErr;
    valid = false;
  }

  const mobileErr = validateMobile(mobile);
  if (mobileErr) {
    document.getElementById('edit-mobile-error').textContent = mobileErr;
    valid = false;
  }

  const emailErr = validateEmail(email);
  if (emailErr) {
    document.getElementById('edit-email-error').textContent = emailErr;
    valid = false;
  }

  const addressErr = validateAddress(address);
  if (addressErr) {
    document.getElementById('edit-address-error').textContent = addressErr;
    valid = false;
  }

  if (!valid) return;

  // Send update to server
  await updateClient(editingClientId, { name, mobile, email, address });
  const updatedClients = await fetchClients();
  displayClients(updatedClients);

  modal.classList.add('hidden');
});

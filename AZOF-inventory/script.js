let vehicleStorage = JSON.parse(localStorage.getItem('vehicleStorage')) || {
    utv: [
      {
        vehicleNumber: 1,
        vin: 'UTV123456789',
        registrationExpiry: '2023-12-31',
        plateNumber: 'ABC123'
      }
    ],
    atv: [
      {
        vehicleNumber: 1,
        vin: 'ATV987654321',
        registrationExpiry: '2023-11-30',
        plateNumber: 'XYZ789'
      }
    ]
  };
  
  function addVehicle() {
    const type = document.getElementById('vehicleType').value;
    const vehicleNumber = document.getElementById('vehicleNumber').value;
    const vin = document.getElementById('vin').value;
    const registrationExpiry = document.getElementById('registrationExpiry').value;
    const plateNumber = document.getElementById('plateNumber').value;
  
    const newVehicle = {
      vehicleNumber: parseInt(vehicleNumber),
      vin: vin,
      registrationExpiry: registrationExpiry,
      plateNumber: plateNumber
    };
  
    if (vehicleStorage.hasOwnProperty(type)) {
      vehicleStorage[type].push(newVehicle);
      saveToLocalStorage();
      displayInventory();
    } else {
      console.log(`Vehicle type '${type}' not found.`);
    }
  }
  
  function deleteVehicle(type, vehicleNumber) {
    if (vehicleStorage.hasOwnProperty(type)) {
      if (vehicleNumber >= 0 && vehicleNumber < vehicleStorage[type].length) {
        const deletedVehicle = vehicleStorage[type].splice(vehicleNumber, 1);
        console.log(`Deleted ${type.toUpperCase()} at vehicle number ${vehicleNumber}:`, deletedVehicle);
        saveToLocalStorage();
        displayInventory();
      } else {
        console.log(`Vehicle number ${vehicleNumber} is out of range for ${type.toUpperCase()} vehicles.`);
      }
    } else {
      console.log(`Vehicle type '${type}' not found.`);
    }
  }
  
  function saveToLocalStorage() {
    localStorage.setItem('vehicleStorage', JSON.stringify(vehicleStorage));
  }
  
  function displayInventory() {
    const inventoryList = document.getElementById('inventoryList');
    inventoryList.innerHTML = '';
  
    for (const type in vehicleStorage) {
      if (vehicleStorage.hasOwnProperty(type)) {
        const vehicleTypeHeading = document.createElement('h3');
        vehicleTypeHeading.textContent = type.toUpperCase();
        inventoryList.appendChild(vehicleTypeHeading);
  
        vehicleStorage[type].forEach((vehicle, index) => {
          const vehicleDetails = document.createElement('li');
          vehicleDetails.innerHTML = `
            <strong>Vehicle Number:</strong> ${vehicle.vehicleNumber}<br>
            <strong>VIN:</strong> ${vehicle.vin}<br>
            <strong>Registration Expiry:</strong> ${vehicle.registrationExpiry}<br>
            <strong>Plate Number:</strong> ${vehicle.plateNumber}<br>
            <button onclick="deleteVehicle('${type}', ${index})">Delete</button><br>
            <hr>
          `;
          inventoryList.appendChild(vehicleDetails);
        });
      }
    }
  }
  
  function removeInvalidVehicles() {
    for (const type in vehicleStorage) {
      if (vehicleStorage.hasOwnProperty(type)) {
        vehicleStorage[type] = vehicleStorage[type].filter(vehicle => {
          return typeof vehicle.vehicleNumber === 'number' && !isNaN(vehicle.vehicleNumber);
        });
      }
    }
    saveToLocalStorage();
    displayInventory();
  }
  
  // Function call to remove invalid vehicles
  removeInvalidVehicles();
  
  function deleteSelectedVehicle() {
    const vehicleNumber = parseInt(document.getElementById('deleteVehicleNumber').value);
    const type = document.getElementById('deleteVehicleType').value;
  
    if (!isNaN(vehicleNumber)) {
      deleteVehicle(type, vehicleNumber);
    } else {
      console.log('Please enter a valid vehicle number.');
    }
    displayInventory();
  }
  
  // Initial display of inventory
  displayInventory();
  
const FlightTicket = require('./FlightTicket');

// Create a ticket
const t1 = FlightTicket.create({
  id: 1,
  num: 100,
  departureAirport: 'HBE',
  arrivalAirport: 'DUBAI',
  travelDate: '2025-10-01',
});
console.log(t1);

const t2 = FlightTicket.create({
  id: 2,
  num: 200,
  departureAirport: 'SPHINX',
  arrivalAirport: 'MAKKAH',
  travelDate: '2025-10-05',
});
console.log(t2);

// Try invalid ticket
const t3 = FlightTicket.create({
  id: 'x',
  num: 200,
  departureAirport: '',
  arrivalAirport: 'SFO',
  travelDate: 'invalid',
}); // Logs validation errors

console.log('BEFORE UPDATE');
// Find by id
console.log(FlightTicket.findById(1));

// Update ticket
console.log('AFTER UPDATE');
FlightTicket.update(1, { departureAirport: 'CAIRO', travelDate: '2025-10-02' });
console.log(FlightTicket.findById(1));

console.log('FIND ALL');
// Get all tickets
console.log(FlightTicket.findAll());

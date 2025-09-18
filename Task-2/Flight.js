class FlightTicket {
  constructor(id, num, departureAirport, arrivalAirport, travelDate) {
    this.id = id;
    this.num = num;
    this.departureAirport = departureAirport;
    this.arrivalAirport = arrivalAirport;
    this.travelDate = travelDate;
  }

  static flightTickets = [];

  // Create operation
  static create(flightData) {
    // Validation
    if (!id || !num || !departureAirport || !arrivalAirport || !travelDate) {
      console.log('Please provide all fields');
      return;
    }

    if (isNaN(id) || isNaN(num)) {
      console.log('Please proivde valid id and flight number (number)');
      return;
    }

    if (isNaN(new Date(dateStr))) {
      console.log('Please enter a valid date format');
      return;
    }

    const newFlightTicket = new FlightTicket(
      flightData.id,
      flightData.num,
      flightData.departureAirport,
      flightData.arrivalAirport,
      flightData.travelDate
    );

    FlightTicket.flightTickets.push(newFlightTicket);

    return newFlightTicket;
  }
  // Read operation (find by ID)
  static findById(id) {
    const foundTicket = FlightTicket.flightTickets.find(
      (ticket) => ticket.id === id
    );

    if (!foundTicket) {
      console.log(`No ticket with such id ${id}`);
      return null;
    }

    return foundTicket;
  }

  // Read operation (get all)
  static findAll() {
    return [...FlightTicket.flightTickets];
  }

  // Update operation
  static update(id, updatedData) {
    // TODO: Validate data
    const ticketIndex = FlightTicket.flightTickets.findIndex(
      (ticket) => ticket.id === id
    );
    if (ticketIndex !== -1) {
      FlightTicket.flightTickets[ticketIndex] = {
        ...FlightTicket.flightTickets[ticketIndex],
        ...updatedData,
      };
      return FlightTicket.flightTickets[ticketIndex];
    }
    console.log(`No ticket with such id ${id}`);
    return null;
  }
}

module.exports = { FlightTicket };

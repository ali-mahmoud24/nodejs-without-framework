class FlightTicket {
  constructor(id, num, departureAirport, arrivalAirport, travelDate) {
    this.id = id;
    this.num = num;
    this.departureAirport = departureAirport;
    this.arrivalAirport = arrivalAirport;
    this.travelDate = new Date(travelDate);
  }

  static flightTickets = [];

  // --- Validators ---
  static validateTicketData(data, checkAllFields = true) {
    const errors = [];

    // Required fields check
    if (checkAllFields) {
      if (data.id === undefined) errors.push('id is required');
      if (data.num === undefined) errors.push('flight number is required');
      if (!data.departureAirport) errors.push('departure airport is required');
      if (!data.arrivalAirport) errors.push('arrival airport is required');
      if (!data.travelDate) errors.push('travel date is required');
    }

    // Type checks
    if (data.id !== undefined && typeof data.id !== 'number')
      errors.push('id must be a number');
    if (data.num !== undefined && typeof data.num !== 'number')
      errors.push('flight number must be a number');

    if (data.travelDate !== undefined) {
      const date = new Date(data.travelDate);
      if (isNaN(date.getTime()))
        errors.push('travel date must be a valid date');
    }

    return errors;
  }

  // --- Create operation ---
  static create(flightData) {
    const errors = FlightTicket.validateTicketData(flightData);
    if (errors.length > 0) {
      console.log('Validation errors:', errors.join(', '));
      return null;
    }

    const newTicket = new FlightTicket(
      flightData.id,
      flightData.num,
      flightData.departureAirport,
      flightData.arrivalAirport,
      flightData.travelDate
    );

    FlightTicket.flightTickets.push(newTicket);
    return newTicket;
  }

  // --- Read operations ---
  static findById(id) {
    const ticket = FlightTicket.flightTickets.find((t) => t.id === id);
    if (!ticket) {
      console.log(`No ticket found with id ${id}`);
      return null;
    }
    return ticket;
  }

  static findAll() {
    return [...FlightTicket.flightTickets];
  }

  // --- Update operation ---
  static update(id, updatedData) {
    const ticketIndex = FlightTicket.flightTickets.findIndex(
      (t) => t.id === id
    );
    if (ticketIndex === -1) {
      console.log(`No ticket found with id ${id}`);
      return null;
    }

    const ticket = FlightTicket.flightTickets[ticketIndex];

    // Validate updated fields (partial update allowed)
    const errors = FlightTicket.validateTicketData(updatedData, false);
    if (errors.length > 0) {
      console.log('Validation errors:', errors.join(', '));
      return null;
    }

    // Merge fields if found
    if (updatedData.num !== undefined) ticket.num = updatedData.num;
    if (updatedData.departureAirport !== undefined)
      ticket.departureAirport = updatedData.departureAirport;
    if (updatedData.arrivalAirport !== undefined)
      ticket.arrivalAirport = updatedData.arrivalAirport;
    if (updatedData.travelDate !== undefined)
      ticket.travelDate = new Date(updatedData.travelDate);

    return ticket;
  }
}

module.exports = FlightTicket;

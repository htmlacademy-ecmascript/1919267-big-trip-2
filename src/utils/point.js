function getDestinationById (destinations, destinationId) {
  return destinations.find((destination) => destination.id === destinationId);
}

function getOffersByType (offers, type) {
  return offers.find((offer) => offer.type === type).offers;
}

function getCheckedOffersByType (point, offers) {
  const { type, offers: checkedOffers } = point;
  const availableOffers = getOffersByType(offers, type);

  if (!availableOffers.length || !checkedOffers.length) {
    return [];
  }

  return availableOffers.filter((offer) => checkedOffers.includes(offer.id));
}

export {getDestinationById, getOffersByType, getCheckedOffersByType};

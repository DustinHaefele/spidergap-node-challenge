const partner = require('../src/partnerInvite');
const helper = require('./test-helpers');
const assert = require('assert');

describe('testing partner Invite function', () => {
  const expectedPartners = [
    {
      companyName: 'Blue Square 360',
      address: 'St Saviours Wharf, London SE1 2BE'
    },
    {
      companyName: 'Gallus Consulting',
      address:
        'Newton House, Northampton Science Park, Moulton Park, Kings Park Road, Northampton, NN3 6LG'
    },
    {
      companyName: 'Gallus Consulting',
      address: 'No1 Royal Exchange, London, EC3V 3DG'
    }
  ];

  it('returns an array with the correct partners and their addresses', () => {
    const partners = partner.findPartners(helper.partners);
    assert.deepEqual(partners, expectedPartners);
  });

  it('returns the correct distance between coordinates', () => {
    helper.coordinateDistances.forEach(val => {
      assert.equal(val.distance, partner.findDistance(val.coordinate));
    });
  });
});

describe('DummyJSON Token-Based Auth Example', () => {
  let token = '';
  let email = '';

  // ✅ Login and store token + email before all tests
  before(() => {
    cy.Login().then((response) => {
      expect(response.status).to.eq(200);
      cy.Log(response.body);  // Optional logging
      token = response.body.token || response.body.accessToken;
      email = response.body.email;
      cy.log('Token:', token);
    });
  });

  it('Should fetch user details from /auth/me and match email', () => {
    cy.userDetailsfromAuth(token).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('User info:', JSON.stringify(response.body));
      expect(response.body).to.have.property('email');
      expect(response.body.email).to.eq(email);
    });
  });

  it('Should validate complete user details from /auth/me', () => {
    cy.userDetailsfromAuth(token).then((response) => {
      expect(response.status).to.eq(200);
      const user = response.body;

      // ✅ Basic Info
      expect(user).to.include({
        id: 1,
        firstName: 'Emily',
        lastName: 'Johnson',
        maidenName: 'Smith',
        age: 28,
        gender: 'female',
        email: 'emily.johnson@x.dummyjson.com',
        phone: '+81 965-431-3024',
        username: 'emilys',
        password: 'emilyspass',
        birthDate: '1996-5-30',
        bloodGroup: 'O-',
        height: 193.24,
        weight: 63.16,
        eyeColor: 'Green',
        macAddress: '47:fa:41:18:ec:eb',
        university: 'University of Wisconsin--Madison',
        ip: '42.48.100.32',
        ein: '977-175',
        ssn: '900-590-289',
        role: 'admin'
      });

      expect(user.image).to.include('https://dummyjson.com/icon/emilys');
      expect(user.hair).to.deep.equal({ color: 'Brown', type: 'Curly' });

      // ✅ Address
      expect(user.address).to.include({
        address: '626 Main Street',
        city: 'Phoenix',
        state: 'Mississippi',
        postalCode: '29112',
        country: 'United States',
      });
      expect(user.address.stateCode).to.eq('MS');
      expect(user.address.coordinates).to.deep.equal({ lat: -77.16213, lng: -92.084824 });

      // ✅ Bank
      expect(user.bank).to.include({
        cardExpire: '03/26',
        cardNumber: '9289760655481815',
        cardType: 'Elo',
        currency: 'CNY',
      });
      expect(user.bank.iban).to.eq('YPUXISOBI7TTHPK2BR3HAIXL');

      // ✅ Company
      expect(user.company).to.include({
        department: 'Engineering',
        name: 'Dooley, Kozey and Cronin',
        title: 'Sales Manager',
      });
      expect(user.company.address).to.include({
        city: 'San Francisco',
        state: 'Wisconsin',
        country: 'United States',
        postalCode: '37657',
      });
      expect(user.company.address.coordinates).to.deep.equal({ lat: 71.814525, lng: -161.150263 });

      // ✅ Crypto & Tech
      expect(user.crypto).to.deep.equal({
        coin: 'Bitcoin',
        wallet: '0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a',
        network: 'Ethereum (ERC20)',
      });
      expect(user.userAgent).to.include('Mozilla');
    });
  });
});

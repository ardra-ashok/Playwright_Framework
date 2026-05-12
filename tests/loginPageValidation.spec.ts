import { test } from '../utils/fixtures';

test.describe('Login - Field Level Negative Cases',{ tag:['@qc01'] }, () => {

 test('Empty email and password - TC01', async ({ loginPage }) => {
   await test.step('Navigate to Login Page and try to login', async () => {
    await loginPage.navigate();
    await loginPage.login(" ", "");
   });
   await test.step('Verify login Error message', async () => {
     await loginPage.verifyValidLoginError('Email is required','Password is required')
   })
 });

 test('Empty email and password - TC02', async ({ loginPage }) => {
   await test.step('Navigate to Login Page and try to login', async () => {
    await loginPage.navigate();
    await loginPage.clickOnLogin()
   });
   await test.step('Verify login Error message', async () => {
    await loginPage.verifyValidLoginError('Email is required','Password is required')
   })
 });

 test('Empty email only', async ({ loginPage }) => {
  await test.step('Navigate to Login Page and login', async () => {
   await loginPage.navigate();
   await loginPage.login("", "welcome01");
  });
  await test.step('Verify login Error message', async () => {
    await loginPage.verifyValidLoginError('Email is required')
  })
 });
 
 test('Empty password only', async ({ loginPage }) => {
  await test.step('Navigate to Login Page and try login', async () => {
   await loginPage.navigate();
   await loginPage.login("admin@practicesoftwaretesting.com","");
  });
  await test.step('Verify login Error message', async () => {
   await loginPage.verifyValidLoginError('Password is required')
  })
 });

 test('Invalid email format', async ({ loginPage }) => {
   await test.step('Navigate to Login Page and try login', async () => {
    await loginPage.navigate();
    await loginPage.login("usergmail.com", "welcome01");
   });
  await test.step('Verify login Error message', async () => {
    await loginPage.verifyValidLoginError('Email format is invalid')
  })
 });

 test('Password too short', async ({ loginPage }) => {
  await test.step('Navigate to Login Page and try login', async () => {
   await loginPage.navigate();
   await loginPage.login("admin@practicesoftwaretesting.com", "we");
  });
  await test.step('Verify login Error message', async () => {
  await loginPage.verifyValidLoginError('Password length is invalid')
  })
 });
});

test.describe('Login - Invalid Credentials',{ tag:['@qc02'] }, () => {
  test('Correct email + wrong password', async ({ loginPage }) => {
    await test.step('Navigate to Login Page and try to login', async () => {
      await loginPage.navigate();
      await loginPage.login("admin@practicesoftwaretesting.com", "welcome0123");
    });
    await test.step('Verify login Error message', async () => {
     await loginPage.verifyValidLoginError('Invalid email or password')
    })
  });

  test('Wrong email + correct password', async ({ loginPage }) => {
    await test.step('Navigate to Login Page and try to login', async () => {
      await loginPage.navigate();
      await loginPage.login("admin123@", "welcome01");
    });
    await test.step('Verify login Error message', async () => {
     await loginPage.verifyValidLoginError('Email format is invalid')
    })
  });
});

test.describe('Login - Boundary Input Cases',{ tag: ['@qc03'] }, () => {
  test('Extremely long email', async ({ loginPage }) => {
    const longEmail = 'a'.repeat(260) + '@example.com';
    await test.step('Navigate to Login Page and try to login', async () => {
      await loginPage.navigate();
      await loginPage.login(longEmail, "welcome01");
    });
    await test.step('Verify login Error message', async () => {
     await loginPage.verifyValidLoginError('Email format is invalid')
    })
  });

  test('Emoji in password', async ({ loginPage }) => {
    await test.step('Navigate to Login Page and try to login', async () => {
      await loginPage.navigate();
      await loginPage.login("customer1@practicesoftwaretesting.com", '😀😀😀');
    });
    await test.step('Verify login Error message', async () => {
      await loginPage.verifyValidLoginError('Invalid email or password')
    })
  });
});


test.describe('Login - Security Negative Cases',{ tag: ['@qc04'] } , () => {
  test('SQL injection attempt in email', async ({ loginPage }) => {
    await test.step('Navigate to Login Page and try to login', async () => {
      await loginPage.navigate();
      await loginPage.login(`' OR 1=1 --`, "welcome01");
    });
    await test.step('Verify login Error message', async () => {
     await loginPage.verifyValidLoginError('Email format is invalid')
    })
  });
  test('XSS attempt in email field', async ({ loginPage }) => {
    await test.step('Navigate to Login Page and try to login', async () => {
      await loginPage.navigate();
      await loginPage.login('<script>alert(1)</script>', "welcome01");
    });
    await test.step('Verify login Error message', async () => {
     await loginPage.verifyValidLoginError('Email format is invalid')
    })
});
});
describe("Login Formu Testleri", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Başarılı form doldurulduğunda submit edebiliyorum ve success sayfasını açabiliyorum", () => {
    cy.get('[data-cy="form-email"]').type("erdem.guntay@wit.com.tr");
    cy.get('[data-cy="form-password"]').type("9fxIH0GXesEwH_I");
    cy.get('[data-cy="form-terms"]').check();
    cy.get('[data-cy="form-button').click();

    cy.url().should("include", "/Success");
    cy.contains("Başarıyla giriş yaptınız.").should("be.visible");
  });

  it("email yanlış girdim: ekranda 1 tane hata mesajı var, ekranda doğru hata mesajı var, buton disabled durumda", () => {
    cy.get('[data-cy="form-email"]').type("blabla");
    cy.get('[data-cy="form-password"]').type("9fxIH0GXesEwH_I");
    cy.get('[data-cy="form-terms"]').check();

    cy.get("p").should("have.length", 1);
    cy.contains("Geçerli bir email adresi giriniz.").should("be.visible");
    cy.get('[data-cy="form-button').should("be.disabled");
  });

  it("email ve password yanlış: ekranda 2 tane hata mesajı var, ekranda password hata mesajı var, buton disabled durumda", () => {
    cy.get('[data-cy="form-email"]').type("blabla");
    cy.get('[data-cy="form-password"]').type("blabla");
    cy.get('[data-cy="form-terms"]').check();

    cy.get("p").should("have.length", 2);
    cy.contains("Geçerli bir email adresi giriniz.").should("be.visible");
    cy.contains(
      "Şifre en az 8 karakter, 1 büyük harf, 1 küçük harf ve 1 sayı içermelidir."
    ).should("be.visible");
    cy.get('[data-cy="form-button').should("be.disabled");
  });

  it("email ve password doğru ama kuralları kabul etmedim: buton disabled mı?", () => {
    cy.get('[data-cy="form-email"]').type("erdem.guntay@wit.com.tr");
    cy.get('[data-cy="form-password"]').type("9fxIH0GXesEwH_I");

    cy.get('[data-cy="form-button').should("be.disabled");
  });
});

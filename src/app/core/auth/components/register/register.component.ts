import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {

  @ViewChild('email') emailInput!: ElementRef;
  @ViewChild('nome') nomeInput!: ElementRef;
  @ViewChild('cognome') cognomeInput!: ElementRef;
  @ViewChild('password') passwordInput!: ElementRef;
  @ViewChild('confirmPassword') confirmPasswordInput!: ElementRef;
  @ViewChild('corsoDiStudio') corsoDiStudioInput!: ElementRef;

  constructor(private authService: AuthService) {}

  ngAfterViewInit() {
    setTimeout(() => {
      const title = document.querySelector('h1');
      if (title) {
        title.classList.add('no-cursor');
      }
    }, 1500);
  }

  register(event: Event) {
    event.preventDefault();

    const emailValue = this.emailInput.nativeElement.value.trim();
    const nomeValue = this.nomeInput.nativeElement.value.trim();
    const cognomeValue = this.cognomeInput.nativeElement.value.trim();
    const passwordValue = this.passwordInput.nativeElement.value;
    const confirmPasswordValue = this.confirmPasswordInput.nativeElement.value;
    const corsoDiStudioValue = this.corsoDiStudioInput.nativeElement.value.trim();

    if (!emailValue.endsWith("@studenti.unical.it")) {
      alert("❌ L'email deve essere del dominio @studenti.unical.it.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(passwordValue)) {
      alert("❌ La password deve avere almeno 8 caratteri, una lettera maiuscola, una minuscola, un numero e un carattere speciale.");
      return;
    }

    if (passwordValue !== confirmPasswordValue) {
      alert("❌ Le password non coincidono.");
      return;
    }

    this.authService.register(emailValue, nomeValue, cognomeValue, passwordValue, corsoDiStudioValue)
      .subscribe({
        next: () => { alert("✅ Registrazione completata con successo!") },
        error: () => { alert("❌ Errore nella registrazione, riprova.") }
      });
  }
}
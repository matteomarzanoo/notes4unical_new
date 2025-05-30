import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-changepwd',
  imports: [FormsModule, NgIf],
  templateUrl: './changepwd.component.html',
  styleUrl: './changepwd.component.css'
})
export class ChangepwdComponent {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'The new passwords do not match. Please try again.';
      return;
    }

    if (this.isPasswordStrong(this.newPassword)) {
      // Logica per inviare la richiesta di cambio password (ad esempio a un server)
      console.log('Password changed successfully!');
      this.errorMessage = '';
      // Mostra messaggio di successo o naviga altrove
    } else {
      this.errorMessage = 'Your password does not meet the security requirements.';
    }
  }

  isPasswordStrong(password: string): boolean {
    // Verifica la forza della password (ad esempio usando una regex)
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }
}

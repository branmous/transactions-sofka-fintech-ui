import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TransactionService } from '../../../../core/services/transaction.service';
import { Transaction } from '../../../../core/models/transaction.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  standalone: true, // Mark as standalone
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class TransactionFormComponent implements OnInit {
  transactionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TransactionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private transactionService: TransactionService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  get amount() {
    return this.transactionForm.get('amount');
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const newTransaction: Partial<Transaction> = {
        amount: this.transactionForm.value.amount,
        // Add other properties if your Transaction model has them and they are captured by the form
        // For now, only 'amount' is specified in the requirements.
      };

      this.transactionService.registerTransaction(newTransaction).subscribe({
        next: (response) => {
          this.snackBar.open('Transacción registrada exitosamente!', 'Cerrar', {
            duration: 3000,
          });
          this.dialogRef.close(true); // Close dialog and return true for success
        },
        error: (error) => {
          this.snackBar.open('Error al registrar la transacción. Intente de nuevo.', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error registering transaction:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false); // Close dialog without success
  }
}

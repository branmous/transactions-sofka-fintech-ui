import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Transaction } from '../../../../core/models/transaction.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { TransactionFormComponent } from '../../components/transaction-form/transaction-form.component'; // Import TransactionFormComponent
import { TransactionService } from '../../../../core/services/transaction.service'; // Import TransactionService


@Component({
  selector: 'app-transaction-dashboard',
  templateUrl: './transaction-dashboard.component.html',
  styleUrls: ['./transaction-dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule, // Add MatButtonModule
    MatIconModule // Add MatIconModule
  ],
})
export class TransactionDashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'amount', 'commission', 'dateCreated'];
  dataSource = new MatTableDataSource<Transaction>([]);

  constructor(
    private dialog: MatDialog, // Inject MatDialog
    private transactionService: TransactionService // Inject TransactionService
  ) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe({
      next: (transactions) => {
        this.dataSource.data = transactions;
      },
      error: (error) => {
        console.error('Error loading transactions:', error);
        // Optionally show a snackbar or other error notification
      }
    });
  }

  openTransactionForm(): void {
    const dialogRef = this.dialog.open(TransactionFormComponent, {
      width: '400px', // Adjust width as needed
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If the dialog was closed with a positive result (transaction registered successfully), refresh the list
        this.loadTransactions();
      }
    });
  }
}

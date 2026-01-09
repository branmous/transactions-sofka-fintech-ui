import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Transaction } from '../../../../core/models/transaction.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-transaction-dashboard',
  templateUrl: './transaction-dashboard.component.html',
  styleUrls: ['./transaction-dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule
  ],
})
export class TransactionDashboardComponent {
  displayedColumns: string[] = ['id', 'amount', 'comission', 'date_created'];
  mockTransactions: Transaction[] = [
    { id: 1, amount: 1000, comission: 10, date_created: new Date() },
    { id: 2, amount: 2500, comission: 25, date_created: new Date() },
    { id: 3, amount: 800, comission: 8, date_created: new Date() },
    { id: 4, amount: 5000, comission: 50, date_created: new Date() },
    { id: 5, amount: 1200, comission: 12, date_created: new Date() },
  ];
  dataSource = new MatTableDataSource<Transaction>(this.mockTransactions);
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionService } from '../../core/services/transaction.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
  ],
  providers: [
    TransactionService
  ]
})
export class TransactionsModule { }

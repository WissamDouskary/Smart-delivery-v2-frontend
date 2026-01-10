import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { colis } from '../../../models/get-colis.model';
import { colisService } from '../../../../../core/services/colis.service';
import { toast } from 'ngx-sonner';
import { CommonModule, DatePipe, CurrencyPipe, DecimalPipe } from '@angular/common';

import { COLIS_PRIORITY } from '../../../models/enums/colis-priority.enum';
import { COLIS_STATUS } from '../../../models/enums/colis-status.enum';
import { finalize, pipe } from 'rxjs';

@Component({
  selector: 'app-single-colis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-colis.html',
  styleUrl: './single-colis.css',
})

export class SingleColis implements OnInit {
  private router = inject(ActivatedRoute);
  private colisSer = inject(colisService);
  private detector = inject(ChangeDetectorRef);

  colis = signal<colis | null>(null);
  errorMessage: string = "";
  loading: boolean = false;

  readonly Status = COLIS_STATUS;
  readonly Priority = COLIS_PRIORITY;

  getColisInformation() {
    const id = this.router.snapshot.paramMap.get('id');
    
    this.loading = true;

    this.colisSer.getColisById(id)
    .pipe(
      finalize(() => {
        this.loading = false;
        this.detector.markForCheck();
      })
    )  
    .subscribe({
      next: (res) => {
        console.log(res);
        this.colis.set(res);
      },
      error: (err: any) => {
        this.errorMessage = err.error.message;
        toast.error(err.error.message);
      }
    })
  }

  ngOnInit(): void {
    this.getColisInformation();
  }
}

import { ChangeDetectorRef, Component, inject, OnInit, signal, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { colis } from '../../../models/get-colis.model';
import { colisService } from '../../../../../core/services/colis.service';
import { toast } from 'ngx-sonner';
import { CommonModule, DatePipe, CurrencyPipe, DecimalPipe } from '@angular/common';

import { COLIS_PRIORITY } from '../../../models/enums/colis-priority.enum';
import { COLIS_STATUS } from '../../../models/enums/colis-status.enum';
import { finalize, pipe } from 'rxjs';
import { jwtService } from '../../../../../core/services/jwt.service';
import { ApiService } from '../../../../../core/services/api.service';
import { livreurService } from '../../../../../core/services/livreurs.service';
import { livreurModel } from '../../../../../core/models/livreurs.model';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loadSingleColis } from '../../../../../core/state/colis/colis.actions';
import { selectSelectedColis } from '../../../../../core/state/colis/colis.selectors';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-single-colis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './single-colis.html',
  styleUrl: './single-colis.css',
})
export class SingleColis implements OnInit {
  private route = inject(ActivatedRoute);
  private detector = inject(ChangeDetectorRef);
  private _jwtService = inject(jwtService);
  private _livreurService = inject(livreurService);
  private store = inject(Store);

  colisId: string | null = this.route.snapshot.paramMap.get('id');

  // selector as signal
  colis = toSignal(this.store.select(selectSelectedColis));

  livreurs = signal<livreurModel[] | null>([]);
  errorMessage: string = '';

  readonly Status = COLIS_STATUS;
  readonly Priority = COLIS_PRIORITY;

  selectedLivreur: string = '';
  statusSelect: string = "";

  constructor() {
    effect(() => {
      const currentColis = this.colis();
      if (currentColis) {
        this.getAllLivreurs();
      }
    });
  }

  isAdmin(): boolean {
    return this._jwtService.getRole() == 'Manager';
  }

  isLivreur(): boolean {
    return this._jwtService.getRole() == "Livreur";
  }

  assignLivreur(colisId: string | undefined) {
    return this._livreurService
      .assignLivreur(colisId!, this.selectedLivreur)
      .subscribe({
        next: () => {
          toast.success('livreur assigned successfully!');
          this.store.dispatch(loadSingleColis({ id: this.colisId! }));
        },
        error: (err) => {
          toast.error(err.error.message);
        },
      });
  }

  updateColisStatus(colisId: string | undefined) {
    this._livreurService.updateStatusByLivreur(colisId, this.statusSelect)
      .subscribe({
        next: () => {
          toast.success("status updated successfully");
          this.store.dispatch(loadSingleColis({ id: this.colisId! }));
        },
        error: (err) => {
          toast.error(err.error.message);
        }
      })
  }

  getAllLivreurs() {
    return this._livreurService.getLivreurs().subscribe({
      next: (resp) => {
        const currentColis = this.colis();
        if (currentColis?.status == "IN_STOCK") {
          this.livreurs.set(resp.filter((liv) => liv.city.nom.includes("Maroc")));
        } else if (currentColis) {
          this.livreurs.set(resp.filter((liv) => liv.city.nom.includes(currentColis.city.nom!)));
        }
      },
      error: (err) => {
        if (this.isAdmin()) {
          if (err.error.message) {
            toast.error(err.error.message);
          }
        }
      },
    });
  }

  ngOnInit(): void {
    if (this.colisId) {
      this.store.dispatch(loadSingleColis({ id: this.colisId }));
    }
  }
}

import { ChangeDetectorRef, Component, inject, OnInit, signal, computed } from '@angular/core';
import { Card } from '../../components/card/card';
import { colisService } from '../../../../core/services/colis.service';
import { colis } from '../../models/get-colis.model';
import { toast } from 'ngx-sonner';
import { jwtService } from '../../../../core/services/jwt.service';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loadColis } from '../../../../core/state/colis/colis.actions';
import { selectAllColis } from '../../../../core/state/colis/colis.selectors';
import { selectSearchTerm } from '../../../../core/state/filters/filters.selectors';
import { setSearchTerm } from '../../../../core/state/filters/filters.actions';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-colis',
  imports: [Card, RouterLink, FormsModule],
  templateUrl: './colis.html',
  styleUrl: './colis.css',
})

export class Colis implements OnInit {
  private store = inject(Store);
  private jwt = inject(jwtService);

  allColis = toSignal(this.store.select(selectAllColis), { initialValue: [] });
  searchTerm = toSignal(this.store.select(selectSearchTerm), { initialValue: '' });

  filteredColis = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.allColis();
    return this.allColis().filter(item =>
      item.description?.toLowerCase().includes(term)
    );
  });

  ngOnInit(): void {
    this.store.dispatch(loadColis());
  }

  onSearchChange(value: string) {
    this.store.dispatch(setSearchTerm({ searchTerm: value }));
  }

  isAdminOrSender(): boolean {
    const role = this.jwt.getRole();
    return role === "Manager" || role === "Sender";
  }
}

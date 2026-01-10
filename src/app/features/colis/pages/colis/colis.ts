import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { Card } from '../../components/card/card';
import { colisService } from '../../../../core/services/colis.service';
import { subscribe } from 'diagnostics_channel';
import { colis } from '../../models/get-colis.model';
import { toast } from 'ngx-sonner';
import { finalize, map } from 'rxjs';
import { FormsModule } from "@angular/forms";
import { jwtService } from '../../../../core/services/jwt.service';

@Component({
  selector: 'app-colis',
  imports: [Card, FormsModule],
  templateUrl: './colis.html',
  styleUrl: './colis.css',
})

export class Colis implements OnInit {
  private colisServ = inject(colisService);
  private detector = inject(ChangeDetectorRef);
  private jwt = inject(jwtService);

  searchTerm: string = "";
  colis = signal<colis[]>([]);
  loading: boolean = false;
  errorMessage: string = "";

  ngOnInit(): void {
    this.getAllColis();
    console.log(this.getAllColis());
  }

  onSearch(){
    const term = this.searchTerm.toLowerCase();

    if(term == ""){
      this.ngOnInit()
    }else{
      this.colis.set(
        this.colis().filter(
          item => item.description.toLowerCase().includes(term)
        )
      )
    }
  }

  getAllColis() {
    this.loading = true;
    this.colisServ
      .getColis()
      .pipe(
        finalize(() => {
          this.loading = false;
          this.detector.markForCheck();
        })
      )
      .subscribe({
        next: (res) => {
          this.colis.set(res);
        },
        error: (err: any) => {
          console.log(err);
          this.errorMessage = err?.error?.message;
          this.detector.markForCheck()
          toast.error(err?.error?.message);
        },
      });
  }

  isAdminOrSender(): boolean {
    if(this.jwt.getRole() == "Manager"){
      return true;
    }else if (this.jwt.getRole() == "Sender"){
      return true;
    }
    return false;
  }
}

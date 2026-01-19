import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { senderService } from './senders.service';
import { livreurService } from './livreurs.service';
import { receviersService } from './receiver.service';
import { User, UserRole } from '../models/user.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private senderSer = inject(senderService);
    private livreurSer = inject(livreurService);
    private receiverSer = inject(receviersService);

    getAllUsers(): Observable<User[]> {
        return forkJoin({
            senders: this.senderSer.getSenders(),
            livreurs: this.livreurSer.getLivreurs(),
            receivers: this.receiverSer.getReceivers(),
        }).pipe(
            map(({ senders, livreurs, receivers }) => {
                const mappedSenders: User[] = senders.map(s => ({ ...s, role: 'Sender' as UserRole }));
                const mappedLivreurs: User[] = livreurs.map(l => ({ ...l, role: 'Livreur' as UserRole }));
                const mappedReceivers: User[] = receivers.map(r => ({ ...r, role: 'Receiver' as UserRole }));

                return [...mappedSenders, ...mappedLivreurs, ...mappedReceivers];
            })
        );
    }
}
